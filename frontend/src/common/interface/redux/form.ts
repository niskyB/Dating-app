export interface JoiError {
  [key: string]: string;
}

export interface FormState {
  errors: JoiError;
}
