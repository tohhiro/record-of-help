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
    if (!(event.target instanceof Element)) return;
    const anchor = event.target.closest('a');

    if (isDirtyRef.current && anchor) {
      // eslint-disable-next-line no-alert
      if (!window.confirm('ページを離れても良いですか？')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  // NOTE: ブラウザバック/フォワードによる履歴移動（popstate）のみ対応
  useEffect(() => {
    if (!isDirty) return;

    const handlePopstate = () => {
      if (!isDirtyRef.current) return;
      // eslint-disable-next-line no-alert
      if (!window.confirm('ページを離れても良いですか？')) {
        // キャンセル時は元のページに戻る（履歴を増やさない）
        window.history.forward();
      }
    };

    // state マーカーで重複追加を防止
    const currentState = window.history.state as Record<string, unknown> | null;
    if (!currentState?.leavingModal) {
      window.history.pushState(
        { ...(currentState ?? {}), leavingModal: true },
        '',
        window.location.href,
      );
    }
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
