import { ShowOptions } from "../../common/interface/entity/showOptions";
import ToggleButton from "../../component/toggleButton";
import { timeDelay } from "../../constants/loading";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
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
          <div
            className="flex items-center justify-between px-3 mt-5"
            key={option.field}
          >
            <div className="block font-medium text-black">{option.label}</div>
            <ToggleButton
              enabled={option.value}
              onToggle={async () => {
                store.dispatch(UIAction.setIsLoading(true));
                const res = await updateShowOptions(
                  option.field,
                  !option.value
                );

                if (res.status === 200) {
                  await store.dispatch(userThunk.getCurrentUser());
                  setTimeout(() => {
                    store.dispatch(UIAction.setIsLoading(false));
                    openSuccessNotification("Update success!");
                  }, timeDelay);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProfileController;
