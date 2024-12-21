import { render, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useForm } from 'react-hook-form';
import { useLeavingModal } from '.';

const renderForm = () => {
  const WrapperComponent = () => {
    const {
      register,
      formState: { isDirty },
    } = useForm();

    useLeavingModal(isDirty);

    return (
      <form>
        <input type="text" {...register('input')} />
        <a href="https://example.com">Link</a>
      </form>
    );
  };

  const { getByRole } = render(<WrapperComponent />);

  return {
    input: getByRole('textbox'),
    link: getByRole('link'),
  };
};

describe('useLeavingModal', () => {
  let windowSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
  });

  afterEach(() => {
    windowSpy.mockRestore();
    addEventListenerSpy.mockRestore();
  });

  const user = userEvent.setup();

  test('hooksにtrueの引数が渡るとbeforeunload、clickイベントが呼ばれる', () => {
    renderHook(() => useLeavingModal(true));
    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), true);
  });

  test('hooksにfalseの引数が渡るとaddEventListener自体が呼ばれない', () => {
    renderHook(() => useLeavingModal(false));
    expect(addEventListenerSpy).not.toHaveBeenCalled();
  });

  test('フォームが変更され離脱する場合、確認ダイアログが表示される', async () => {
    const { input, link } = renderForm();

    await user.type(input, 'test');
    await user.click(link);

    expect(windowSpy).toHaveBeenCalledWith('ページを離れても良いですか？');
  });

  test('フォームが変更されず離脱する場合、確認ダイアログが表示されない', async () => {
    const { link } = renderForm();

    await user.click(link);
    expect(windowSpy).not.toHaveBeenCalledWith('ページを離れても良いですか？');
  });
});
