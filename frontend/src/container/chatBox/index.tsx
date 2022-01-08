import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { chatIo } from "../../common/HOC/socketConnectWrapper";
import useMediaQuery from "../../common/hook/useMediaQuery";
import { UserState } from "../../common/interface/redux/user";
import AvatarCircle from "../../component/avatarCircle";
import GoBackIcon from "../../component/icon/goBack";
import {
  CHAT_GET,
  CHAT_JOIN,
  CHAT_RECEIVE,
  CHAT_SEND,
} from "../../constants/event";
import { RootState } from "../../store";
import { getRoomId } from "../../utils/socketHelper";

interface ChatBoxProps {}
interface chatMessage {
  message: string;
  isYourSelf: boolean;
}
const chatData: chatMessage[] = [
  { message: "hello", isYourSelf: true },
  { message: "hiiii", isYourSelf: false },
  {
    message: "Duc dep trai phai khongggg",
    isYourSelf: true,
  },
  { message: "dung roi", isYourSelf: false },
  { message: "game la de", isYourSelf: true },
  { message: "ezzz", isYourSelf: false },
];
const ChatBox: React.FunctionComponent<ChatBoxProps> = () => {
  const messageBox = useRef<HTMLInputElement>(null);

  const userState = useSelector<RootState, UserState>((state) => state.user);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const url = window.location.href;
  const chatTargetId = url.split("/messages/")[1];
  const roomId = getRoomId(userState.data.id, chatTargetId);
  useEffect(() => {
    chatIo.emit(CHAT_JOIN, chatTargetId);
    chatIo.emit(CHAT_GET, {
      room: roomId,
      page: 0,
    });
    chatIo.on(CHAT_GET, (data: any) => {
      console.log(data);
    });
    chatIo.on(CHAT_RECEIVE, (data: any) => {
      console.log(data);
    });
    return () => {};
  }, [userState.data.id]);
  const onSendMessage = () => {
    if (messageBox.current) {
      //send message
      chatIo.emit(CHAT_SEND, {
        content: messageBox.current.value,
        roomId,
      });

      ///reset message value
      messageBox.current.value = "";
    }
  };
  return (
    <div className="flex flex-col flex-1 fixed inset-0 lg:static h-screen overflow-hidden ">
      <div className="flex items-center justify-between h-16 px-4 py-2 bg-white sm:px-6">
        <div className="flex flex-row items-center">
          {isMobile && (
            <Link to="/matchandchat">
              <GoBackIcon className="w-8 h-8 text-blue-500 mr-3" />
            </Link>
          )}
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
                <div className="self-end max-w-[70%] px-5 py-3 mt-5 mr-3 text-xl font-normal text-white bg-blue-500 rounded-3xl">
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div className="self-start max-w-[70%] px-5 py-3 mt-5 ml-3 text-xl font-normal text-black bg-gray-300 rounded-3xl">
                  {chat.message}
                </div>
              );
            }
          })}
        </div>
        <div className="flex w-full px-5 py-2">
          <input
            ref={messageBox}
            type="text"
            placeholder="Type a message"
            className="flex-1 w-5/6 bg-gray-200 rounded-lg outline-none"
          />
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 ml-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={onSendMessage}
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
