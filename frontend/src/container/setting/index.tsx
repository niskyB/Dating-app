import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { sexEnumString, UserState } from "../../common/interface/redux/user";
import InputField from "../../component/inputField";
import SelectedField from "../../component/selectedField";
import { timeDelay } from "../../constants/loading";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { userThunk } from "../../store/user/thunk";
import {
  openSuccessNotification,
  openWarningNotification,
} from "../../utils/notificationHelper";
import { updateChangeOption } from "./action";
import { findOptionDTO } from "./interface.dto";

interface SettingProps {}

const sexFindingData: sexEnumString[] = ["FEMALE", "MALE"];
const Setting: React.FunctionComponent<SettingProps> = () => {
  const { register, handleSubmit, setValue } = useForm<findOptionDTO>();
  const UserState = useSelector<RootState, UserState>((state) => state.user);
  const [sexOption, setSexOption] = useState<sexEnumString>(
    UserState.data.findOptions.sexOption
  );
  const onSubmit = async (data: findOptionDTO) => {
    if (data.minAge < 18 || data.maxAge < 18) {
      openWarningNotification("Min age or max age should be higher than 18");
      setValue("minAge", UserState.data.findOptions.minAge);
      setValue("maxAge", UserState.data.findOptions.maxAge);
      return;
    }
    data.sexOption = sexOption;
    const res = await updateChangeOption(data);
    store.dispatch(UIAction.setIsLoading(true));
    if (res.status === 200) {
      await store.dispatch(userThunk.getCurrentUser());
      setTimeout(() => {
        store.dispatch(UIAction.setIsLoading(false));
        openSuccessNotification("Update finding setting success!");
      }, timeDelay);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="z-10 flex flex-col items-start flex-1 w-full pt-5 bg-white lg:absolute lg:h-contentHeight lg:bottom-0 moveInFromRight"
    >
      <label className="block px-3 mb-3 text-base font-semibold text-black">
        Finding setting
      </label>
      <div className="flex flex-col flex-1 w-full ">
        <div className="flex items-center justify-between px-3 py-3 bg-gray-300 border-y-1">
          <label className="text-base">Sex</label>
          <SelectedField
            data={sexFindingData}
            current={UserState.data.findOptions.sexOption}
            value={sexOption}
            setValue={setSexOption}
          />
        </div>
        <div className="flex items-center justify-between px-3 py-3 bg-gray-300 border-y-1">
          <label className="text-base">Age</label>
          <div className="flex flex-row items-center w-2/3">
            <div className="px-2 text-base capitalize">From</div>
            <InputField
              name="minAge"
              defaultValue={UserState.data.findOptions.minAge}
              showLabel={false}
              register={register}
            />
            <div className="px-2 text-base capitalize ">to</div>
            <InputField
              defaultValue={UserState.data.findOptions.maxAge}
              name="maxAge"
              showLabel={false}
              register={register}
            />
          </div>
        </div>
        <button
          type="submit"
          className="self-end px-6 py-2 mt-4 mr-4 text-sm font-medium text-center text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Setting;
