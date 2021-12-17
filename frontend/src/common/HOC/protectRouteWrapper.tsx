import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import NotFoundPage from "../../component/notFound";
import { RootState } from "../../store";
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
    useEffect(() => {
      if (isLoginRequire && !getCookie("x-auth-token")) {
        setIsAccess(false);
        return;
      }
      setIsAccess(true);
    }, [userState.isLogin, isLoginRequire]);
    return <>{isAccess ? <Outlet /> : showNotFoundPage && <NotFoundPage />}</>;
  };

export default ProtectRouteWrapper;
