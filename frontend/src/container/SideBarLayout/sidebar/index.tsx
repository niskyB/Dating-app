import { useSelector } from "react-redux";
import NotLoginMessage from "../../../component/notLogin";
import TopSideBar from "../topSideBar";
import { UserState } from "../../../common/interface/redux/user";
import { RootState } from "../../../store";
import { Routes } from "react-router-dom";
import { renderHelper } from "../../../utils/renderHelper";
import { sideBarRoute } from "../../../constants/route";
import { Suspense } from "react";
import LoadingAnimation from "../../../component/loading";
import MatchAndChatDesktop from "../matchAndChatDesktop";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);

  return (
    <div
      className={`flex flex-col flex-start lg:w-full lg:h-screen w-screen lg:max-w-sm bg-white`}
    >
      <TopSideBar isLogin={userState.isLogin} />
      <div
        className={`flex flex-auto flex-col  ${
          userState.isLogin ? "justify-start" : "justify-center"
        }  text-center overflow-hidden lg:relative duration-300 transition-all `}
      >
        {userState.isLogin ? <MatchAndChatDesktop /> : <NotLoginMessage />}
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
          <Routes>{renderHelper(sideBarRoute, false)}</Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default SideBar;
