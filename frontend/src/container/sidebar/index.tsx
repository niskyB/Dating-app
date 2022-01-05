import { useSelector } from "react-redux";
import NotLoginMessage from "../../component/notLogin";
import TopSideBar from "../topSideBar";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import { Routes } from "react-router-dom";
import { renderHelper } from "../../utils/renderHelper";
import { sideBarRoute } from "../../constants/route";
import { Suspense } from "react";
import LoadingAnimation from "../../component/loading";
import MatchAndChat from "../matchAndChat";
import useMediaQuery from "../../common/hook/useMediaQuery";
import SideBarNav from "../sideBarNav";
import MatchList from "../matchList";
import MessageSection from "../messageSection";
import { UIState } from "../../common/interface/redux/ui";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <div
      className={`flex flex-col flex-start lg:w-full lg:h-screen w-screen  lg:max-w-sm bg-white`}
    >
      <TopSideBar isLogin={userState.isLogin} />
      <div
        className={`flex flex-auto flex-col  ${
          userState.isLogin ? "justify-start" : "justify-center"
        }  text-center overflow-hidden lg:relative duration-300 transition-all `}
      >
        {userState.isLogin ? (
          <div className="hidden lg:block">
            <div className={`flex w-full h-10 px-5 mt-2 text-base`}>
              <SideBarNav
                isMatchOpen={UIState.isMatchOpen}
                isMessagesOpen={UIState.isMessagesOpen}
              />
            </div>
            <MatchList isOpenning={UIState.isMatchOpen} />
            <MessageSection isOpenning={UIState.isMessagesOpen} />
          </div>
        ) : (
          <NotLoginMessage />
        )}
        <Suspense fallback={<LoadingAnimation isLoading={true} />}>
          <Routes>{renderHelper(sideBarRoute, false)}</Routes>
        </Suspense>
        {/* {userState.isLogin ? (
          <div className="">
            <MatchAndChat renderOnMobile={true} />
          </div>
        ) : (
          <NotLoginMessage />
        )} */}
      </div>
    </div>
  );
};

export default SideBar;
