import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import { RootState } from "../../store";
import MatchList from "../matchList";
import MessageSection from "../messageSection";
import SideBarNav from "../sideBarNav";

interface MatchAndChatProps {}

const MatchAndChat: React.FunctionComponent<MatchAndChatProps> = () => {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  return (
    <div className="w-full h-contentHeight z-30">
      <div className={`flex w-full h-10 px-5 mt-2 text-base moveInFromRight`}>
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

export default MatchAndChat;
