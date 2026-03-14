import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { TrackedFlight } from '../flights/entities/tracked-flight.entity';
import { FlightOffer, FareOffer } from '../flights/qatar-airways.client';
import { ChangeDetail } from '../flights/flights.service';

const CHANGE_EMOJI: Record<string, string> = {
  BECAME_AVAILABLE: '🟢',
  BECAME_UNAVAILABLE: '🔴',
  PRICE_CHANGED: '💰',
  SEATS_CHANGED: '💺',
};

const CHANGE_LABEL: Record<string, string> = {
  BECAME_AVAILABLE: 'Now Available',
  BECAME_UNAVAILABLE: 'Sold Out / Removed',
  PRICE_CHANGED: 'Price Changed',
  SEATS_CHANGED: 'Seats Changed',
};

@Injectable()
export class NotifierService {
  private createTransporter() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST ?? 'smtp.gmail.com',
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendTestEmail(): Promise<void> {
    const transporter = this.createTransporter();
    await transporter.sendMail({
      from: `"QR Tracker" <${process.env.EMAIL_FROM ?? process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: '✅ QR Tracker — SMTP test',
      text: 'SMTP is working correctly. Your Qatar Airways flight tracker is ready.',
      html: `<p style="font-family:Arial,sans-serif">
               ✅ <strong>SMTP is working correctly.</strong><br><br>
               Your Qatar Airways flight tracker will send alerts to this address.
             </p>`,
    });
  }

  async sendFlightAlert(
    flight: TrackedFlight,
    offers: FlightOffer[],
    changes: ChangeDetail[],
  ): Promise<void> {
    const transporter = this.createTransporter();

    const primaryChange = changes[0];
    const emoji = CHANGE_EMOJI[primaryChange.type] ?? '✈️';
    const label = CHANGE_LABEL[primaryChange.type] ?? primaryChange.type;

    const subject = `${emoji} QR ${flight.origin}→${flight.destination} ${flight.departureDate}: ${label}`;

    const html = this.buildEmailHtml(flight, offers, changes);
    const text = this.buildEmailText(flight, offers, changes);

    await transporter.sendMail({
      from: `"QR Tracker" <${process.env.EMAIL_FROM ?? process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject,
      text,
      html,
    });
  }

  private buildEmailHtml(
    flight: TrackedFlight,
    offers: FlightOffer[],
    changes: ChangeDetail[],
  ): string {
    const bookingUrl =
      `https://www.qatarairways.com/app/booking/flight-selection` +
      `?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=en` +
      `&tripType=O&fromStation=${flight.origin}&toStation=${flight.destination}` +
      `&departing=${flight.departureDate}&bookingClass=E` +
      `&adults=${flight.adults}&children=0&infants=0&ofw=0&teenager=0` +
      `&flexibleDate=off&allowRedemption=N`;

    const changeRows = changes
      .map((c) => {
        const emoji = CHANGE_EMOJI[c.type] ?? '•';
        return `<li>${emoji} <strong>${CHANGE_LABEL[c.type] ?? c.type}:</strong> ${c.description}</li>`;
      })
      .join('');

    const offerRows = offers
      .flatMap((o) => o.fareOffers.map((fare) => this.fareRow(o, fare)))
      .join('');

    const offersSection = offers.length
      ? `<table>
          <thead>
            <tr>
              <th>Flight</th><th>Departure</th><th>Arrival</th>
              <th>Aircraft</th><th>Fare Family</th><th>Cabin</th>
              <th>Seats</th><th>Total (QAR)</th>
            </tr>
          </thead>
          <tbody>${offerRows}</tbody>
        </table>
        <a href="${bookingUrl}" class="cta">Book Now on Qatar Airways</a>`
      : `<p style="color:#c0392b;">No flights are currently available for this date.</p>`;

    return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    h2 { color: #5c0931; }
    ul { padding-left: 20px; margin: 12px 0; }
    li { margin-bottom: 6px; }
    table { border-collapse: collapse; width: 100%; margin-top: 16px; }
    th { background: #5c0931; color: #fff; padding: 8px 12px; text-align: left; }
    td { padding: 8px 12px; border-bottom: 1px solid #eee; }
    tr:nth-child(even) td { background: #f9f9f9; }
    .cta { display:inline-block; margin-top:20px; padding:12px 24px;
           background:#5c0931; color:#fff; text-decoration:none;
           border-radius:4px; font-weight:bold; }
    .badge { font-size:11px; background:#e0f0e0; color:#2a6a2a;
             padding:2px 6px; border-radius:3px; }
    .changes { background:#fff8e1; border-left:4px solid #f0a500;
               padding:12px 16px; margin:16px 0; border-radius:2px; }
  </style>
</head>
<body>
  <h2>✈️ ${flight.origin} → ${flight.destination} — ${flight.departureDate}</h2>
  <p><strong>Cabin:</strong> ${flight.cabinClass} &nbsp;|&nbsp; <strong>Passengers:</strong> ${flight.adults}</p>

  <div class="changes">
    <strong>What changed:</strong>
    <ul>${changeRows}</ul>
  </div>

  ${offersSection}

  <p style="margin-top:24px;font-size:12px;color:#999;">
    To stop tracking: <code>DELETE /flights/${flight.id}</code> or
    <code>PATCH /flights/${flight.id}/active</code> → <code>{"isActive":false}</code>
  </p>
</body>
</html>`;
  }

  private fareRow(offer: FlightOffer, fare: FareOffer): string {
    const seg = offer.segments[0];
    const lowestBadge = fare.isLowestFare
      ? ' <span class="badge">Lowest</span>'
      : '';
    return `<tr>
  <td>${seg.flightNumber}</td>
  <td>${seg.departure.dateTime.replace('T', ' ')}</td>
  <td>${seg.arrival.dateTime.replace('T', ' ')}</td>
  <td>${seg.vehicle.shortName}</td>
  <td>${fare.fareFamilyCode}${lowestBadge}</td>
  <td>${fare.cabinType}</td>
  <td>${fare.availableSeats}</td>
  <td>${fare.price.total.toFixed(2)}</td>
</tr>`;
  }

  private buildEmailText(
    flight: TrackedFlight,
    offers: FlightOffer[],
    changes: ChangeDetail[],
  ): string {
    const lines: string[] = [
      `${flight.origin} → ${flight.destination} on ${flight.departureDate} (${flight.cabinClass})`,
      '',
      'What changed:',
      ...changes.map((c) => `  • ${CHANGE_LABEL[c.type] ?? c.type}: ${c.description}`),
      '',
    ];

    for (const offer of offers) {
      const seg = offer.segments[0];
      lines.push(`Flight ${seg.flightNumber}: ${seg.departure.dateTime} → ${seg.arrival.dateTime} (${seg.vehicle.shortName})`);
      for (const fare of offer.fareOffers) {
        lines.push(`  ${fare.fareFamilyCode} / ${fare.cabinType}: ${fare.price.total} QAR, ${fare.availableSeats} seats${fare.isLowestFare ? ' [LOWEST]' : ''}`);
      }
      lines.push('');
    }

    if (offers.length) {
      lines.push(`Book now: ${bookingUrl(flight)}`);
    }

    return lines.join('\n');
  }
}

function bookingUrl(flight: TrackedFlight): string {
  return (
    `https://www.qatarairways.com/app/booking/flight-selection` +
    `?widget=QR&searchType=F&addTaxToFare=Y&minPurTime=0&selLang=en` +
    `&tripType=O&fromStation=${flight.origin}&toStation=${flight.destination}` +
    `&departing=${flight.departureDate}&bookingClass=E&adults=${flight.adults}` +
    `&children=0&infants=0&ofw=0&teenager=0&flexibleDate=off&allowRedemption=N`
  );
}
