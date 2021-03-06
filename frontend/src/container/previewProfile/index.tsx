import { useSelector } from "react-redux";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";

interface PreviewProfileProps {}

const PreviewProfile: React.FunctionComponent<PreviewProfileProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const {
    avatar,
    bio,
    name,
    dateOfBirth,
    studyAt,
    hobbies,
    highlightImgs,
    id,
    sex,
    showOptions,
    findOptions,
  } = userState.data;

  return (
    <MatchWrapper className="hidden lg:flex">
      <Card
        data={{
          dateOfBirth,
          avatar,
          bio,
          name,
          studyAt,
          hobbies,
          highlightImgs,
          id,
          sex,
          showOptions,
          findOptions,
        }}
        onShow={true}
        options={userState.data.showOptions}
      />
    </MatchWrapper>
  );
};

export default PreviewProfile;
