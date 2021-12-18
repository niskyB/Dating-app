import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import Badge from "../../component/badge";
import InputOutline from "../../component/inputOutline";
import TextField from "../../component/textField";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { username, address, phoneNumber, email, birthday, bio, hobbies } =
    userState.data;
  const onRemoveHobbie = (hobbie: string) => {
    console.log(`removing ${hobbie}....`);
  };

  return (
    <div className="w-full flex-1 bg-white absolute z-10 top-0 bottom-0 flex flex-col moveInFromLeft">
      <div className="w-full h-20 flex flex-col justify-start ">
        <InputOutline
          label="Username"
          name="username"
          value={username}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "username",
                label: "username",
                defaultValue: username,
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
          defaultValue={birthday}
          editable={false}
          onEditClick={() =>
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "birthdate",
                label: "birthdate",
                defaultValue: birthday,
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
          <div className="flex  mt-3 border-b border-gray-300 focus-within:border-indigo-600">
            {hobbies.map((hobbie) => {
              return (
                <Badge value={hobbie} onRemove={() => onRemoveHobbie(hobbie)} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
