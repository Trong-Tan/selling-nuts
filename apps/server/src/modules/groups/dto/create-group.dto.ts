import { z } from 'zod';

export const createGroupDto = z.object({
  name: z.string().min(3).max(255),
  type: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
});
