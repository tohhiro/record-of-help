export const useCheckLocalStorageToken = () => {
  // eslint-disable-next-line operator-linebreak
  const getLocalStorageValue =
    typeof window !== 'undefined'
      ? !!localStorage.getItem(process.env.NEXT_PUBLIC_SUPABASE_LOCAL_STORAGE_KEY!)
      : false;

  return getLocalStorageValue;
};
