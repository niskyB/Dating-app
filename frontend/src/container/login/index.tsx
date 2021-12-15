import { Link } from "react-router-dom";
import LogoIcon from "../../component/icon/logo";
import InputField from "../../component/inputField";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginUserDTO } from "../../interface/dto/user";
interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const { register, handleSubmit } = useForm<LoginUserDTO>();
  const onSubmit: SubmitHandler<LoginUserDTO> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center w-full h-screen  sm:px-6 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md intro-y">
        <div className="mx-auto text-purple-700 w-20 h-20">
          <LogoIcon />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900 uppercase">
          Sign in
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
              type="password"
              label="Password"
              name="password"
            />
            <div className="mt-2">
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
            <div className="flex justify-end">
              <div className="self-end mt-4 text-sm">
                Don't have account yet?
                <Link
                  to="/register"
                  className="font-semibold ml-1 text-indigo-600 underline hover:text-indigo-500"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
