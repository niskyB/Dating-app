import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import LogoIcon from "../../component/icon/logo";
import InputField from "../../component/inputField";
import { RegisterUserDTO } from "../../interface/dto/user";

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = () => {
  const { register, handleSubmit } = useForm<RegisterUserDTO>();
  const onSubmit: SubmitHandler<RegisterUserDTO> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center  w-full h-screen sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md intro-y">
        <div className="mx-auto text-purple-700 w-20 h-20">
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
              label="Username"
              name="username"
              type="text"
            />
            <InputField
              register={register}
              label="Email"
              name="email"
              type="email"
            />
            <InputField
              register={register}
              label="Phone number"
              name="phoneNumber"
              type="text"
            />
            <InputField
              register={register}
              label="Address"
              name="address"
              type="text"
            />
            <InputField
              register={register}
              type="password"
              label="Password"
              name="password"
            />
            <InputField
              register={register}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
            />
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
                  className="font-semibold ml-1 text-indigo-600 underline hover:text-indigo-500"
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
