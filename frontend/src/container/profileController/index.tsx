import { ShowOptions } from "../../common/interface/entity/showOptions";
import ToggleButton from "../../component/toggleButton";
import { store } from "../../store";
import { userAction } from "../../store/user";

interface ProfileControllerProps {
  showOptions: ShowOptions;
}

const ProfileController: React.FunctionComponent<ProfileControllerProps> = ({
  showOptions,
}) => {
  const { showAge, showBio, showHobbies, showStudyAt } = showOptions;
  return (
    <div className="flex flex-col justify-start w-full text-base text-left">
      <div className="flex items-center justify-between px-3 mt-5">
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
      </div>
    </div>
  );
};

export default ProfileController;
