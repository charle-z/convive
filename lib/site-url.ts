export const DEFAULT_APP_URL =
  "https://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io";

export function getAppUrl() {
  if (typeof window !== "undefined" && window.location.origin) {
    return window.location.origin;
  }

  return DEFAULT_APP_URL;
}
