import { PaperAirplaneIcon } from "@heroicons/react/solid";
import AvatarCircle from "../../component/avatarCircle";

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
  return (
    <div className="flex-1 h-screen flex flex-col overflow-hidden  ">
      <div className="px-4 flex justify-between items-center bg-white py-2 h-16 sm:px-6">
        <div className="flex flex-row items-center">
          <AvatarCircle
            alt="avatar"
            url="https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/132442993_2798827007004557_137046347792697494_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YFghZRynzXcAX-B4gS1&_nc_ht=scontent.fdad1-3.fna&oh=00_AT-a3jChm1QKjSoLGWlWor6Duej5o1aJoeCciPmr4woOSg&oe=61DE9FAA"
          />
          <div className="ml-3 text-lg font-bold text-black cursor-pointer">
            Hoang Loc
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full ml-3"></div>
        </div>
      </div>
      <div className="bg-gray-100 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {chatData.map((chat, index) => {
            if (chat.isYourSelf) {
              return (
                <div className="mt-5 text-xl font-normal self-end bg-blue-500 rounded-xl px-5 py-3 mr-3 text-white">
                  {chat.message}
                </div>
              );
            } else {
              return (
                <div className="mt-5 text-xl font-normal self-start bg-gray-300 rounded-xl px-5 py-3 ml-3 text-black">
                  {chat.message}
                </div>
              );
            }
          })}
        </div>
        <div className="w-full flex px-5 py-2">
          <input
            type="text"
            placeholder="Type a message"
            className="outline-none rounded-lg bg-gray-200 w-5/6 flex-1"
          />
          <button
            type="button"
            className="inline-flex ml-4 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
            <PaperAirplaneIcon
              className="ml-2 -mr-1 h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
