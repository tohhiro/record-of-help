export const getNowMonthFirstLast = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth();
  const nowMonthFirst = new Date(year, month, 2);
  const nowMonthLast = new Date(year, month + 1, 1);
  return {
    startDate: nowMonthFirst.toISOString().split('T')[0],
    endDate: nowMonthLast.toISOString().split('T')[0],
  };
};
