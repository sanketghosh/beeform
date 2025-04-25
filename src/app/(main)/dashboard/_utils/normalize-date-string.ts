export function normalizeDateString(dateString: string) {
  const [day, month, year] = dateString.split("/");
  if (!day || !month || !year) return null;
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}
