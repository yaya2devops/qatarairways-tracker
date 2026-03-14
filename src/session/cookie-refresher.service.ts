import { Injectable, Logger } from '@nestjs/common';
import { chromium } from 'playwright';

export interface CapturedSession {
  cookie: string;
  sessionId: string;
  deviceId: string;
  nbxApiKey: string;
}

const STATIC_NBX_API_KEY = '74f2474702784207a9785eb3ef8ae4e4';

@Injectable()
export class CookieRefresherService {
  private readonly logger = new Logger(CookieRefresherService.name);

  async refresh(
    origin: string,
    destination: string,
    date: string,
  ): Promise<CapturedSession> {
    this.logger.log('Launching headless browser to capture fresh QR session…');

    const browser = await chromium.launch({ headless: true });

    try {
      const context = await browser.newContext({
        userAgent:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
          'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        locale: 'en-US',
        timezoneId: 'Asia/Qatar',
        viewport: { width: 1440, height: 900 },
      });

      const page = await context.newPage();

      // ── Capture ANY QR request that carries session headers ────────────────
      let capturedHeaders: Record<string, string> | null = null;

      page.on('request', (req) => {
        const h = req.headers();
        if (
          req.url().includes('qatarairways.com') &&
          h['session-id'] &&
          h['cookie'] &&
          !capturedHeaders
        ) {
          capturedHeaders = h;
          this.logger.log(`Headers captured from: ${req.method()} ${req.url()}`);
        }
      });

      // ── Step 1: Homepage warm-up (Akamai needs to run its JS checks) ───────
      this.logger.log('Loading homepage…');
      await page.goto('https://www.qatarairways.com/en/homepage.html', {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });
      await page.waitForTimeout(5_000);

      // ── Step 2: Navigate to search results page ────────────────────────────
      const searchUrl =
        `https://www.qatarairways.com/app/booking/flight-selection` +
        `?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=en` +
        `&tripType=O&fromStation=${origin}&toStation=${destination}` +
        `&departing=${date}&bookingClass=E&adults=1&children=0&infants=0` +
        `&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N`;

      this.logger.log('Loading search results page…');
      await page.goto(searchUrl, { waitUntil: 'load', timeout: 90_000 });

      // Give the React SPA time to boot and fire its first API call
      await page.waitForTimeout(15_000);

      // ── Step 3: If still nothing intercepted, trigger the API call ourselves
      // from within the page context so that the browser attaches valid cookies
      if (!capturedHeaders) {
        this.logger.log(
          'SPA did not fire automatically — triggering API call from page context…',
        );

        await page.evaluate(
          async ({ origin, destination, date, apiKey }) => {
            await fetch(
              '/dapi/public/bff/web/flight-search/flight-offers',
              {
                method: 'POST',
                headers: {
                  'content-type': 'application/json',
                  accept: 'application/json, text/plain, */*',
                  'nbx_fs_api_key': apiKey,
                  'qr-lang': 'en',
                },
                body: JSON.stringify({
                  channel: 'WEB_DESKTOP',
                  itineraries: [
                    { origin, destination, departureDate: date, isRequested: true },
                  ],
                  cabinClass: 'ECONOMY',
                  ignoreInvalidPromoCode: true,
                  passengers: [{ type: 'ADT', count: 1 }],
                }),
              },
            );
          },
          { origin, destination, date, apiKey: STATIC_NBX_API_KEY },
        );

        // Give a moment for the request event to fire
        await page.waitForTimeout(3_000);
      }

      // ── Step 4a: Use intercepted headers if available ──────────────────────
      if (capturedHeaders) {
        const h = capturedHeaders as Record<string, string>;
        const session = {
          cookie: h['cookie'] ?? '',
          sessionId: h['session-id'] ?? '',
          deviceId: h['x-assigneddeviceid'] ?? '',
          nbxApiKey: h['nbx_fs_api_key'] ?? STATIC_NBX_API_KEY,
        };
        this.logger.log(
          `Session captured via XHR. sessionId=${session.sessionId}`,
        );
        return session;
      }

      // ── Step 4b: Fallback — assemble from browser context + storage ────────
      this.logger.warn(
        'No XHR headers captured — assembling session from browser context.',
      );

      const cookies = await context.cookies('https://www.qatarairways.com');
      const cookieStr = cookies.map((c) => `${c.name}=${c.value}`).join('; ');

      if (!cookieStr) {
        throw new Error(
          'Browser returned no cookies — Akamai may have blocked the request. ' +
          'Try increasing the warmup delay or running headed (headless:false).',
        );
      }

      const { sessionId, deviceId } = await page.evaluate(() => {
        const get = (...keys: string[]) => {
          for (const k of keys) {
            const v =
              sessionStorage.getItem(k) || localStorage.getItem(k);
            if (v) return v;
          }
          return '';
        };

        const sessionId =
          get('session-id', 'sessionId', 'SESSION_ID') ||
          crypto.randomUUID();

        // Try common localStorage keys first, then fall back to generating one.
        // The server requires *any* non-empty value here.
        const deviceId =
          get('assignedDeviceId', 'ASSIGNED_DEVICE_ID', 'x-assigneddeviceid') ||
          (document.cookie.match(/DEVICE_ID=([^;]+)/) || [])[1] ||
          // generate a random 32-char alphanumeric token (same format QR uses)
          Array.from(crypto.getRandomValues(new Uint8Array(24)))
            .map((b) => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[b % 62])
            .join('');

        return { sessionId, deviceId };
      });

      this.logger.log(`Fallback session assembled. sessionId=${sessionId}`);
      return { cookie: cookieStr, sessionId, deviceId, nbxApiKey: STATIC_NBX_API_KEY };
    } finally {
      await browser.close();
    }
  }
}
