import { Link } from "react-router-dom";
import AvatarCircle from "../../component/avatarCircle";

interface SideBarProps {}

const SideBar: React.FunctionComponent<SideBarProps> = () => {
  return (
    <div className="flex bg-white w-full flex-col h-screen  max-w-xs ">
      <div className="h-16 px-5 py-3 bg-gradient-to-r flex items-center from-blue-500 via-purple-500 to-red-500">
        <AvatarCircle
          alt="avatar"
          url="https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX9w6MTt&_nc_ht=scontent.fdad2-1.fna&oh=00_AT-OsvKv-F-Et6wNSJ-xx8ezVfmQHmapFEHRJDc_XpgMUA&oe=61DD0D68"
        />
        <div className="text-lg font-bold text-white ml-3 cursor-pointer">
          Duc Dauu
        </div>
      </div>
      <div className="px-5 py-3 flex flex-col flex-auto text-center justify-center">
        <div className="text-base mx-auto font-semibold mb-5">
          You are not login yet, login now
        </div>
        <Link
          to="/login"
          type="button"
          className="inline-flex max-w-max mx-auto items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
