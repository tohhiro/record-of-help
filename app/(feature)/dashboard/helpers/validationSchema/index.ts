import { z } from 'zod';
export const validationSchema = z.object({
  person: z
    .object({ label: z.string(), value: z.string() })
    .refine((data) => !!data.value, { message: '対象を選択' }),
  selectDate: z
    .object({
      startDate: z.string().min(1, '開始日を選択'),
      endDate: z.string().min(1, '終了日を選択'),
    })
    .refine(({ startDate, endDate }) => endDate && new Date(startDate) <= new Date(endDate), {
      path: ['startDate'],
      message: '終了日より前を選択',
    })
    .refine(({ startDate, endDate }) => startDate && new Date(startDate) <= new Date(endDate), {
      path: ['endDate'],
      message: '開始日より後を選択',
    }),
});

export type DashboardProps = z.infer<typeof validationSchema>;
