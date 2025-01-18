import { validationSchema } from '.';

describe('validationSchema', () => {
  test('有効なemailとpasswordの場合、バリデーションエラーが発生しない', () => {
    const result = validationSchema.safeParse({ email: 'test@test.com', password: 'password' });
    expect(result.success).toBeTruthy();
  });

  test('有効なemailでない場合、バリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({ email: 'test', password: 'password' });
    expect(!result.success).toBeTruthy();
    expect(!result.success && result.error.issues).toContainEqual({
      code: 'invalid_string',
      message: 'Emailを入力してください。',
      path: ['email'],
      validation: 'email',
    });
  });

  test('8文字未満のpasswordの場合、バリデーションが発生する', () => {
    const result = validationSchema.safeParse({ email: 'test@test.com', password: '' });
    expect(!result.success).toBeTruthy();
    expect(!result.success && result.error.issues[0]).toStrictEqual({
      code: 'too_small',
      exact: false,
      inclusive: true,
      message: '8文字以上で入力してください。',
      minimum: 8,
      path: ['password'],
      type: 'string',
    });
  });
});
