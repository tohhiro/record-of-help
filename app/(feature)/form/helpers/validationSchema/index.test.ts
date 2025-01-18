import { validationSchema } from '.';

describe('validationSchema', () => {
  test('有効なpersonとitemsの場合、バリデーションエラーが発生しない', () => {
    const result = validationSchema.safeParse({
      person: 'eito',
      items: { helps: ['dish,10'], comments: 'コメント' },
    });
    expect(result.success).toBeTruthy();
  });

  test('helpsがスペシャルアイテムでない場合、コメントは必須ではない', () => {
    const result = validationSchema.safeParse({
      person: 'eito',
      items: { helps: ['dish,10'], comments: '' },
    });
    expect(result.success).toBeTruthy();
  });

  test('personが選択されていない場合、バリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({
      person: '',
      items: { helps: ['dish,10'], comments: '' },
    });
    expect(result.success).toBeFalsy();
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe('どちらかを選択してください');
    }
  });

  test('helpsが選択されていない場合、バリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({
      person: 'eito',
      items: { helps: [], comments: '' },
    });
    expect(result.success).toBeFalsy();
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe('1つ以上選択してください');
    }
  });

  test('スペシャルアイテムが選択されている場合、コメントがないとバリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({
      person: 'eito',
      items: { helps: ['special,50'], comments: '' },
    });
    expect(result.success).toBeFalsy();
    if (!result.success) {
      expect(result.error?.issues[0].message).toBe('スペシャルはコメントしてね');
    }
  });

  test('スペシャルアイテムが選択されている場合、コメントがあるとバリデーションエラーが発生しない', () => {
    const result = validationSchema.safeParse({
      person: 'eito',
      items: { helps: ['special,50'], comments: '必要なコメント' },
    });
    expect(result.success).toBeTruthy();
  });
});
