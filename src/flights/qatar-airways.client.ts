import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { SessionService } from '../session/session.service';

export interface FareOffer {
  boundId: string;
  availableSeats: number;
  price: { base: number; total: number; currencyCode: string };
  fareFamilyCode: string;
  cabinType: string;
  isLowestFare: boolean;
}

export interface FlightOffer {
  origin: { iataCode: string };
  destination: { iataCode: string };
  numberOfStops: number;
  segments: Array<{
    flightNumber: string;
    departure: { origin: { iataCode: string }; dateTime: string };
    arrival: { destination: { iataCode: string }; dateTime: string };
    vehicle: { name: string; shortName: string };
  }>;
  fareOffers: FareOffer[];
  tags: string[];
}

export interface SearchResult {
  status: 'AVAILABLE' | 'UNAVAILABLE' | 'ERROR';
  sessionExpired?: boolean;
  flightOffers?: FlightOffer[];
  error?: string;
}

@Injectable()
export class QatarAirwaysClient {
  private readonly logger = new Logger(QatarAirwaysClient.name);

  constructor(private readonly sessionService: SessionService) {}

  async searchFlights(
    origin: string,
    destination: string,
    departureDate: string,
    cabinClass = 'ECONOMY',
    adults = 1,
    retried = false,
  ): Promise<SearchResult> {
    const session = await this.sessionService.getSession();
    const headers = this.buildHeaders(origin, destination, departureDate, session);
    const body = this.buildBody(origin, destination, departureDate, cabinClass, adults);

    try {
      const response = await axios.post(
        'https://www.qatarairways.com/dapi/public/bff/web/flight-search/flight-offers',
        body,
        { headers, timeout: 30_000, validateStatus: (s) => s === 200 || s === 204 },
      );

      if (response.status === 204 || !response.data?.flightOffers?.length) {
        return { status: 'UNAVAILABLE' };
      }

      return { status: 'AVAILABLE', flightOffers: response.data.flightOffers };
    } catch (err: any) {
      const status = err?.response?.status;
      const responseBody = err?.response?.data;
      if (responseBody) {
        this.logger.debug(
          `API error body (${status}): ${JSON.stringify(responseBody).slice(0, 300)}`,
        );
      }

      // Session invalid — refresh once and retry automatically
      if ((status === 400 || status === 403 || status === 401) && !retried) {
        this.logger.warn(`Session invalid (HTTP ${status}) — refreshing cookies and retrying…`);
        await this.sessionService.forceRefresh(origin, destination);
        return this.searchFlights(origin, destination, departureDate, cabinClass, adults, true);
      }

      if (status === 400 || status === 403 || status === 401) {
        return {
          status: 'ERROR',
          sessionExpired: true,
          error: `Session still invalid after refresh (HTTP ${status}).`,
        };
      }

      return { status: 'ERROR', error: err?.message ?? String(err) };
    }
  }

  private buildHeaders(
    origin: string,
    destination: string,
    departureDate: string,
    session: { cookie: string; sessionId: string; deviceId: string; nbxApiKey: string },
  ): Record<string, string> {
    const referer =
      `https://www.qatarairways.com/app/booking/flight-selection` +
      `?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=en` +
      `&tripType=O&fromStation=${origin}&toStation=${destination}` +
      `&departing=${departureDate}&bookingClass=E&adults=1&children=0` +
      `&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N`;

    return {
      accept: 'application/json, text/plain, */*',
      'accept-language': 'en',
      'content-type': 'application/json',
      'nbx_fs_api_key': session.nbxApiKey,
      origin: 'https://www.qatarairways.com',
      'qr-lang': 'en',
      referer,
      'session-id': session.sessionId,
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
      'x-assigneddeviceid': session.deviceId,
      Cookie: session.cookie,
    };
  }

  private buildBody(
    origin: string,
    destination: string,
    departureDate: string,
    cabinClass: string,
    adults: number,
  ) {
    return {
      channel: 'WEB_DESKTOP',
      itineraries: [{ origin, destination, departureDate, isRequested: true }],
      cabinClass,
      ignoreInvalidPromoCode: true,
      passengers: [{ type: 'ADT', count: adults }],
    };
  }
}
