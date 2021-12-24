import { ShowOptions } from "../../common/interface/entity/showOptions";
import ToggleButton from "../../component/toggleButton";
import { store } from "../../store";
import { userAction } from "../../store/user";
import { userThunk } from "../../store/user/thunk";
import { openSuccessNotification } from "../../utils/notificationHelper";
import { updateShowOptions } from "./action";
import { ShowOptionsList } from "./interface";

interface ProfileControllerProps {
  showOptions: ShowOptions;
}

const ProfileController: React.FunctionComponent<ProfileControllerProps> = ({
  showOptions,
}) => {
  const { showAge, showBio, showHobbies, showStudyAt } = showOptions;
  const showOptionsList: ShowOptionsList[] = [
    {
      label: "Show age",
      value: showAge,
      field: "showAge",
    },
    {
      label: "Show where you are studying",
      value: showStudyAt,
      field: "showStudyAt",
    },
    {
      label: "Show your hobbies",
      value: showHobbies,
      field: "showHobbies",
    },
    {
      label: "Show your bio",
      value: showBio,
      field: "showBio",
    },
  ];
  return (
    <div className="flex flex-col justify-start w-full text-base text-left">
      {showOptionsList.map((option) => {
        return (
          <div className="flex items-center justify-between px-3 mt-5">
            <div className="block font-medium text-black">{option.label}</div>
            <ToggleButton
              enabled={option.value}
              onToggle={async () => {
                const res = await updateShowOptions(
                  option.field,
                  !option.value
                );
                if (res.status === 200) {
                  await store.dispatch(userThunk.getCurrentUser());
                  openSuccessNotification("Update success!");
                }
              }}
            />
          </div>
        );
      })}
      {/* <div className="flex items-center justify-between px-3 mt-5">
        <div className="block font-medium text-black">Show age</div>
        <ToggleButton
          enabled={showAge}
          onToggle={() => {
            store.dispatch(userAction.toggleShowOptions("showAge"));
          }}
        />
      </div>
      <div className="flex items-center justify-between px-3 mt-5">
        <div className="block font-medium text-black">
          Show where you are studying
        </div>
        <ToggleButton
          enabled={showStudyAt}
          onToggle={() => {
            store.dispatch(userAction.toggleShowOptions("showStudyAt"));
          }}
        />
      </div>
      <div className="flex items-center justify-between px-3 mt-5">
        <div className="block font-medium text-black">Show your bio</div>
        <ToggleButton
          enabled={showBio}
          onToggle={() => {
            store.dispatch(userAction.toggleShowOptions("showBio"));
          }}
        />
      </div>
      <div className="flex items-center justify-between px-3 mt-5">
        <div className="block font-medium text-black">Show your hobbies</div>
        <ToggleButton
          enabled={showHobbies}
          onToggle={() => {
            store.dispatch(userAction.toggleShowOptions("showHobbies"));
          }}
        />
      </div> */}
    </div>
  );
};

export default ProfileController;
