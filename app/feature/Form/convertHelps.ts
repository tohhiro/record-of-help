import type { Helps, FormProps } from '.'

type HelpsData = {
    dish: boolean;
    curtain: boolean;
    prepareEat: boolean;
  };

export const convertHelps = (helps: Helps[], data: FormProps) => {
    const checkedHelps = helps.reduce((acc, item) => {
        return  data.helps.includes(item.id) ? { ...acc, [item.id]: true } : { ...acc, [item.id]: false };
      }, {} as HelpsData);
    return checkedHelps;
}

