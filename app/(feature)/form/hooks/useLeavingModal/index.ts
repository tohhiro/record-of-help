import { useEffect } from 'react';

export const useLeavingModal = (isDirty: boolean) => {
  // NOTE: 閉じる、リロード、ブラウザバック
  const handleBeforeunload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
  };

  // NOTE: リンククリック
  const handleClick = (event: MouseEvent) => {
    const targetElement = event.target as HTMLElement;

    if (isDirty && targetElement.tagName === 'A') {
      // eslint-disable-next-line no-alert
      if (!window.confirm('ページを離れても良いですか？')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

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
