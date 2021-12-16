import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotLoginMessage from "../../component/notLogin";
import TopSideBar from "../../component/topSideBar";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import SideBarNav from "../sideBarNav";
import { sideBarRoute } from "../../constants/route";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  return (
    <div className="flex flex-col w-full h-screen max-w-xs bg-white ">
      <TopSideBar isLogin={userState.isLogin} />
      <div
        className={`flex flex-col ${
          userState.isLogin ? "justify-start" : "justify-center"
        } flex-auto  py-3 text-center`}
      >
        {userState.isLogin ? (
          <>
            <div className="flex w-full h-10 px-5 text-base">
              <SideBarNav />
            </div>
            <Routes>
              {sideBarRoute.map((route) => {
                const { component: MyComponent } = route;
                return (
                  <Route
                    key={route.link}
                    path={route.link}
                    element={<MyComponent />}
                  />
                );
              })}
            </Routes>
          </>
        ) : (
          <NotLoginMessage />
        )}
      </div>
    </div>
  );
};

export default SideBar;
