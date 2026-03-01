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

export type AnalysisWindowStatus = {
  startDate: Date;
  readyDate: Date;
  today: Date;
  trackingDurationDays: number;
  collectedDays: number;
  remainingDays: number;
  isStartInFuture: boolean;
  isReady: boolean;
};

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return normalizeDate(next);
}

export function getAnalysisWindowStatus(referenceDate: Date = new Date()): AnalysisWindowStatus {
  const today = normalizeDate(referenceDate);
  const startDate = getAnalysisStartDate();
  const isStartInFuture = startDate.getTime() > today.getTime();
  const daysSinceStart = Math.floor(
    (today.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000),
  );
  const collectedDays = isStartInFuture
    ? 0
    : Math.max(0, Math.min(daysSinceStart + 1, trackingDurationDays));
  const remainingDays = Math.max(trackingDurationDays - collectedDays, 0);
  const readyDate = addDays(startDate, trackingDurationDays - 1);

  return {
    startDate,
    readyDate,
    today,
    trackingDurationDays,
    collectedDays,
    remainingDays,
    isStartInFuture,
    isReady: !isStartInFuture && remainingDays === 0,
  };
}
