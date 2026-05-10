import { getMemberNames } from '.';

describe('getMemberNames', () => {
  test('重複を除去して名前を昇順に並び替える', () => {
    const result = getMemberNames([
      { name: 'tohhiro' },
      { name: 'eito' },
      { name: 'mei' },
      { name: 'eito' },
    ]);

    expect(result).toStrictEqual(['eito', 'mei', 'tohhiro']);
  });

  test('nullの場合は空配列を返す', () => {
    const result = getMemberNames(null);
    expect(result).toStrictEqual([]);
  });

  test('undefinedの場合は空配列を返す', () => {
    const result = getMemberNames(undefined);
    expect(result).toStrictEqual([]);
  });
});
