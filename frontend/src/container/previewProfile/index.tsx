import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";

interface PreviewProfileProps {}

const PreviewProfile: React.FunctionComponent<PreviewProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { avatar, bio, name, dateOfBirth, studyAt } = userState.data;
  const { showAge, showBio, showHobbies, showStudyAt } =
    userState.data.profileConfig;
  const dateOfBirthYear = new Date(dateOfBirth).getFullYear();
  const currentYear = new Date().getFullYear();
  return (
    <MatchWrapper>
      <Card
        data={{
          age: showAge ? currentYear - dateOfBirthYear : -1,
          avatar,
          bio: showBio ? bio : "",
          name,
          studyAt: showStudyAt ? studyAt : "",
        }}
      />
    </MatchWrapper>
  );
};

export default PreviewProfile;
