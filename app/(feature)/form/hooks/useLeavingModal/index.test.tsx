import { render, renderHook, screen } from '@testing-library/react';
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
        <a href="#leave">Link</a>
        <a href="#nested">
          <span data-testid="nested-span">Nested Link</span>
        </a>
      </form>
    );
  };

  render(<WrapperComponent />);

  return {
    input: screen.getByRole('textbox'),
    link: screen.getByRole('link', { name: 'Link' }),
    nestedSpan: screen.getByTestId('nested-span'),
  };
};

describe('useLeavingModal', () => {
  let windowSpy: jest.SpyInstance;
  let addEventListenerSpy: jest.SpyInstance;
  let pushStateSpy: jest.SpyInstance;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    pushStateSpy = jest.spyOn(window.history, 'pushState').mockImplementation(() => {});
  });

  afterEach(() => {
    windowSpy.mockRestore();
    addEventListenerSpy.mockRestore();
    pushStateSpy.mockRestore();
  });

  const user = userEvent.setup();

  test('hooksにtrueの引数が渡るとbeforeunload、click、popstateイベントが登録される', () => {
    renderHook(() => useLeavingModal(true));
    expect(addEventListenerSpy).toHaveBeenCalledWith('beforeunload', expect.any(Function));
    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function), true);
    expect(addEventListenerSpy).toHaveBeenCalledWith('popstate', expect.any(Function));
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

  test('aタグの子要素をクリックしても確認ダイアログが表示される', async () => {
    const { input, nestedSpan } = renderForm();

    await user.type(input, 'test');
    await user.click(nestedSpan);

    expect(windowSpy).toHaveBeenCalledWith('ページを離れても良いですか？');
  });

  test('popstateイベント発火時に確認ダイアログが表示される', () => {
    renderHook(() => useLeavingModal(true));

    windowSpy.mockReturnValue(false);
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(windowSpy).toHaveBeenCalledWith('ページを離れても良いですか？');
    // キャンセル時はpushStateで現在ページに留まる
    expect(pushStateSpy).toHaveBeenCalledTimes(2); // 初期化時 + キャンセル時
  });

  test('popstateイベント発火時にOKを選択すると遷移を許可する', () => {
    renderHook(() => useLeavingModal(true));

    windowSpy.mockReturnValue(true);
    window.dispatchEvent(new PopStateEvent('popstate'));

    expect(windowSpy).toHaveBeenCalledWith('ページを離れても良いですか？');
    // OK時はpushStateは初期化時の1回のみ
    expect(pushStateSpy).toHaveBeenCalledTimes(1);
  });
});
