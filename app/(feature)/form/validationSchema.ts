import { z } from 'zod';
export const validationSchema = z.object({
  person: z.string().min(1, 'どちらかを選択してください'),
  items: z
    .object({
      helps: z.array(z.string()).min(1, '1つ以上選択してください'),
      comments: z.string().nullable(),
    })
    .refine(
      ({ helps, comments }) => {
        if (!helps.includes('special,50')) {
          return true;
        }
        if (comments && comments.trim().length > 0) {
          return true;
        }
      },
      { path: ['comments'], message: 'スペシャルはコメントしてね' },
    ),
});
