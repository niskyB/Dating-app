import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import NotFoundPage from "../../component/notFound";
import { RootState } from "../../store";
import { openWarningNotification } from "../../utils/notificationHelper";
import { UserState } from "../interface/redux/user";

interface ProtectRouteWrapperProps {
  isLoginRequire?: boolean;
  showNotFoundPage?: boolean;
}
function getCookie(cname: string) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
const ProtectRouteWrapper: React.FunctionComponent<ProtectRouteWrapperProps> =
  ({ isLoginRequire = false, showNotFoundPage = true }) => {
    const userState = useSelector<RootState, UserState>((state) => state.user);
    const [isAccess, setIsAccess] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
      if (isLoginRequire && !getCookie("x-auth-token")) {
        setIsAccess(false);
        navigate("/login");
        openWarningNotification("You need to login first to view this page");
        return;
      }
      setIsAccess(true);
    }, [userState.isLogin, isLoginRequire, navigate]);
    return <>{isAccess ? <Outlet /> : showNotFoundPage && <NotFoundPage />}</>;
  };

export default ProtectRouteWrapper;
