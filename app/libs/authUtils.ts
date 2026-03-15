/** 未ログイン時に返される想定内のエラーかどうか判定する */
export const isExpectedAuthError = (message: string): boolean => {
  const expectedPatterns = ['Auth session missing', 'Not authenticated', 'Invalid Refresh Token'];
  return expectedPatterns.some((pattern) => message.includes(pattern));
};
