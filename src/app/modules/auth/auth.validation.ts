import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    avatar: z.string().optional(),
    totalVotesReceived: z.number().min(0).default(0),
    debatesParticipated: z.number().min(0).default(0),
    isAdmin: z.boolean().default(false),
  }),
});

// user login validation defination schema
export const authValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password is required!' }),
  }),
});