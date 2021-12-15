import { Suspense } from "react";
import { Route, Routes } from "react-router";
import LoadingAnimation from "../../component/loading";
import { routes } from "../../constants/route";
import SideBar from "../sidebar";

function App() {
  const renderContent = () => {
    return routes.map((route) => {
      const { component: MyComponent } = route;
      return (
        <Route key={route.link} path={route.link} element={<MyComponent />} />
      );
    });
  };

  return (
    <div className="text-4xl flex ">
      <SideBar />
      <div className="bg-gray-50 flex-1 w-full h-screen align-center justify-center">
        <Suspense fallback={<LoadingAnimation />}>
          <Routes>{renderContent()}</Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
