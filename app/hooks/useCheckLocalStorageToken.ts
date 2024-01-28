export const useCheckLocalStorageToken = () => {
  const getLocalStorageValue = !!localStorage.getItem(
    process.env.NEXT_PUBLIC_SUPABASE_LOCAL_STORAGE_KEY!,
  );

  return getLocalStorageValue;
};
