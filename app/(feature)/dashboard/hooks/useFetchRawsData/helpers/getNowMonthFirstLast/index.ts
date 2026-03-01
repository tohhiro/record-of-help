export const getNowMonthFirstLast = () => {
  const nowDate = new Date();

  // JST ベースで年・月を取得（ランタイムのローカルTZに依存しない）
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(nowDate);

  const year = Number(parts.find((p) => p.type === 'year')!.value);
  const month = Number(parts.find((p) => p.type === 'month')!.value);

  // month は 1-based。new Date(year, month, 0) で当月の最終日を取得
  // （日数計算はカレンダー上の値なのでTZに依存しない）
  const lastDay = new Date(year, month, 0).getDate();

  const pad2 = (n: number) => String(n).padStart(2, '0');
  return {
    startDate: `${year}-${pad2(month)}-01`,
    endDate: `${year}-${pad2(month)}-${pad2(lastDay)}`,
  };
};
