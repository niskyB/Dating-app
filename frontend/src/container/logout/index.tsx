import { useNavigate } from "react-router-dom";
import { timeDelay } from "../../constants/loading";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { userAction } from "../../store/user";
import { openSuccessNotification } from "../../utils/notificationHelper";
import { logout } from "./action";

interface LogoutSectionProps {}

const LogoutSection: React.FunctionComponent<LogoutSectionProps> = () => {
  const navigate = useNavigate();
  const onLogout = async () => {
    store.dispatch(UIAction.setIsLoading(true));
    await logout().then(() => {
      navigate("/login");
      store.dispatch(userAction.setIsLogin(false));
      setTimeout(() => {
        store.dispatch(UIAction.setIsLoading(false));
        openSuccessNotification("Log out success!");
      }, timeDelay);
    });
  };
  return (
    <div className="flex items-center justify-between px-3 mt-5">
      <button
        className=" w-full text-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => onLogout()}
      >
        Log out
      </button>
    </div>
  );
};

export default LogoutSection;
