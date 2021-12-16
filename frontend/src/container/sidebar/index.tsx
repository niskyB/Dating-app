import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NotLoginMessage from "../../component/notLogin";
import TopSideBar from "../../component/topSideBar";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import MatchList from "../matchList";
import MessageSection from "../messageSection";
import SideBarNav from "../sideBarNav";

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
              <Route path="/match" element={<MatchList />} />
              <Route path="/messages/*" element={<MessageSection />} />
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
