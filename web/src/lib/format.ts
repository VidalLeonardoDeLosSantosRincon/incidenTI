const dateTimeFormatter = new Intl.DateTimeFormat("es-DO", {
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Santo_Domingo",
});

const dateTimeLongFormatter = new Intl.DateTimeFormat("es-DO", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Santo_Domingo",
});

/** Formato corto estable entre SSR y cliente (evita hydration mismatch). */
export function formatDateTime(iso: string): string {
  return dateTimeFormatter.format(new Date(iso));
}

/** Formato largo estable entre SSR y cliente. */
export function formatDateTimeLong(iso: string): string {
  return dateTimeLongFormatter.format(new Date(iso));
}
