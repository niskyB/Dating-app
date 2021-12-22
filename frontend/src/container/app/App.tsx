import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes } from "react-router";
import { UIState } from "../../common/interface/redux/ui";
import { UserState } from "../../common/interface/redux/user";
import CropperBox from "../cropper";
import LoadingAnimation from "../../component/loading";
import Notification from "../../component/notification";
import SuccessModel from "../../component/successModel";
import { contentRoutes } from "../../constants/route";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { renderHelper } from "../../utils/renderHelper";
import SideBar from "../sidebar";

function App() {
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const userState = useSelector<RootState, UserState>((state) => state.user);

  const onCloseSuccessModel = () => {
    store.dispatch(UIAction.onCloseSuccessModel());
  };
  const onCloseNotification = () => {
    store.dispatch(UIAction.onCloseNotification());
  };

  return (
    <>
      <div className="flex text-4xl ">
        {userState.isLogin && <SideBar />}
        <div className="justify-center flex-1 w-full h-screen bg-gray-50 align-center">
          <Suspense fallback={<LoadingAnimation />}>
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
      <SuccessModel
        isOpenning={UIState.successModel.isOpenning}
        message={UIState.successModel.message}
        title={UIState.successModel.title}
        onCloseSuccessModel={onCloseSuccessModel}
      />
      <CropperBox />
    </>
  );
}

export default App;
