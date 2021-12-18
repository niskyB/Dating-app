import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import Badge from "../../component/badge";
import DeviderWithText from "../../component/deviderWithText";
import InputOutline from "../../component/inputOutline";
import TextField from "../../component/textField";
import ToggleButton from "../../component/toggleButton";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { userAction } from "../../store/user";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { showAge, showBio, showHobbies, showStudyAt } =
    userState.data.profileConfig;

  const {
    name,
    address,
    phoneNumber,
    email,
    dayOfBirth,
    bio,
    hobbies,
    studyAt,
  } = userState.data;
  const onRemoveHobbie = (hobbie: string) => {
    console.log(`removing ${hobbie}....`);
  };

  return (
    <div className="w-full flex-1 bg-white absolute z-10 top-0 bottom-0 flex flex-col moveInFromLeft overflow-y-scroll pb-5">
      <div className="w-full flex flex-col justify-start ">
        <InputOutline
          label="Name"
          name="name"
          value={name}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "name",
                label: "Name",
                defaultValue: name,
              })
            )
          }
        />
        <InputOutline
          label="Address"
          name="address"
          value={address}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "address",
                label: "address",
                defaultValue: address,
              })
            )
          }
        />
        <InputOutline
          label="Study at"
          name="studyAt"
          value={studyAt}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "studyAt",
                label: "school/university",
                description:
                  "Update to let everyone know where you are studying",
                defaultValue: studyAt,
              })
            )
          }
        />
        <InputOutline
          label="Phone number"
          name="phoneNumber"
          value={phoneNumber}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "phoneNumber",
                label: "phone number",
                defaultValue: phoneNumber,
              })
            )
          }
        />
        <InputOutline
          label="Email"
          name="email"
          value={email}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "email",
                label: "email",
                defaultValue: email,
              })
            )
          }
        />
        <InputOutline
          label="Birthdate"
          name="birthdate"
          type="date"
          defaultValue={dayOfBirth}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "dayOfBirth",
                label: "birthdate",
                defaultValue: dayOfBirth,
                type: "date",
              })
            )
          }
        />
        <TextField
          editable={false}
          name="bio"
          label="Bio"
          value={bio}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "bio",
                label: "bio",
                defaultValue: bio,
                type: "textarea",
                isTextArea: true,
              })
            )
          }
        />
        <div className="mt-5">
          <div className="px-2 flex flex-row justify-between">
            <label
              htmlFor="hobbies"
              className="block text-base  font-medium text-gray-500"
            >
              Hobbies
            </label>
          </div>
          <div className="flex  mt-3 border-gray-300 focus-within:border-indigo-600">
            {hobbies.map((hobbie) => {
              return (
                <Badge value={hobbie} onRemove={() => onRemoveHobbie(hobbie)} />
              );
            })}
          </div>
        </div>
      </div>
      <DeviderWithText label="Control you profile" />
      <div className="w-full flex flex-col justify-start text-base text-left">
        <div className="px-3 flex justify-between items-center mt-5">
          <div className="block font-medium text-black">Show age</div>
          <ToggleButton
            enabled={showAge}
            onToggle={() => {
              store.dispatch(userAction.toggleProfileConfig("showAge"));
            }}
          />
        </div>
        <div className="px-3 flex justify-between items-center mt-5">
          <div className="block font-medium text-black">
            Show where you are studying
          </div>
          <ToggleButton
            enabled={showStudyAt}
            onToggle={() => {
              store.dispatch(userAction.toggleProfileConfig("showStudyAt"));
            }}
          />
        </div>
        <div className="px-3 flex justify-between items-center mt-5">
          <div className="block font-medium text-black">Show your bio</div>
          <ToggleButton
            enabled={showBio}
            onToggle={() => {
              store.dispatch(userAction.toggleProfileConfig("showBio"));
            }}
          />
        </div>
        <div className="px-3 flex justify-between items-center mt-5">
          <div className="block font-medium text-black">Show your hobbies</div>
          <ToggleButton
            enabled={showHobbies}
            onToggle={() => {
              store.dispatch(userAction.toggleProfileConfig("showHobbies"));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
