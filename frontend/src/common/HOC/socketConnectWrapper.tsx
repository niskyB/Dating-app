import { useEffect } from "react";
import {
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
} from "../../constants/event";
import { notificationIo } from "../../container/app/App";
import { GetMatchedList } from "../../container/matchList/action";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { SocketNotificationPayload } from "../../store/UI/interface";
// import * as socketIo from "socket.io-client";
interface SocketConnectWrapperProps {}

// export const notificationIo = socketIo.connect(
//   `${process.env.REACT_APP_SERVER_URL}/notifications`,
//   { path: "/socket.io" }
// );

const SocketConnectWrapper: React.FunctionComponent<SocketConnectWrapperProps> =
  ({ children }) => {
    const onHandleGetData = (data: SocketNotificationPayload) => {
      store.dispatch(UIAction.setSocketNotification(data));
      GetMatchedList();
    };

    useEffect(() => {
      notificationIo.disconnect();
      notificationIo.connect();
      notificationIo.emit(NOTIFICATIONS_CONNECTION);
      notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
      return () => {
        notificationIo.off(NOTIFICATIONS_GET);
      };
    }, []);
    return <>{children}</>;
  };

export default SocketConnectWrapper;
