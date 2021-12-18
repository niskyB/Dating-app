import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";

interface PreviewProfileProps {}

const PreviewProfile: React.FunctionComponent<PreviewProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { avatar, bio, name, dayOfBirth, studyAt } = userState.data;
  const dayOfBirthYear = new Date(dayOfBirth).getFullYear();
  const currentYear = new Date().getFullYear();
  return (
    <MatchWrapper>
      <Card
        data={{
          age: currentYear - dayOfBirthYear,
          avatar,
          bio,
          name,
          studyAt,
        }}
      />
    </MatchWrapper>
  );
};

export default PreviewProfile;
