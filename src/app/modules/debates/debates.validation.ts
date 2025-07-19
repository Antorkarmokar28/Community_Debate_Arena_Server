import { z } from 'zod';

// Participants schema (used inside array)
const participantSchema = z.object({
  user: z.string().min(1, 'Participant user ID is required'),
  side: z.enum(['support', 'oppose']),
});

// Main debate schema
export const createDebateValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    tags: z.array(z.string()).optional(), // Optional array of tags
    category: z.string().min(1, 'Category is required'),
    bannerImage: z.string().optional(),
    creator: z.string().min(1, 'Creator ID is required'), // MongoDB ObjectId as string
    startTime: z.coerce.date().optional(), // Optional: coerced from string if needed
    duration: z.number().min(1, 'Duration (in hours) is required'),
    status: z.enum(['active', 'closed']).optional().default('active'),
    winningSide: z.enum(['support', 'oppose', 'tie']).nullable().optional(),
    supportCount: z.number().min(0).optional().default(0),
    opposeCount: z.number().min(0).optional().default(0),
    participants: z.array(participantSchema).optional(),
  }),
});

export const debateValidationSchema = {
  createDebateValidationSchema,
};
