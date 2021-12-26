import { Hobby } from "../../common/interface/entity/hobby";
import Badge from "../../component/badge";
import { timeDelay } from "../../constants/loading";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { userThunk } from "../../store/user/thunk";
import { openSuccessNotification } from "../../utils/notificationHelper";
import { removeHobby } from "./action";

interface ProfileHobbiesProps {
  data: Hobby[];
}

const ProfileHobbies: React.FunctionComponent<ProfileHobbiesProps> = ({
  data,
}) => {
  const onRemoveHobby = async (id: string) => {
    const isConfirm = window.confirm(
      "Do you really want to delete this hobby from your list?"
    );
    if (isConfirm) {
      store.dispatch(UIAction.setIsLoading(true));
      const res = await removeHobby(id);
      if (res.status === 200) {
        await store.dispatch(userThunk.getCurrentUser());
        setTimeout(() => {
          store.dispatch(UIAction.setIsLoading(false));
          openSuccessNotification("remove hobby success!");
        }, timeDelay);
      }
    }
  };
  const onAddHobby = () => {
    store.dispatch(
      UIAction.setUpdatePopup({
        isOpenning: true,
        name: "hobbies",
        label: "hobby",
        description: "add new hobby to let everyone know about this",
        type: "text",
      })
    );
  };
  return (
    <div className="mt-5">
      <div className="flex flex-row justify-between px-2">
        <label
          htmlFor="hobbies"
          className="block text-base font-medium text-gray-500"
        >
          Hobbies
        </label>
        <div
          className="text-base text-blue-500 font-semibold cursor-pointer"
          onClick={onAddHobby}
        >
          Add
        </div>
      </div>
      <div className="flex flex-wrap mt-3 border-gray-300 focus-within:border-indigo-600">
        {data.map((hobby, index) => {
          if (index <= 6) {
            return (
              <Badge
                value={hobby.hobbies}
                onRemove={() => onRemoveHobby(hobby.id)}
              />
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
};

export default ProfileHobbies;
