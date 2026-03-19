import { convertHelps } from '.';

describe('convertHelps', () => {
  test('dataとして入った文字列の配列を、カンマ区切りで分解しオブジェクトに変換する', () => {
    const data = ['dish,30', 'curtain,10', 'prepareEat,20', 'landry,20', 'special,50'];

    const result = convertHelps(data);
    expect(result).toStrictEqual({
      dish: 30,
      curtain: 10,
      prepareEat: 20,
      landry: 20,
      special: 50,
    });
  });

  test('dataとして入った文字列の配列が2つの場合、存在しないものは0で生成される', () => {
    const data = ['dish,30', 'special,50'];

    const result = convertHelps(data);
    expect(result).toStrictEqual({
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 50,
    });
  });

  test('空配列の場合はデフォルト値が返る', () => {
    const result = convertHelps([]);
    expect(result).toStrictEqual({
      dish: 0,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 0,
    });
  });

  test('空文字列が含まれる場合はスキップされる', () => {
    const data = ['dish,30', '', 'special,50'];

    const result = convertHelps(data);
    expect(result).toStrictEqual({
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 50,
    });
  });

  test('カンマなし文字列はスキップされる', () => {
    const data = ['dish,30', 'invalidEntry', 'special,50'];

    const result = convertHelps(data);
    expect(result).toStrictEqual({
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 50,
    });
  });

  test('価格が数値でない場合はスキップされる', () => {
    const data = ['dish,abc', 'special,50'];

    const result = convertHelps(data);
    expect(result).toStrictEqual({
      dish: 0,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 50,
    });
  });
});
