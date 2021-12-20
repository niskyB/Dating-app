import { User } from "../../common/interface/entity/user";

export interface RegisterUserDTO
  extends Pick<
    User,
    "email" | "password" | "address" | "name" | "phone" | "sex" | "dateOfBirth"
  > {
  confirmPassword: string;
}
