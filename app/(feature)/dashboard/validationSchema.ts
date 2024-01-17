import { z } from 'zod';
export const validationSchema = z.object({
  person: z
    .object({ label: z.string(), value: z.string() })
    .refine((data) => !!data.value, { message: '対象を選択してください。' }),
  start: z.string().min(1, '開始を選択してください。'),
  end: z.string().min(1, { message: '終了を選択してください。' }),
});
