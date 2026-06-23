export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/**
 * Разворачивает диапазоны бронирований в список дат "YYYY-MM-DD" —
 * для DatePicker.disabledDates (блокировка уже занятых дат из API).
 */
export function expandDateRanges(ranges: { dateFrom: string; dateTo: string }[]): string[] {
  const result: string[] = [];
  for (const { dateFrom, dateTo } of ranges) {
    const cursor = new Date(dateFrom);
    const end = new Date(dateTo);
    while (cursor < end) {
      result.push(cursor.toISOString().slice(0, 10));
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  return result;
}
