export function parseDate(isoDateString: string, isDateOnly = false): string {
  const date: Date = new Date(isoDateString);
  const day: string = date.getUTCDate().toString().padStart(2, '0');
  const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getUTCFullYear().toString();
  const hour: string = date.getUTCHours().toString().padStart(2, '0');
  const minute: string = date.getUTCMinutes().toString().padStart(2, '0');
  return isDateOnly
    ? `${day}-${month}-${year}`
    : `${day}-${month}-${year} ${hour}:${minute}`;
}
