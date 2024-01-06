import { setupWorker, rest } from 'msw';

export const mockUseSignInHandler = setupWorker(
  rest.post('/token?grant_type=password', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ user: null, session: null }));
  }),
);
