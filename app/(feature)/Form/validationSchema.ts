import { z } from 'zod';
export const validationSchema = z.object({
  person: z.string().min(1, '選択しえください。'),
  helps: z.array(z.string()).min(1, '選択しえください。'),
});
