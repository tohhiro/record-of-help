import { convertHelps } from '.';

describe('convertHelps', () => {
  it('dataとして入った文字列の配列を、カンマ区切りで分解しオブジェクトに変換する', () => {
    const data = ['dish,30', 'curtain,10', 'prepareEat,20', 'landry,20', 'special,50'];

    const result = convertHelps(data);
    expect(result).toEqual({
      dish: 30,
      curtain: 10,
      prepareEat: 20,
      landry: 20,
      special: 50,
    });
  });
  it('dataとして入った文字列の配列が2つの場合、存在しないものは0で生成される', () => {
    const data = ['dish,30', 'special,50'];

    const result = convertHelps(data);
    expect(result).toEqual({
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 50,
    });
  });
});
