import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import Badge from "../../component/badge";
import InputOutline from "../../component/inputOutline";
import TextField from "../../component/textField";
import { RootState } from "../../store";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const onRemoveHobbie = (hobbie: string) => {
    console.log(`removing ${hobbie}....`);
  };

  return (
    <div className="w-full flex-1 bg-white absolute z-10 top-0 bottom-0 flex flex-col moveInFromLeft">
      <div className="w-full h-20 flex flex-col justify-start ">
        <InputOutline
          label="Username"
          name="username"
          value={userState.data.username}
          editable={false}
        />
        <InputOutline
          label="Address"
          name="address"
          value={userState.data.address}
          editable={false}
        />
        <InputOutline
          label="Phone number"
          name="phoneNumber"
          value={userState.data.phoneNumber}
          editable={false}
        />
        <InputOutline
          label="Email"
          name="email"
          value={userState.data.email}
          editable={false}
        />
        <InputOutline
          label="Birthdate"
          name="birthdate"
          type="date"
          defaultValue={userState.data.birthday}
          editable={false}
        />
        <TextField
          editable={false}
          name="bio"
          label="Bio"
          value={userState.data.bio}
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
            {userState.data.hobbies.map((hobbie) => {
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
