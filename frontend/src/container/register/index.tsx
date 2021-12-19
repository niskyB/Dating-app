import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoIcon from "../../component/icon/logo";
import InputField from "../../component/inputField";
import { RegisterUserDTO } from "../../common/interface/dto/user";
import CheckBox from "../../component/checkbox";
import { useState } from "react";
import { userRegister } from "./action";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { FormState } from "../../common/interface/redux/form";

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
  const form = useSelector<RootState, FormState>((state) => state.form);
  const { register, handleSubmit } = useForm<RegisterUserDTO>();
  const [maleCheck, setMaleCheck] = useState(false);
  const [femaleCheck, setFemaleCheck] = useState(false);
  const onSubmit: SubmitHandler<RegisterUserDTO> = async (data) => {
    if (maleCheck) {
      data.sex = "MALE";
    } else if (femaleCheck) {
      data.sex = "FEMALE";
    }
    await userRegister(data);
  };
  return (
    <div className="flex flex-col justify-center w-full h-auto py-10 sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md intro-y">
        <div className="w-20 h-20 mx-auto text-purple-700">
          <LogoIcon />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 uppercase">
          Register
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md intro-y">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              register={register}
              label="Name"
              name="name"
              type="text"
              errorMessage={form.errors.name}
            />
            <InputField
              register={register}
              label="Email"
              name="email"
              type="email"
              errorMessage={form.errors.email}
            />
            <InputField
              register={register}
              label="Phone number"
              name="phone"
              type="text"
              errorMessage={form.errors.phone}
            />
            <InputField
              register={register}
              label="Address"
              name="address"
              type="text"
              errorMessage={form.errors.address}
            />
            <InputField
              register={register}
              type="password"
              label="Password"
              name="password"
              errorMessage={form.errors.password}
            />
            <InputField
              register={register}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              errorMessage={form.errors.confirmPassword}
            />
            <InputField
              register={register}
              type="date"
              label="Birthdate"
              name="dateOfBirth"
              errorMessage={form.errors.dateOfBirth}
            />
            <div className="flex">
              <CheckBox
                label="male"
                checked={maleCheck}
                onChange={() => {
                  if (femaleCheck) {
                    setFemaleCheck(false);
                  }
                  setMaleCheck(true);
                }}
              />
              <CheckBox
                label="female"
                checked={femaleCheck}
                onChange={() => {
                  if (maleCheck) {
                    setMaleCheck(false);
                  }
                  setFemaleCheck(true);
                }}
                className="ml-5"
              />
            </div>
            {form.errors.sex && (
              <p className="text-sm text-red-600 mt-1">{form.errors.sex}</p>
            )}
            <div className="mt-2">
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
            <div className="flex justify-end">
              <div className="self-end mt-4 text-sm">
                Already have an account?
                <Link
                  to="/login"
                  className="ml-1 font-semibold text-indigo-600 underline hover:text-indigo-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
