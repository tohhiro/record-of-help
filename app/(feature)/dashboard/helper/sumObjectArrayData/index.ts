import type { Props } from '../../components/DashboardTable';

export const sumObjectArrayData = (data: Props, sumItem: string[]) => {
  if (!data) return 0;
  const sumEachObject = data?.map((item) => {
    return Object.keys(item).reduce((acc, cur) => {
      if (!item) return acc;
      const value = item[cur as keyof typeof item];
      if (sumItem.includes(cur) && typeof value === 'number') {
        return acc + value;
      }
      return acc;
    }, 0);
  });

  const sumArray = sumEachObject.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return sumArray;
};
