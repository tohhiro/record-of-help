export const mockNextRouter = (path: string) => {
  return {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: `${path}`,
      },
    },
  };
};
