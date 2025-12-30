import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CIRUGIAS_MS_HOST: string;
  CIRUGIAS_MS_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    CIRUGIAS_MS_HOST: joi.string().required(),
    CIRUGIAS_MS_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  PORT: envsVars.PORT,
  NODE_ENV: envsVars.NODE_ENV,
  CIRUGIAS_MS_HOST: envsVars.CIRUGIAS_MS_HOST,
  CIRUGIAS_MS_PORT: envsVars.CIRUGIAS_MS_PORT,
};
