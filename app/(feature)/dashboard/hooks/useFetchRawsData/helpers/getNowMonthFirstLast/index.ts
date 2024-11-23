export const getNowMonthFirstLast = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();

  const nowMonthFirst = new Date(year, month, 1);

  const nextMonthFirst = new Date(year, month + 1, 1);
  const nowMonthLast = new Date(nextMonthFirst.getTime() - 1); // 1ミリ秒前は当月末

  // 日本時間のタイムゾーンを指定してフォーマット
  const formatDateInJST = (date: Date) =>
    new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .replaceAll('/', '-'); // YYYY-MM-DD形式に調整

  return {
    startDate: formatDateInJST(nowMonthFirst), // 当月1日
    endDate: formatDateInJST(nowMonthLast), // 当月末日
  };
};
