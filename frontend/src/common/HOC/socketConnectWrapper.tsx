import { useEffect } from "react";
import {
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
} from "../../constants/event";
import { GetMatchedList } from "../../container/matchList/action";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { SocketNotificationPayload } from "../../store/UI/interface";
import * as socketIo from "socket.io-client";
import { useSelector } from "react-redux";
import { UserState } from "../interface/redux/user";
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
  useEffect(() => {
    if (user.isLogin) {
      // notificationIo.close();
      // notificationIo.open();
      notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
      notificationIo.emit(NOTIFICATIONS_CONNECTION);
    }
    return () => {
      notificationIo.off(NOTIFICATIONS_GET);
    };
  }, [user.isLogin]);
  return <>{children}</>;
};

export default SocketConnectWrapper;
