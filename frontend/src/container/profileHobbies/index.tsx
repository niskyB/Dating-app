import { Hobby } from "../../common/interface/entity/hobby";
import Badge from "../../component/badge";

interface ProfileHobbiesProps {
  data: Hobby[];
}

const ProfileHobbies: React.FunctionComponent<ProfileHobbiesProps> = ({
  data,
}) => {
  const onRemoveHobby = (hobby: string) => {
    console.log(`removing ${hobby}....`);
  };
  const onAddHobby = () => {};
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
      <div className="flex mt-3 border-gray-300 focus-within:border-indigo-600">
        {data.map((hobby) => {
          return (
            <Badge
              value={hobby.name}
              onRemove={() => onRemoveHobby(hobby.name)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileHobbies;
