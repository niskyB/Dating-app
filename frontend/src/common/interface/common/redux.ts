export interface ReduxAction<T> {
  type: string;
  payload: T;
}
export interface JoiError {
  [key: string]: string;
}
