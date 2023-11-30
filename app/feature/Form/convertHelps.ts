import type { Helps, Props } from '.'

type HelpsData = {
    dish: boolean;
    curtain: boolean;
    prepareEat: boolean;
  };

const initHelpsData: HelpsData = {
    dish: false,
    curtain: false,
    prepareEat: false,
  };

export const convertHelps = (helps: Helps[], data: Props) => {
    const checkedHelps = helps.reduce((acc, help) => (
        data.helps.includes(help.id) ? { ...acc, [help.id]: true } : { ...acc }
    ), initHelpsData);
    return checkedHelps;
}