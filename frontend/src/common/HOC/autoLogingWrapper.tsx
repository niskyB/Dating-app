import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  NOTIFICATIONS_CONNECTION,
  NOTIFICATIONS_GET,
} from "../../constants/event";
import { notificationIo } from "../../container/app/App";
import { GetMatchedList } from "../../container/matchList/action";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { SocketNotificationPayload } from "../../store/UI/interface";
import { userThunk } from "../../store/user/thunk";
import { UserState } from "../interface/redux/user";

interface AutoLogingWrapperProps {}

const AutoLogingWrapper: React.FunctionComponent<AutoLogingWrapperProps> = ({
  children,
}) => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  const onHandleGetData = (data: SocketNotificationPayload) => {
    console.log("this is from autologging  get data" + data);
    store.dispatch(UIAction.setSocketNotification(data));
    GetMatchedList();
  };
  useEffect(() => {
    console.log("auto logging");
    notificationIo.emit(NOTIFICATIONS_CONNECTION);
    notificationIo.on(NOTIFICATIONS_GET, onHandleGetData);
    store.dispatch(userThunk.getCurrentUser());
    return () => {
      notificationIo.off(NOTIFICATIONS_GET);
    };
  }, [user.isLogin]);
  return <>{children}</>;
};

export default AutoLogingWrapper;
