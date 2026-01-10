import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  CIRUGIAS_MS_HOST: string;
  CIRUGIAS_MS_PORT: number;
  PACIENTES_MS_HOST: string;
  PACIENTES_MS_PORT: number;
  PERSONAL_MS_HOST: string;
  PERSONAL_MS_PORT: number;
  SERVICIOS_MS_HOST: string;
  SERVICIOS_MS_PORT: number;
  QUIROFANOS_MS_HOST: string;
  QUIROFANOS_MS_PORT: number;
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
    PACIENTES_MS_HOST: joi.string().required(),
    PACIENTES_MS_PORT: joi.number().required(),
    PERSONAL_MS_HOST: joi.string().required(),
    PERSONAL_MS_PORT: joi.number().required(),
    SERVICIOS_MS_HOST: joi.string().required(),
    SERVICIOS_MS_PORT: joi.number().required(),
    QUIROFANOS_MS_HOST: joi.string().required(),
    QUIROFANOS_MS_PORT: joi.number().required(),
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
  PACIENTES_MS_HOST: envsVars.PACIENTES_MS_HOST,
  PACIENTES_MS_PORT: envsVars.PACIENTES_MS_PORT,
  PERSONAL_MS_HOST: envsVars.PERSONAL_MS_HOST,
  PERSONAL_MS_PORT: envsVars.PERSONAL_MS_PORT,
  SERVICIOS_MS_HOST: envsVars.SERVICIOS_MS_HOST,
  SERVICIOS_MS_PORT: envsVars.SERVICIOS_MS_PORT,
  QUIROFANOS_MS_HOST: envsVars.QUIROFANOS_MS_HOST,
  QUIROFANOS_MS_PORT: envsVars.QUIROFANOS_MS_PORT,
};
