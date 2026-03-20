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
    if (!key || priceStr === undefined) return acc;
    const price = Number(priceStr);
    if (Number.isNaN(price)) return acc;
    const helpEntry = { [key]: price };

    return { ...acc, ...helpEntry };
  }, defaultHelps);
};
