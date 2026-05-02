import { deleteRecord } from './actions';
import { createSupabaseServerClient } from '@/app/libs/supabaseServer';
import { revalidatePath } from 'next/cache';

jest.mock('@/app/libs/supabaseServer');
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

const mockEq = jest.fn();
const mockUpdate = jest.fn(() => ({ eq: mockEq }));
const mockFrom = jest.fn(() => ({ update: mockUpdate }));

const mockedCreateSupabaseServerClient = jest.mocked(
  createSupabaseServerClient,
);
mockedCreateSupabaseServerClient.mockReturnValue({
  from: mockFrom,
} as unknown as ReturnType<typeof createSupabaseServerClient>);

describe('deleteRecord', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('正常にレコードが論理削除される場合、ステータスコードが返り、/dashboard が再検証される', async () => {
    mockEq.mockResolvedValue({ status: 200, error: null });

    const result = await deleteRecord({ id: '1' });

    expect(mockFrom).toHaveBeenCalledWith('raws_data');
    expect(mockUpdate).toHaveBeenCalledWith({ del_flag: true });
    expect(mockEq).toHaveBeenCalledWith('id', '1');
    expect(revalidatePath).toHaveBeenCalledWith('/dashboard');
    expect(result).toEqual({ status: 200 });
  });

  test('Supabase がエラーを返した場合、エラーが throw される', async () => {
    mockEq.mockResolvedValue({
      status: 400,
      error: { message: 'Delete failed' },
    });

    await expect(deleteRecord({ id: '1' })).rejects.toThrow('Delete failed');
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
