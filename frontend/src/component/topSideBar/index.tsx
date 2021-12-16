import AvatarCircle from "../avatarCircle";
import SettingIcon from "../icon/setting";

interface TopSideBarProps {
  isLogin: boolean;
}

const TopSideBar: React.FunctionComponent<TopSideBarProps> = ({ isLogin }) => {
  return (
    <div className="flex items-center justify-between h-16 px-5 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">
      {isLogin && (
        <>
          <div className="flex items-center">
            <AvatarCircle
              to={"/setting"}
              alt="avatar"
              url="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX9w6MTt&_nc_ht=scontent.fdad2-1.fna&oh=00_AT-OsvKv-F-Et6wNSJ-xx8ezVfmQHmapFEHRJDc_XpgMUA&oe=61DD0D68"
            />
            <div className="ml-3 text-lg font-bold text-white cursor-pointer">
              Duc Dauu
            </div>
          </div>
          <div className="text-white">
            <SettingIcon />
          </div>
        </>
      )}
    </div>
  );
};

export default TopSideBar;
