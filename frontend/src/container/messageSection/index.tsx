import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AvatarCircle from "../../component/avatarCircle";
import { getChatList } from "./action";
import { ChatBox } from "./interface";

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
  const [messageList, setMessageList] = useState<ChatBox[]>([]);

  const callApiAndGetMessageList = async (): Promise<ChatBox[]> => {
    return await (
      await getChatList()
    ).data.data;
  };
  useEffect(() => {
    callApiAndGetMessageList().then((data) => {
      setMessageList([...data]);
    });
    return () => {};
  }, []);
  if (isOpenning)
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        {messageList.map((messageBox) => {
          return (
            <NavLink
              to={`/messages/${messageBox.id}`}
              key={messageBox.id}
              className={({ isActive }) =>
                isActive
                  ? "flex px-5 py-4 cursor-pointer bg-gray-200 intro-y"
                  : "flex px-5 py-4 cursor-pointer hover:bg-gray-200 intro-y"
              }
            >
              {/* <img
                src={`${process.env.REACT_APP_SERVER_URL}/${messageBox.sender.avatar}`}
                alt={messageBox.id}
                className="rounded-full w-14 h-14"
              /> */}
              <AvatarCircle
                to={`/messages/${messageBox.partner.id}`}
                url={`${process.env.REACT_APP_SERVER_URL}/${messageBox.partner.avatar}`}
                className="w-14 h-14"
              />
              <div className="flex flex-col items-start ml-4">
                <div className="text-lg font-bold tracking-wider ">
                  {messageBox.partner.name}
                </div>
                <div className="text-base text-gray-500">
                  {messageBox.content}
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
