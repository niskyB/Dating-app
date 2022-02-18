import { useEffect } from "react";
import {
  CHAT_JOIN_GLOBAL,
  CHAT_LEAVE_GLOBAL,
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
  NOTIFICATIONS_NEW_MATCH,
} from "../../constants/event";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { SocketNotificationPayload } from "../../store/UI/interface";
import * as socketIo from "socket.io-client";
import { useSelector } from "react-redux";
import { UserState } from "../interface/redux/user";
import { MatchCard } from "../../component/card/interface.dto";
import { openNewMatchPopup } from "../../utils/notificationHelper";
interface SocketConnectWrapperProps {}
export const notificationIo = socketIo.connect(
  `${process.env.REACT_APP_SERVER_URL}/notifications`,
  { path: "/socket.io" }
);
export const chatIo = socketIo.connect(
  `${process.env.REACT_APP_SERVER_URL}/chat`,
  { path: "/socket.io" }
);
const SocketConnectWrapper: React.FunctionComponent<
  SocketConnectWrapperProps
> = ({ children }) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const onHandleGetData = async (data: SocketNotificationPayload) => {
    await store.dispatch(UIAction.setSocketNotification(data));
  };
  const onHandlePopupNewMatch = (data: MatchCard) => {
    openNewMatchPopup(data);
  };
  useEffect(() => {
    if (user.isLogin) {
      notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
      notificationIo.emit(NOTIFICATIONS_CONNECTION);
      notificationIo.on(NOTIFICATIONS_NEW_MATCH, onHandlePopupNewMatch);
      chatIo.emit(CHAT_JOIN_GLOBAL);
    }
    return () => {
      notificationIo.off(NOTIFICATIONS_GET);
      chatIo.emit(CHAT_LEAVE_GLOBAL);
    };
  }, [user.isLogin]);
  return <>{children}</>;
};

export default SocketConnectWrapper;
