import { postHelp } from './actions';
import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import { revalidatePath } from 'next/cache';

jest.mock('@/app/libs/supabaseServer');
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

const mockInsert = jest.fn();
const mockFrom = jest.fn(() => ({ insert: mockInsert }));

const mockedCreateSupabaseServerClient = jest.mocked(
  createSupabaseServerClient,
);
mockedCreateSupabaseServerClient.mockReturnValue({
  from: mockFrom,
} as unknown as ReturnType<typeof createSupabaseServerClient>);

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
    expect(mockInsert).toHaveBeenCalledWith({
      person: 'eito',
      comments: 'テスト',
      dish: 30,
      curtain: 0,
      prepareEat: 0,
      landry: 0,
      special: 0,
    });
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard');
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
