import { postHelp } from './actions';
import { createSupabaseServerClient } from '@/app/libs/supabaseServer';

// モックすべきは「依存先」であるSupabase
jest.mock('@/app/libs/supabaseServer');

const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({ insert: mockInsert }));

(createSupabaseServerClient as jest.Mock).mockReturnValue({
  from: mockFrom,
});

describe('postHelp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('正常にデータが送信される場合、ステータスコード201が返る', async () => {
    mockInsert.mockResolvedValue({ status: 201, error: null });

    const result = await postHelp({
      person: 'eito',
      comments: 'テスト',
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 0,
    });

    expect(mockFrom).toHaveBeenCalledWith('raws_data');
    expect(result).toEqual({ status: 201 });
  });

  test('Supabaseがエラーを返した場合、エラーがthrowされる', async () => {
    mockInsert.mockResolvedValue({
      status: 400,
      error: { message: 'Insert failed' },
    });

    await expect(
      postHelp({
        person: 'eito',
        comments: 'テスト',
        dish: 30,
        curtain: 0,
        prepareEat: 0,
        landry: 0,
        special: 0,
      }),
    ).rejects.toThrow('Insert failed');
  });
});
