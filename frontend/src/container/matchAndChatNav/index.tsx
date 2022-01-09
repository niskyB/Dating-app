import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import MatchList from "../matchList";
import MessageSection from "../messageSection";
import SideBarNav from "../sideBarNav";
import { RootState } from "../../store";

interface MatchAndChatNavProps {}

const MatchAndChatNav: React.FunctionComponent<MatchAndChatNavProps> = () => {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  return (
    <div className="z-30 w-full h-contentHeight">
      <div className={`flex w-full h-10 px-5 mt-5 text-base IntroY`}>
        <SideBarNav
          isMatchOpen={UIState.isMatchOpen}
          isMessagesOpen={UIState.isMessagesOpen}
        />
      </div>
      <MatchList isOpenning={UIState.isMatchOpen} />
      <MessageSection isOpenning={UIState.isMessagesOpen} />
    </div>
  );
};

export default MatchAndChatNav;
