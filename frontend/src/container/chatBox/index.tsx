import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import AvatarCircle from "../../component/avatarCircle";
import { CHAT_GET, CHAT_JOIN } from "../../constants/event";
import { chatIo } from "../app/App";

interface ChatBoxProps {}
interface chatMessage {
  message: string;
  isYourSelf: boolean;
}
const chatData: chatMessage[] = [
  { message: "hello", isYourSelf: true },
  { message: "hiiii", isYourSelf: false },
  { message: "Duc dep trai phai khong", isYourSelf: true },
  { message: "dung roi", isYourSelf: false },
  { message: "game la de", isYourSelf: true },
  { message: "ezzz", isYourSelf: false },
];
const ChatBox: React.FunctionComponent<ChatBoxProps> = () => {
  useEffect(() => {
    const url = window.location.href;
    const chatTargetId = url.split("/messages/")[1];
    console.log(chatTargetId);
    chatIo.emit(CHAT_JOIN, chatTargetId);
    chatIo.on(CHAT_GET, (data: any) => {
      console.log(data);
    });
    return () => {};
  }, []);
  return (
    <div className="flex flex-col flex-1 h-contentHeight lg:h-screen overflow-hidden ">
      <div className="flex items-center justify-between h-16 px-4 py-2 bg-white sm:px-6">
        <div className="flex flex-row items-center">
          <AvatarCircle
            to="/"
            url="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/132442993_2798827007004557_137046347792697494_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YFghZRynzXcAX-B4gS1&_nc_ht=scontent.fdad1-3.fna&oh=00_AT-a3jChm1QKjSoLGWlWor6Duej5o1aJoeCciPmr4woOSg&oe=61DE9FAA"
          />
          <div className="ml-3 text-lg font-bold text-black cursor-pointer">
            Hoang Loc
          </div>
          <div className="w-2 h-2 ml-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col flex-1 bg-gray-100">
        <div className="flex flex-col flex-1">
          {chatData.map((chat, index) => {
            if (chat.isYourSelf) {
              return (
                <div className="self-end px-5 py-3 mt-5 mr-3 text-xl font-normal text-white bg-blue-500 rounded-full">
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div className="self-start px-5 py-3 mt-5 ml-3 text-xl font-normal text-black bg-gray-300 rounded-full">
                  {chat.message}
                </div>
              );
            }
          })}
        </div>
        <div className="flex w-full px-5 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 w-5/6 bg-gray-200 rounded-lg outline-none"
          />
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
            <PaperAirplaneIcon
              className="w-5 h-5 ml-2 -mr-1"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
