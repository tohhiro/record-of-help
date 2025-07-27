import { renderHook } from '@testing-library/react';
import useSWRMutation from 'swr/mutation';
import { Props, usePostHelp } from '.';

jest.mock('swr/mutation');

const mockArgs: Props = {
  person: 'eito',
  comments: 'コメント',
  dish: 10,
  curtain: 20,
  prepareEat: 30,
  landry: 40,
  special: 50,
};

describe('usePostHelp', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('成功時にonSuccessが呼ばれること', async () => {
    const triggerMock = jest.fn().mockResolvedValue({ status: 200, statusText: 'OK' });
    (useSWRMutation as jest.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => usePostHelp());

    await result.current.postHelp(mockArgs, {
      onSuccess: mockOnSuccess,
      onError: mockOnError,
    });

    expect(triggerMock).toHaveBeenCalledWith(mockArgs);
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockOnError).not.toHaveBeenCalled();
  });

  test('Supabaseからの応答が失敗時にonErrorが呼ばれること', async () => {
    const triggerMock = jest.fn().mockResolvedValue({ status: 400, statusText: 'Bad Request' });
    (useSWRMutation as jest.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => usePostHelp());

    await expect(
      result.current.postHelp(mockArgs, {
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      }),
    ).rejects.toThrow(/Bad Request/);

    expect(triggerMock).toHaveBeenCalledWith(mockArgs);
    expect(mockOnError).toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  test('triggerが例外をthrowした場合にもonErrorが呼ばれること', async () => {
    const triggerMock = jest.fn().mockRejectedValue(new Error('Network Error'));
    (useSWRMutation as jest.Mock).mockReturnValue({
      trigger: triggerMock,
      isMutating: false,
    });

    const { result } = renderHook(() => usePostHelp());

    await expect(
      result.current.postHelp(mockArgs, {
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      }),
    ).rejects.toThrow('Network Error');

    expect(triggerMock).toHaveBeenCalledWith(mockArgs);
    expect(mockOnError).toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
