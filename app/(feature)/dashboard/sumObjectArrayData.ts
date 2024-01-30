import type { FetchProps } from './page';

export const sumObjectArrayData = (data: FetchProps, sumItem: string[]) => {
  if (!data) return 0;
  const sumEachObject = data?.map((item) => {
    return Object.keys(item).reduce((acc, cur) => {
      if (!item) return acc;
      if (sumItem.includes(cur) && cur !== null) {
        return acc + Number(item[cur as keyof typeof item]);
      }
      return acc;
    }, 0);
  });

  const sumArray = sumEachObject.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  return sumArray;
};
