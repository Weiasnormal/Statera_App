/**
 * Simple storage for GWA (General Weighted Average)
 * In a production app, this would use AsyncStorage or similar
 */

let storedGwa: number | null = null;

export function setGwa(gwa: number): void {
  storedGwa = gwa;
}

export function getGwa(): number | null {
  return storedGwa;
}

export function clearGwa(): void {
  storedGwa = null;
}
