import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { findOptionDTO } from "../../common/interface/dto/findConfig";
import { sexEnumString, UserState } from "../../common/interface/redux/user";
import InputField from "../../component/inputField";
import SelectedField from "../../component/selectedField";
import { RootState } from "../../store";

interface SettingProps {}

const sexFindingData: sexEnumString[] = ["FEMALE", "MALE"];
const Setting: React.FunctionComponent<SettingProps> = () => {
  const { register, handleSubmit } = useForm<findOptionDTO>();
  const UserState = useSelector<RootState, UserState>((state) => state.user);
  return (
    <form className="w-full items-start pt-5 flex-1 bg-white absolute z-10 top-0 bottom-0 flex flex-col moveInFromRight">
      <label className="block text-base px-3 mb-3  text-black font-semibold">
        Finding setting
      </label>
      <div className="flex-1 flex flex-col w-full  ">
        <div className="flex px-3 py-3 justify-between items-center bg-gray-300  border-y-1">
          <label className="text-base">Sex</label>
          <SelectedField
            data={sexFindingData}
            current={UserState.data.findConfig.sex}
          />
        </div>
        <div className="flex px-3 py-3 justify-between items-center bg-gray-300  border-y-1">
          <label className="text-base">Age</label>
          <div className="flex flex-row w-2/3 items-center">
            <div className="text-base px-2">From</div>
            <InputField
              name="minAge"
              defaultValue={UserState.data.findConfig.minAge}
              showLabel={false}
              register={register}
            />
            <div className="text-base px-2 ">to</div>
            <InputField
              defaultValue={UserState.data.findConfig.maxAge}
              name="maxAge"
              showLabel={false}
              register={register}
            />
          </div>
        </div>
        <button
          type="submit"
          className="  text-center self-end mr-4 mt-4 px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Setting;
