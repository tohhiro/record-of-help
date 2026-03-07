import { renderHook, act } from '@testing-library/react';
import { useDeleteRecord } from '.';

const mockArgs = { id: '1' };

describe('useDeleteRecord', () => {
  test('引数にidを渡すことができる', async () => {
    const { result } = renderHook(() => useDeleteRecord());
    const deleteRecordSpy = jest.spyOn(result.current, 'deleteRecord');

    await act(async () => {
      result.current.deleteRecord({ ...mockArgs });
    });

    expect(deleteRecordSpy).toHaveBeenCalledWith({ ...mockArgs });

    deleteRecordSpy.mockRestore();
  });

  test('エラーの場合、エラーメッセージをスローする', () => {
    const { result } = renderHook(() => useDeleteRecord());
    const deleteRecordSpy = jest.spyOn(result.current, 'deleteRecord');
    deleteRecordSpy.mockImplementation(() => {
      throw new Error('Delete failed');
    });

    expect(() => result.current.deleteRecord(mockArgs)).toThrow('Delete failed');
  });
});
