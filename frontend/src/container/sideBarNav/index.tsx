import { store } from "../../store";
import { UIAction } from "../../store/UI";

interface SideBarNavProps {
  isMatchOpen: boolean;
  isMessagesOpen: boolean;
}

const SideBarNav: React.FunctionComponent<SideBarNavProps> = ({
  isMatchOpen,
  isMessagesOpen,
}) => {
  return (
    <>
      <div
        className={`relative cursor-pointer font-semibold ${
          isMatchOpen && "line"
        }`}
        onClick={() => store.dispatch(UIAction.openMatchUI())}
      >
        Matched
      </div>

      <div
        className={`ml-4 font-semibold relative cursor-pointer ${
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
