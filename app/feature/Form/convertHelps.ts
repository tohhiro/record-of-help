import type { Helps, FormProps } from '.'

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

export const convertHelps = (helps: Helps[], data: FormProps) => {
    const checkedHelps = helps.reduce((acc, help) => {
        return  data.helps.includes(help.id) ? { ...acc, [help.id]: true } : { ...acc };
      }, initHelpsData);
    return checkedHelps;
}