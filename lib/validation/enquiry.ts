import { z } from 'zod';

export const enquiryKinds = ['contact', 'advertising'] as const;
export const advertisingRequirements = [
  'display',
  'business',
  'corporate',
  'classified',
  'other',
] as const;

const phonePattern = /^\+?[0-9()\s-]{7,20}$/;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, 'tooLong')
    .optional()
    .transform((value) => (value ? value : undefined));

export const enquirySchema = z.object({
  kind: z.enum(enquiryKinds),
  locale: z.enum(['en', 'or']),
  name: z.string().trim().min(2, 'tooShort').max(120, 'tooLong'),
  organisation: optionalText(160),
  email: z
    .string()
    .trim()
    .min(1, 'required')
    .max(254, 'tooLong')
    .email('emailInvalid'),
  phone: z
    .string()
    .trim()
    .max(30, 'tooLong')
    .optional()
    .transform((value) => (value ? value : undefined))
    .refine((value) => value === undefined || phonePattern.test(value), {
      message: 'phoneInvalid',
    }),
  requirement: z
    .enum(advertisingRequirements, { errorMap: () => ({ message: 'requirementInvalid' }) })
    .optional(),
  message: z.string().trim().min(10, 'tooShort').max(4000, 'tooLong'),
  website: z.string().max(0).optional(),
  startedAt: z.number().int().positive(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
