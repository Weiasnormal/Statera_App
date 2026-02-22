let trackingDurationDays = 7;
let analysisStartDate = normalizeDate(new Date());

function normalizeDate(date: Date): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

export function getTrackingDurationDays(): number {
  return trackingDurationDays;
}

export function setTrackingDurationDays(days: number): void {
  trackingDurationDays = days;
}

export function getAnalysisStartDate(): Date {
  return new Date(analysisStartDate);
}

export function setAnalysisStartDate(date: Date): void {
  analysisStartDate = normalizeDate(date);
}

export function resetAnalysisStartDate(): void {
  analysisStartDate = normalizeDate(new Date());
}
