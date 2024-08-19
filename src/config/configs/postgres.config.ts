import { z } from 'zod';
import { registerAs } from '@nestjs/config';

const schema = z.object({
  host: z.string(),
  user: z.string(),
  password: z.string(),
  db: z.string(),
});

export const POSTGRES_CONFIG_KEY = 'postgres';
export type PostgresConfigType = z.infer<typeof schema>;

export default registerAs(POSTGRES_CONFIG_KEY, () => {
  const parseResult = schema.safeParse({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
  });

  if (!parseResult.success) {
    throw new Error(
      `Invalid postgres configuration env ${parseResult.error.errors[0].message}`,
    );
  }

  return parseResult.data;
});
