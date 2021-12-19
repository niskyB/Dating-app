import { JoiError } from "./../redux/form";
export interface DataResponse<T> {
  data: T;
  errors: JoiError;
}
