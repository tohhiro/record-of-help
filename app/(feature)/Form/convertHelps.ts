import type { Helps, Props } from './page';

type HelpsData = {
  dish: boolean;
  curtain: boolean;
  prepareEat: boolean;
  landry: boolean;
  towel: boolean;
};

const initHelpsData: HelpsData = {
  dish: false,
  curtain: false,
  prepareEat: false,
  landry: false,
  towel: false,
};

export const convertHelps = (helps: Helps[], data: Props) => {
  const checkedHelps = helps.reduce(
    (acc, help) => (data.helps.includes(help.id) ? { ...acc, [help.id]: true } : { ...acc }),
    initHelpsData,
  );
  return checkedHelps;
};
