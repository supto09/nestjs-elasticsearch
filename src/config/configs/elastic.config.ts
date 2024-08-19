import { z } from 'zod';
import { registerAs } from '@nestjs/config';

const schema = z.object({
  url: z.string(),
  username: z.string(),
  password: z.string(),
});

export const ELASTIC_CONFIG_KEY = 'elastic';
export type ElasticConfigType = z.infer<typeof schema>;

export default registerAs(ELASTIC_CONFIG_KEY, () => {
  const parseResult = schema.safeParse({
    url: process.env.ELASTIC_URL,
    username: process.env.ELASTIC_USERNAME,
    password: process.env.ELASTIC_PASSWORD,
  });

  if (!parseResult.success) {
    throw new Error(
      `Invalid elastic configuration env ${parseResult.error.errors[0].message}`,
    );
  }

  return parseResult.data;
});
