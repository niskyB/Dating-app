import { JoiError } from "./redux";

export interface DataResponse<T> {
  data: T;
  errors: JoiError;
}
