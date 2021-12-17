import { Suspense } from "react";
import { Routes } from "react-router";
import LoadingAnimation from "../../component/loading";
import { contentRoutes } from "../../constants/route";
import { renderHelper } from "../../utils/renderHelper";
import SideBar from "../sidebar";

function App() {
  return (
    <div className="flex text-4xl ">
      <SideBar />
      <div className="justify-center flex-1 w-full h-screen bg-gray-50 align-center">
        <Suspense fallback={<LoadingAnimation />}>
          <Routes>{renderHelper(contentRoutes, true)}</Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
