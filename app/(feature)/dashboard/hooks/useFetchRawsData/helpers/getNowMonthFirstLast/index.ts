export const getNowMonthFirstLast = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();

  const nowMonthFirst = new Date(year, month, 1);

  const nextMonthFirst = new Date(year, month + 1, 1);
  const nowMonthLast = new Date(nextMonthFirst.getTime() - 1);

  const formatDateInJST = (date: Date) =>
    new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
      .format(date)
      .replaceAll('/', '-');

  return {
    startDate: formatDateInJST(nowMonthFirst),
    endDate: formatDateInJST(nowMonthLast),
  };
};
