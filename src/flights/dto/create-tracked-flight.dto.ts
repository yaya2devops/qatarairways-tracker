export class CreateTrackedFlightDto {
  origin: string;
  destination: string;
  departureDate: string; // YYYY-MM-DD
  cabinClass?: string;   // ECONOMY | BUSINESS | FIRST  (default: ECONOMY)
  adults?: number;       // default: 1
}
