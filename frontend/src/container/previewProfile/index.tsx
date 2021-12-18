import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";

interface PreviewProfileProps {}

const PreviewProfile: React.FunctionComponent<PreviewProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const { avatar, bio, username, birthday, studyAt } = userState.data;
  const birthdayYear = new Date(birthday).getFullYear();
  const currentYear = new Date().getFullYear();
  return (
    <MatchWrapper>
      <Card
        data={{
          age: currentYear - birthdayYear,
          avatar,
          bio,
          username,
          studyAt,
        }}
      />
    </MatchWrapper>
  );
};

export default PreviewProfile;
