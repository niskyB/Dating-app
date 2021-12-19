import { User } from "../entity/user";

export interface UserDataDTO extends Omit<User, "password"> {}

export interface RegisterUserDTO
  extends Pick<
    User,
    "email" | "password" | "address" | "name" | "phone" | "sex" | "dateOfBirth"
  > {
  confirmPassword: string;
}
