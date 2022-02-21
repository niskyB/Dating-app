import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import DeviderWithText from "../../component/deviderWithText";
import InputOutline, { InputOutlineProps } from "../../component/inputOutline";
import TextField from "../../component/textField";
import { RootState, store } from "../../store";
import { FormAction } from "../../store/form";
import { UIAction } from "../../store/UI";
import { parseDate } from "../../utils/dataHelper";
import HighlightImage from "../highlightImage";
import LogoutSection from "../logout";
import ProfileController from "../profileController";
import ProfileHobbies from "../profileHobbies";

interface MyProfileProps {}

const MyProfile: React.FunctionComponent<MyProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const {
    name,
    address,
    phone,
    email,
    dateOfBirth,
    bio,
    hobbies,
    studyAt,
    highlightImgs,
    avatar,
  } = userState.data;
  const dateOfBirthString = parseDate(dateOfBirth);
  const inputOutlineField: InputOutlineProps[] = [
    {
      label: "Name",
      name: "name",
      value: name,
      editable: false,
    },
    {
      label: "Address",
      name: "address",
      value: address,
      editable: false,
    },
    {
      label: "Study at",
      name: "studyAt",
      value: studyAt,
      editable: false,
    },
    {
      label: "Phone number",
      name: "phone",
      editable: false,
      value: phone,
    },
    {
      label: "Email",
      name: "email",
      editable: false,
      value: email,
      updatable: false,
    },
    {
      label: "Birthdate",
      name: "dateOfBirth",
      type: "date",
      value: dateOfBirthString,
      editable: false,
      valueToShow: new Date(dateOfBirth).toLocaleDateString(),
    },
  ];
  return (
    <div className="z-10 flex flex-col flex-1 w-full pb-5 overflow-y-scroll transition-all duration-300 ease-in-out bg-white lg:h-contentHeight lg:absolute lg:bottom-0 moveInFromLeft">
      <div className="flex flex-col justify-start w-full ">
        <HighlightImage highlightImgs={highlightImgs} avatar={avatar} />
        {inputOutlineField.map((input) => {
          const { label, name, editable, type, updatable, value, valueToShow } =
            input;
          return (
            <InputOutline
              key={label}
              label={label}
              name={name}
              value={valueToShow || value}
              editable={editable}
              updatable={updatable}
              onEditClick={() => {
                store.dispatch(FormAction.resetError());
                store.dispatch(
                  UIAction.setUpdatePopup({
                    isOpenning: true,
                    name: name,
                    label: name === "studyAt" ? "school/university" : label,
                    description:
                      name === "studyAt"
                        ? "Update to let everyone know where you are studying"
                        : "",
                    defaultValue: value,
                    type: type,
                  })
                );
              }}
            />
          );
        })}

        <TextField
          editable={false}
          name="bio"
          label="Bio"
          defaultValue={bio}
          value={bio}
          onEditClick={() => {
            store.dispatch(FormAction.resetError());
            store.dispatch(
              UIAction.setUpdatePopup({
                isOpenning: true,
                name: "bio",
                label: "bio",
                defaultValue: bio,
                type: "textarea",
                isTextArea: true,
              })
            );
          }}
        />
        <ProfileHobbies data={hobbies} />
      </div>
      <DeviderWithText label="Control you profile" />
      <ProfileController showOptions={userState.data.showOptions} />
      <LogoutSection />
    </div>
  );
};

export default MyProfile;
