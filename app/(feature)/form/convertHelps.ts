export const convertHelps = (data: string[]) => {
  const defaultHelps = {
    dish: 0,
    curtain: 0,
    prepareEat: 0,
    landry: 0,
    towel: 0,
  };
  return data.reduce((acc, help) => {
    const tmp = help.split(',');
    const tmp2 = { [tmp[0]]: Number(tmp[1]) };

    return { ...acc, ...tmp2 };
  }, defaultHelps);
};
