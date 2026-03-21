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
        if (!helps.some((help) => help.startsWith('special,'))) {
          return true;
        }
        if (comments && comments.trim().length > 0) {
          return true;
        }
        return false;
      },
      { path: ['comments'], message: 'スペシャルはコメントしてね' },
    ),
});

export type FormProps = z.infer<typeof validationSchema>;
