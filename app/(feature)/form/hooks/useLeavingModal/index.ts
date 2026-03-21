import { useEffect, useRef } from 'react';

export const useLeavingModal = (isDirty: boolean) => {
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  // NOTE: 閉じる、リロード
  const handleBeforeunload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  // NOTE: リンククリック（closest で子要素クリックにも対応）
  const handleClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;
    const anchor = targetElement.closest('a');

    if (isDirty && anchor) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('ページを離れても良いですか？')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // NOTE: ブラウザバック/フォワード + SPA の pushState/replaceState 遷移
  useEffect(() => {
    if (!isDirty) return;

    const handlePopstate = () => {
      if (!isDirtyRef.current) return;
      // eslint-disable-next-line no-alert
      if (!window.confirm('ページを離れても良いですか？')) {
        // キャンセル時は現在のページに留まるため、元の履歴エントリを復元
        window.history.pushState(null, '', window.location.href);
      }
    };

    // 現在のページを履歴スタックに追加して popstate でキャッチできるようにする
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [isDirty]);

  useEffect(() => {
    if (!isDirty) return;
    window.addEventListener('beforeunload', handleBeforeunload);
    window.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
      window.removeEventListener('click', handleClick, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  return null;
};
