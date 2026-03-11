export const convertHelps = (data: string[]) => {
  const defaultHelps = {
    dish: 0,
    curtain: 0,
    prepareEat: 0,
    landry: 0,
    special: 0,
  };
  return data.reduce((acc, help) => {
    const [key, priceStr] = help.split(',');
    const helpEntry = { [key]: Number(priceStr) };

    return { ...acc, ...helpEntry };
  }, defaultHelps);
};
