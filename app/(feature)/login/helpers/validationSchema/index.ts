import { z } from 'zod';
export const validationSchema = z.object({
  email: z.string().email({ message: 'Emailを入力してください。' }),
  password: z.string().min(8, '8文字以上で入力してください。'),
});

export type LoginProps = z.infer<typeof validationSchema>;
