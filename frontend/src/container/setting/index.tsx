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
      <div className="flex-1 w-full  ">
        <div className="flex px-3 py-3 justify-between items-center bg-gray-300  border-y-1">
          <label className="text-base">Sex</label>
          <SelectedField
            data={sexFindingData}
            current={UserState.findingConfig.sex}
          />
        </div>
        <div className="flex px-3 py-3 justify-between items-center bg-gray-300  border-y-1">
          <label className="text-base">Age</label>
          <div className="flex flex-row w-2/3 items-center">
            <div className="text-base px-2">From</div>
            <InputField
              name="minAge"
              defaultValue={UserState.findingConfig.minAge}
              showLabel={false}
              register={register}
            />
            <div className="text-base px-2 ">to</div>
            <InputField
              defaultValue={UserState.findingConfig.maxAge}
              name="maxAge"
              showLabel={false}
              register={register}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default Setting;
