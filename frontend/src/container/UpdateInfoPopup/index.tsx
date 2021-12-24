import { XIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { useForm, SubmitHandler } from "react-hook-form";
import { userThunk } from "../../store/user/thunk";
import { openSuccessNotification } from "../../utils/notificationHelper";
import { updateUserInfo } from "./action";
import { timeDelay } from "../../constants/loading";
const UpdateInfoPopup: React.FunctionComponent = () => {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const {
    label,
    description,
    name,
    value,
    defaultValue,
    type = "text",
    isOpenning,
    isTextArea = false,
  } = UIState.updatePopup;
  const { register, handleSubmit } = useForm<any>({
    defaultValues: { [name]: defaultValue },
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    store.dispatch(UIAction.setIsLoading(true));
    const res = await updateUserInfo(name, data[name]);
    if (res.status === 200) {
      await store.dispatch(userThunk.getCurrentUser());
      store.dispatch(UIAction.closeUpdatePopup());
      setTimeout(() => {
        store.dispatch(UIAction.setIsLoading(false));
        openSuccessNotification(`Update your ${name} success!`);
      }, timeDelay);
    }
  };

  if (isOpenning)
    return (
      <>
        <div className="fixed z-40 -translate-x-1/2 -translate-y-1/2 bg-white shadow sm:rounded-lg top-1/2 left-1/2 ">
          <div className="px-4 py-5 sm:p-6 ">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Update your {label}
            </h3>
            <div className="max-w-xl mt-2 text-sm text-gray-500">
              <p>{description}</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 sm:flex sm:items-center"
            >
              <div className="w-full sm:max-w-xs">
                <label htmlFor={name} className="sr-only">
                  {label}
                </label>
                {isTextArea ? (
                  <>
                    <textarea
                      {...register(name)}
                      rows={4}
                      defaultValue={defaultValue}
                      className="block w-full bg-gray-300 border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                    />
                  </>
                ) : (
                  <input
                    {...register(name)}
                    value={value}
                    defaultValue={defaultValue}
                    type={type}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                )}
              </div>
              <button
                type="submit"
                className={`mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${
                  isTextArea && "self-start"
                }`}
              >
                Save
              </button>
            </form>
          </div>
          <div
            className="absolute w-8 h-8 text-gray-500 right-5 top-5"
            onClick={() => store.dispatch(UIAction.closeUpdatePopup())}
          >
            <XIcon className="w-8 h-8 text-gray-500 cursor-pointer " />
          </div>
        </div>
        <div className="fixed inset-0 z-30 w-screen h-screen bg-gray-300 opacity-80"></div>
      </>
    );
  return <></>;
};

export default UpdateInfoPopup;
