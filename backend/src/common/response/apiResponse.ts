import { ResponseBody } from '../interface/api.interface';

class ApiResponse {
  public send<T>(data: T, errors: any) {
    return {
      data: data,
      errors: errors,
    } as ResponseBody<T>;
  }
}

export const apiResponse = new ApiResponse();
