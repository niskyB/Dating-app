export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export type sexEnumString = keyof typeof Sex;
