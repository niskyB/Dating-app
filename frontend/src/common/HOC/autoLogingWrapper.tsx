import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
} from "../../constants/event";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { SocketNotificationPayload } from "../../store/UI/interface";
import { userThunk } from "../../store/user/thunk";
import { UserState } from "../interface/redux/user";
import * as socketIo from "socket.io-client";
interface AutoLogingWrapperProps {}

export const notificationIo = socketIo.connect(
  `${process.env.REACT_APP_SERVER_URL}/notifications`,
  { path: "/socket.io" }
);
export const chatIo = socketIo.connect(
  `${process.env.REACT_APP_SERVER_URL}/chat`,
  { path: "/socket.io" }
);

const AutoLogingWrapper: React.FunctionComponent<AutoLogingWrapperProps> = ({
  children,
}) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const onHandleGetData = async (data: SocketNotificationPayload) => {
    await store.dispatch(UIAction.setSocketNotification(data));
  };
  useEffect(() => {
    notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
    notificationIo.emit(NOTIFICATIONS_CONNECTION);

    return () => {
      notificationIo.off(NOTIFICATIONS_GET);
    };
  }, []);
  useEffect(() => {
    notificationIo.disconnect();
    notificationIo.connect();
    notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
    notificationIo.emit(NOTIFICATIONS_CONNECTION);

    store.dispatch(userThunk.getCurrentUser());
    return () => {
      notificationIo.off(NOTIFICATIONS_GET);
    };
  }, [user.isLogin]);
  return <>{children}</>;
};

export default AutoLogingWrapper;
