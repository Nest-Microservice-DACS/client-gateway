export enum PersonalStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export const PersonalStatusList = [
  PersonalStatus.ACTIVE,
  PersonalStatus.INACTIVE,
  PersonalStatus.SUSPENDED,
];

export enum PersonalRole {
  DOCTOR = 'DOCTOR',
  ASSISTANT = 'ASSISTANT',
  ANESTHESIOLOGIST = 'ANESTHESIOLOGIST',
  SCRUB_NURSE = 'SCRUB_NURSE',
  CIRCULATING_NURSE = 'CIRCULATING_NURSE',
  ADMIN = 'ADMIN',
  TECHNICIAN = 'TECHNICIAN',
}