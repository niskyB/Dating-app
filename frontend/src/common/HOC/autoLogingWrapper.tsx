import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../store";
import { userThunk } from "../../store/user/thunk";
import { UserState } from "../interface/redux/user";

interface AutoLogingWrapperProps {}

const AutoLogingWrapper: React.FunctionComponent<AutoLogingWrapperProps> = ({
  children,
}) => {
  const user = useSelector<RootState, UserState>((state) => state.user);

  useEffect(() => {
    store.dispatch(userThunk.getCurrentUser());
    return () => {};
  }, [user.isLogin]);
  return <>{children}</>;
};

export default AutoLogingWrapper;
