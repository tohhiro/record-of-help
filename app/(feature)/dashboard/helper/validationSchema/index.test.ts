import { validationSchema } from '.';

describe('validationSchema', () => {
  test('検索したい対象者、期間の開始と終了がある場合、バリデーションエラーが発生しない', () => {
    const result = validationSchema.safeParse({
      person: { label: 'eito', value: 'eito' },
      selectDate: { startDate: '2021-01-01', endDate: '2021-01-02' },
    });
    expect(result.success).toBeTruthy();
  });

  test('検索したい期間の開始が終了より過去の場合、バリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({
      person: { label: 'eito', value: 'eito' },
      selectDate: { startDate: '2021-01-02', endDate: '2021-01-01' },
    });
    expect(result.success === false).toBeTruthy();
    expect(result.success === false && result.error.issues).toStrictEqual([
      {
        code: 'custom',
        path: ['selectDate', 'startDate'],
        message: '終了日より前を選択',
      },
      {
        code: 'custom',
        path: ['selectDate', 'endDate'],
        message: '開始日より後を選択',
      },
    ]);
  });

  test('検索したい対象者、期間の開始と終了が空の場合はバリデーションエラーが発生する', () => {
    const result = validationSchema.safeParse({
      person: { label: '', value: '' },
      selectDate: { startDate: '', endDate: '' },
    });
    expect(result.success === false).toBeTruthy();
    expect(result.success === false && result.error.issues).toStrictEqual([
      { code: 'custom', message: '対象を選択', path: ['person'] },
      {
        code: 'too_small',
        minimum: 1,
        type: 'string',
        inclusive: true,
        exact: false,
        message: '開始日を選択',
        path: ['selectDate', 'startDate'],
      },
      {
        code: 'too_small',
        minimum: 1,
        type: 'string',
        inclusive: true,
        exact: false,
        message: '終了日を選択',
        path: ['selectDate', 'endDate'],
      },
      {
        code: 'custom',
        path: ['selectDate', 'startDate'],
        message: '終了日より前を選択',
      },
      {
        code: 'custom',
        path: ['selectDate', 'endDate'],
        message: '開始日より後を選択',
      },
    ]);
  });
});
