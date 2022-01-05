import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CHAT_JOIN } from "../../constants/event";

interface MessageSectionProps {
  isOpenning: boolean;
}
interface matched {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
}
const matchList: matched[] = [
  {
    id: "1",
    name: "duc dauu",
    lastMessage: "ehhe",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
];
const MessageSection: React.FunctionComponent<MessageSectionProps> = ({
  isOpenning,
}) => {
  useEffect(() => {
    return () => {};
  }, []);
  if (isOpenning)
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        {matchList.map((match) => {
          return (
            <NavLink
              to={`/messages/${match.id}`}
              key={match.id}
              className={({ isActive }) =>
                isActive
                  ? "flex px-5 py-4 cursor-pointer bg-gray-200 intro-y"
                  : "flex px-5 py-4 cursor-pointer hover:bg-gray-200 intro-y"
              }
            >
              <img
                src={match.avatar}
                alt={match.id}
                className="rounded-full w-14 h-14"
              />
              <div className="flex flex-col items-start ml-4">
                <div className="text-lg font-bold tracking-wider ">
                  {match.name}
                </div>
                <div className="text-base text-gray-500">
                  {match.lastMessage}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    );

  return <></>;
};

export default MessageSection;
