import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";

interface PreviewProfileProps {}

const PreviewProfile: React.FunctionComponent<PreviewProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { avatar, bio, name, dateOfBirth, studyAt } = userState.data;
  const dateOfBirthYear = new Date(dateOfBirth).getFullYear();
  const currentYear = new Date().getFullYear();
  return (
    <MatchWrapper>
      <Card
        data={{
          age: currentYear - dateOfBirthYear,
          avatar,
          bio,
          name,
          studyAt,
        }}
        options={userState.data.showOptions}
      />
    </MatchWrapper>
  );
};

export default PreviewProfile;
