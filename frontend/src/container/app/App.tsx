import { Suspense } from "react";
import { Route, Routes } from "react-router";
import ProtectRouteWrapper from "../../common/HOC/protectRouteWrapper";
import LoadingAnimation from "../../component/loading";
import { contentRoutes } from "../../constants/route";
import SideBar from "../sidebar";

function App() {
  return (
    <div className="flex text-4xl ">
      <SideBar />
      <div className="justify-center flex-1 w-full h-screen bg-gray-50 align-center">
        <Suspense fallback={<LoadingAnimation />}>
          <Routes>
            {contentRoutes.map((route) => {
              const { component: MyComponent, isLoginRequire } = route;
              return (
                <Route
                  key={route.link}
                  element={
                    <ProtectRouteWrapper isLoginRequire={isLoginRequire} />
                  }
                >
                  <Route path={route.link} element={<MyComponent />} />
                </Route>
              );
            })}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
