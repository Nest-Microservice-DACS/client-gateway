import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';
  SURGERY_MS_HOST: string;
  SURGERY_MS_PORT: number;
  PATIENT_MS_HOST: string;
  PATIENT_MS_PORT: number;
  PERSONAL_MS_HOST: string;
  PERSONAL_MS_PORT: number;
  SERVICE_MS_HOST: string;
  SERVICE_MS_PORT: number;
  OPERATING_ROOM_MS_HOST: string;
  OPERATING_ROOM_MS_PORT: number;
  AGENDA_MS_HOST: string;
  AGENDA_MS_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'test')
      .default('development'),
    SURGERY_MS_HOST: joi.string().required(),
    SURGERY_MS_PORT: joi.number().required(),
    PATIENT_MS_HOST: joi.string().required(),
    PATIENT_MS_PORT: joi.number().required(),
    PERSONAL_MS_HOST: joi.string().required(),
    PERSONAL_MS_PORT: joi.number().required(),
    SERVICE_MS_HOST: joi.string().required(),
    SERVICE_MS_PORT: joi.number().required(),
    OPERATING_ROOM_MS_HOST: joi.string().required(),
    OPERATING_ROOM_MS_PORT: joi.number().required(),
    AGENDA_MS_HOST: joi.string().required(),
    AGENDA_MS_PORT: joi.number().required(),
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
  SURGERY_MS_HOST: envsVars.SURGERY_MS_HOST,
  SURGERY_MS_PORT: envsVars.SURGERY_MS_PORT,
  PATIENT_MS_HOST: envsVars.PATIENT_MS_HOST,
  PATIENT_MS_PORT: envsVars.PATIENT_MS_PORT,
  PERSONAL_MS_HOST: envsVars.PERSONAL_MS_HOST,
  PERSONAL_MS_PORT: envsVars.PERSONAL_MS_PORT,
  SERVICE_MS_HOST: envsVars.SERVICE_MS_HOST,
  SERVICE_MS_PORT: envsVars.SERVICE_MS_PORT,
  OPERATING_ROOM_MS_HOST: envsVars.OPERATING_ROOM_MS_HOST,
  OPERATING_ROOM_MS_PORT: envsVars.OPERATING_ROOM_MS_PORT,
  AGENDA_MS_HOST: envsVars.AGENDA_MS_HOST,
  AGENDA_MS_PORT: envsVars.AGENDA_MS_PORT,
};
