import { Route } from "react-router";
import ProtectRouteWrapper from "../common/HOC/protectRouteWrapper";
import { route } from "../constants/route";

export const renderHelper = (
  routeList: route[],
  showNotFoundPage: boolean,
  isMobile?: boolean
): React.ReactNode => {
  return routeList.map((route) => {
    const {
      component: MyComponent,
      isLoginRequire,
      isMobileRoute = false,
    } = route;
    if (isMobileRoute && isMobile) return null;
    return (
      <Route
        key={route.link}
        element={
          <ProtectRouteWrapper
            showNotFoundPage={showNotFoundPage}
            isLoginRequire={isLoginRequire}
          />
        }
      >
        <Route path={route.link} element={<MyComponent />} />
      </Route>
    );
  });
};
