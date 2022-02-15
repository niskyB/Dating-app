import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { chatIo } from "../../common/HOC/socketConnectWrapper";
import useInterval from "../../common/hook/useInterval";
import useMediaQuery from "../../common/hook/useMediaQuery";
import { UserState } from "../../common/interface/redux/user";
import AvatarCircle from "../../component/avatarCircle";
import GoBackIcon from "../../component/icon/goBack";
import {
  CHAT_GET,
  CHAT_GET_INIT_MESSAGE,
  CHAT_JOIN,
  CHAT_LEAVE,
  CHAT_RECEIVE,
  CHAT_SEEN_MESSAGE,
  CHAT_SEND,
} from "../../constants/event";
import { RootState } from "../../store";
import { getRoomId } from "../../utils/socketHelper";
import { getChatUserInfo } from "./action";
import { Message } from "./interface";
import { ChatUserDTO } from "./interface.dto";

interface ChatBoxProps {}
let maxLength = 0;

const ChatBox: React.FunctionComponent<ChatBoxProps> = () => {
  //state
  const [chatUserInfo, setChatUserInfo] = useState<ChatUserDTO>();
  const [room, setRoom] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPage, setChatPage] = useState<number>(0);
  const [isHaveMoreMessage, setisHaveMoreMessage] = useState<boolean>(true);

  //ref
  const messageBox = useRef<HTMLInputElement>(null);
  const chatBox = useRef<HTMLDivElement>(null);

  //state from redux
  const userState = useSelector<RootState, UserState>((state) => state.user);

  //orther
  const { id: partnerId } = useParams<{ id: string }>();
  const isMobile = useMediaQuery("(max-width: 640px)");
  //send chat on enter
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      onSendMessage();
    }
  };
  const getChatUserData = async () => {
    if (partnerId) {
      const res = await getChatUserInfo(partnerId);
      setChatUserInfo(res.data.data);
    }
  };

  useInterval(() => {
    console.log("set seen message...");
    chatIo.emit(CHAT_SEEN_MESSAGE, room);
  }, 1000);

  //get chat user and set seen message
  useEffect(() => {
    if (partnerId) setRoom(getRoomId(userState.data.id, partnerId));
    getChatUserData();
    return () => {};
  }, [partnerId, userState.data.id]);

  useEffect(() => {
    //reset chat option
    setChatPage(0);
    setMessages([]);
    setisHaveMoreMessage(true);
    //join room
    chatIo.emit(CHAT_JOIN, partnerId);
    //check that seen message when component is render
    console.log("set seen message");
    chatIo.emit(CHAT_SEEN_MESSAGE, room);
    //get the first page
    chatIo.emit(CHAT_GET, {
      room,
      page: 0,
    });
    //listen to get message
    chatIo.on(CHAT_GET, (data: Message[]) => {
      if (data.length === maxLength) {
        return;
      }
      if (data.length > maxLength) {
        maxLength = data.length;
      }

      setMessages(data.reverse());
      if (chatBox.current) {
        chatBox.current.scrollTop = 700;
      }
    });
    chatIo.on(CHAT_GET_INIT_MESSAGE, (data: Message[]) => {
      if (data.length > maxLength) {
        maxLength = data.length;
      }
      setMessages(data.reverse());
      scrollToBottom();
    });
    //listen to get new message
    chatIo.on(CHAT_RECEIVE, (data: Message) => {
      if (data.room === room) {
        setMessages((prev) => [...prev, data]);
        scrollToBottom();
      }
    });
    //unscribe
    return () => {
      chatIo.off(CHAT_GET);
      chatIo.off(CHAT_RECEIVE);
      chatIo.emit(CHAT_LEAVE, room);
      chatIo.off(CHAT_GET_INIT_MESSAGE);
    };
  }, [userState.data.id, partnerId, room]);

  const onSendMessage = () => {
    if (messageBox.current) {
      //send message
      chatIo.emit(CHAT_SEND, {
        content: messageBox.current.value,
        room,
      });

      ///reset message value
      messageBox.current.value = "";
    }
  };

  const scrollToBottom = () => {
    if (chatBox.current) {
      const scrollHeight = chatBox.current.scrollHeight;
      const height = chatBox.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatBox.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };
  return (
    <div className="fixed inset-0 flex flex-col h-full overflow-hidden lg:w-contentWidth lg:static ">
      <div className="flex items-center justify-between h-16 px-4 py-2 bg-white sm:px-6">
        <div className="flex flex-row items-center">
          {isMobile && (
            <Link to="/matchandchat">
              <GoBackIcon className="w-8 h-8 mr-3 text-blue-500" />
            </Link>
          )}

          <AvatarCircle
            to="/"
            url={`${process.env.REACT_APP_SERVER_URL}/${chatUserInfo?.avatar}`}
          />
          <div className="ml-3 text-lg font-bold text-black cursor-pointer">
            {chatUserInfo?.name}
          </div>
          <div className="w-2 h-2 ml-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col flex-1 overflow-hidden bg-gray-100">
        <div
          ref={chatBox}
          onScroll={(e: any) => {
            if (isHaveMoreMessage && e.target.scrollTop === 0) {
              chatIo.emit(CHAT_GET, {
                room,
                page: chatPage + 1,
              });
              setChatPage(chatPage + 1);
            }
          }}
          className="flex flex-col justify-start flex-auto overflow-x-hidden overflow-y-auto"
        >
          {messages.map((chat, index) => {
            if (chat.sender.id === userState.data.id) {
              return (
                <div
                  key={chat.id}
                  className="self-end max-w-[70%] px-5 py-3 mt-5 mr-3 text-xl font-normal text-white bg-blue-500 rounded-3xl break-all"
                >
                  {chat.content}
                </div>
              );
            } else {
              return (
                <div
                  key={chat.id}
                  className="self-start max-w-[70%] px-5 py-3 mt-5 ml-3 text-xl font-normal text-black bg-gray-300 rounded-3xl break-all"
                >
                  {chat.content}
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
            onKeyDown={handleKeyDown}
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
