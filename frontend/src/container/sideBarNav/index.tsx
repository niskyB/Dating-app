import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import { NOTIFICATIONS_RESET } from "../../constants/event";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { notificationIo } from "../app/App";

interface SideBarNavProps {
  isMatchOpen: boolean;
  isMessagesOpen: boolean;
}

const SideBarNav: React.FunctionComponent<SideBarNavProps> = ({
  isMatchOpen,
  isMessagesOpen,
}) => {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  return (
    <>
      <div
        className={`relative cursor-pointer font-semibold w-1/2 ${
          isMatchOpen && "line"
        }`}
        onClick={() => {
          store.dispatch(UIAction.openMatchUI());
          notificationIo.emit(NOTIFICATIONS_RESET);
        }}
      >
        Matched
        {parseInt(UIState.socket.newMatch) > 0 && (
          <div className="absolute -right-4 -top-2 w-5 h-5 bg-[#FA383E] text-[10px] flex items-center justify-center rounded-full text-white">
            {UIState.socket.newMatch}
          </div>
        )}
      </div>

      <div
        className={`ml-7 font-semibold relative cursor-pointer w-1/2 ${
          isMessagesOpen && "line"
        }`}
        onClick={() => store.dispatch(UIAction.openMessagesUI())}
      >
        Messages
      </div>
    </>
  );
};

export default SideBarNav;
