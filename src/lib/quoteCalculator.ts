/**
 * Quote Calculator - Configurable rates for BeeBee Cleaning Services
 * Edit the RATES object below to adjust pricing. Based on Utah market ranges.
 */

export type ServiceType =
  | "Home Cleaning"
  | "Commercial Cleaning"
  | "Move In/Out Cleaning"
  | "Construction Cleaning"
  | "Other";

export type CleaningType = "Regular Cleaning" | "Deep Cleaning";

export interface QuoteResult {
  min: number;
  max: number;
  canEstimate: boolean;
}

/** Per-sq-ft rate ranges [min, max]. Adjust these to match your pricing. */
const RATES = {
  homeRegular: { perSqFt: [0.1, 0.18], baseMin: 100, baseMax: 150 },
  homeDeep: { perSqFt: [0.15, 0.25], baseMin: 150, baseMax: 250 },
  moveInOut: { perSqFt: [0.12, 0.22], baseMin: 200, baseMax: 350 },
  commercial: { perSqFt: [0.08, 0.15], baseMin: 150, baseMax: 250 },
  construction: { perSqFt: [0.15, 0.28], baseMin: 250, baseMax: 400 },
  other: { perSqFt: [0.1, 0.2], baseMin: 120, baseMax: 200 },
} as const;

/** Per-bathroom add-on (optional refinement) */
const BATHROOM_ADD = 25;
/** Per-room add-on (optional refinement, capped) */
const ROOM_ADD = 10;
const MAX_ROOM_ADD = 80;

function toNum(val: FormDataEntryValue | null): number | undefined {
  if (val == null || val === "") return undefined;
  const n = Number(val);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

/**
 * Calculate estimated cost range based on service and property details.
 * Returns canEstimate: false when sq ft is missing for services that need it.
 */
export function calculateQuote(
  service: ServiceType,
  cleaningType: CleaningType | null | undefined,
  squareFootage: number | undefined,
  bathrooms?: number,
  rooms?: number
): QuoteResult {
  if (service === "Other" || !service) {
    return {
      min: RATES.other.baseMin,
      max: RATES.other.baseMax,
      canEstimate: true,
    };
  }

  // All calculable services need square footage for a meaningful estimate
  const sqFt = squareFootage && squareFootage > 0 ? squareFootage : undefined;

  let rate: (typeof RATES)[keyof typeof RATES];
  switch (service) {
    case "Home Cleaning":
      rate = cleaningType === "Deep Cleaning" ? RATES.homeDeep : RATES.homeRegular;
      break;
    case "Move In/Out Cleaning":
      rate = RATES.moveInOut;
      break;
    case "Commercial Cleaning":
      rate = RATES.commercial;
      break;
    case "Construction Cleaning":
      rate = RATES.construction;
      break;
    default:
      rate = RATES.other;
  }

  if (!sqFt) {
    // Fallback to base range when no sq ft
    return {
      min: rate.baseMin,
      max: rate.baseMax,
      canEstimate: false,
    };
  }

  const [minPerSqFt, maxPerSqFt] = rate.perSqFt;
  let min = Math.max(rate.baseMin, sqFt * minPerSqFt);
  let max = Math.max(rate.baseMax, sqFt * maxPerSqFt);

  if (bathrooms != null && bathrooms > 0) {
    min += bathrooms * BATHROOM_ADD;
    max += bathrooms * BATHROOM_ADD * 1.2;
  }
  if (rooms != null && rooms > 0) {
    const roomAdd = Math.min(rooms * ROOM_ADD, MAX_ROOM_ADD);
    min += roomAdd;
    max += roomAdd * 1.1;
  }

  return {
    min: Math.round(min),
    max: Math.round(max),
    canEstimate: true,
  };
}

/**
 * Calculate quote from raw form values (FormData entries).
 */
export function calculateQuoteFromForm(
  service: string,
  cleaningType: string | null,
  squareFootage: FormDataEntryValue | null,
  bathrooms: FormDataEntryValue | null,
  rooms: FormDataEntryValue | null
): QuoteResult {
  return calculateQuote(
    service as ServiceType,
    cleaningType as CleaningType | undefined,
    toNum(squareFootage),
    toNum(bathrooms),
    toNum(rooms)
  );
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatQuoteRange(min: number, max: number): string {
  return `${currency.format(min)} – ${currency.format(max)}`;
}
