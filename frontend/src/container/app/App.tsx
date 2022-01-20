import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router";
import { UIState } from "../../common/interface/redux/ui";
import { UserState } from "../../common/interface/redux/user";
import CropperBox from "../cropper";
import LoadingAnimation from "../../component/loading";
import Notification from "../../component/notification";
import { contentRoutes } from "../../constants/route";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { renderHelper } from "../../utils/renderHelper";
import SideBar from "../sidebar";
import NewMatchModel from "../newMatchModel";

function App() {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const userState = useSelector<RootState, UserState>((state) => state.user);

  const onCloseNewMatchPopup = () => {
    store.dispatch(UIAction.onCloseNewMatchPopup());
  };
  const onCloseNotification = () => {
    store.dispatch(UIAction.onCloseNotification());
  };

  return (
    <>
      <div className="flex flex-col w-screen h-screen text-4xl lg:flex-row">
        {userState.isLogin && <SideBar />}
        <div className="justify-center flex-auto w-full lg:h-screen bg-gray-50 align-center">
          <Suspense fallback={<LoadingAnimation isLoading={true} />}>
            <Routes>{renderHelper(contentRoutes, true)}</Routes>
          </Suspense>
        </div>
      </div>
      <Notification
        status={UIState.notification.status}
        isOpenning={UIState.notification.isOpenning}
        title={UIState.notification.title}
        message={UIState.notification.message}
        onCloseNotification={onCloseNotification}
      />
      <NewMatchModel
        isOpenning={UIState.newMatchModel.isOpenning}
        target={UIState.newMatchModel.target}
        onCloseNewMatchPopup={onCloseNewMatchPopup}
      />
      <CropperBox />
      <LoadingAnimation isLoading={UIState.isLoading} />
    </>
  );
}

export default App;
