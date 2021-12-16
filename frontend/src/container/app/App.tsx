import { Suspense } from "react";
import { Route, Routes } from "react-router";
import LoadingAnimation from "../../component/loading";
import { routes } from "../../constants/route";
import SideBar from "../sidebar";

function App() {
  return (
    <div className="flex text-4xl ">
      <SideBar />
      <div className="justify-center flex-1 w-full h-screen bg-gray-50 align-center">
        <Suspense fallback={<LoadingAnimation />}>
          <Routes>
            {routes.map((route) => {
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
        </Suspense>
      </div>
    </div>
  );
}

export default App;
