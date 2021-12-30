import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NOTIFICATIONS_RESET } from "../../constants/event";
import { notificationIo } from "../app/App";

interface MatchListProps {
  isOpenning: boolean;
}
interface matched {
  id: string;
  avatar: string;
  name: string;
}
const matchList: matched[] = [
  {
    id: "1",
    name: "duc dauu",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
  {
    id: "2",
    name: "duc dauu",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
  {
    id: "3",
    name: "duc dauu",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
  {
    id: "4",
    name: "duc dauu",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
];
const MatchList: React.FunctionComponent<MatchListProps> = ({ isOpenning }) => {
  useEffect(() => {
    console.log("hello");
    notificationIo.emit(NOTIFICATIONS_RESET);
    return () => {};
  }, []);
  if (isOpenning)
    return (
      <div className="flex flex-row flex-wrap justify-around w-full gap-5 px-5 mt-5 intro-y">
        {matchList.map((match) => {
          return (
            <Link
              to="#"
              key={match.id}
              className="w-5/12 h-40 duration-200 border-2 rounded-lg shadow-lg cursor-pointer hover:scale-110"
              style={{
                backgroundImage: `url("${match.avatar}") `,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
              }}
            ></Link>
          );
        })}
      </div>
    );
  return <></>;
};

export default MatchList;
