import { HomeIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { UserState } from "../../common/interface/redux/user";
import { RootState } from "../../store";
import AvatarCircle from "../../component/avatarCircle";
import SettingIcon from "../../component/icon/setting";

interface TopSideBarProps {
  isLogin: boolean;
}

const TopSideBar: React.FunctionComponent<TopSideBarProps> = ({ isLogin }) => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  return (
    <div className="flex items-center justify-between h-16 px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
      {isLogin && (
        <>
          <div className="flex items-center">
            <AvatarCircle
              to={"/me"}
              alt="avatar"
              url={userState && "./images/defaultAvatar.png"}
            />
            <div className="ml-3 text-lg font-bold text-white cursor-pointer">
              {userState.data.name}
            </div>
          </div>
          <div className="flex">
            <Routes>
              {["/me", "setting"].map((link) => (
                <Route
                  key={link}
                  path={link}
                  element={
                    <Link to="/">
                      <HomeIcon className="w-8 h-8 text-white duration-200 cursor-pointer hover:scale-125" />
                    </Link>
                  }
                />
              ))}
            </Routes>
            <Link to={"/setting"} className="ml-2 text-white">
              <SettingIcon />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default TopSideBar;
