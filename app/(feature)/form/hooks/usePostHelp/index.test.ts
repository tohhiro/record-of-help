import { renderHook } from '@testing-library/react';
import { usePostHelp, Props } from '.';

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
  test('引数にperson、comments、dish、curtain、prepareEat、landry、specialを渡すことができる', async () => {
    const { result } = renderHook(() => usePostHelp());
    const postHelpSpy = jest.spyOn(result.current, 'postHelp');

    result.current.postHelp({
      ...mockArgs,
    });

    expect(postHelpSpy).toHaveBeenCalledWith({
      ...mockArgs,
    });
    postHelpSpy.mockRestore();
  });
});
