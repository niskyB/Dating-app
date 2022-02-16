import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { chatIo, notificationIo } from "../../common/HOC/socketConnectWrapper";
import { UserState } from "../../common/interface/redux/user";
import AvatarCircle from "../../component/avatarCircle";
import {
  CHAT_SEEN_MESSAGE,
  CHAT_UPDATE_CHAT_LIST,
} from "../../constants/event";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { getChatList } from "./action";
import { ChatBox } from "./interface";

interface MessageSectionProps {
  isOpenning: boolean;
}

const MessageSection: React.FunctionComponent<MessageSectionProps> = ({
  isOpenning,
}) => {
  const [messageList, setMessageList] = useState<ChatBox[]>([]);
  const userState = useSelector<RootState, UserState>((state) => state.user);
  const callApiAndGetMessageList = async () => {
    const result = await (await getChatList()).data.data;
    let newMessage = 0;
    result.forEach((item) => {
      if (item.sender.id !== userState.data.id && item.seen === false)
        newMessage += 1;
    });
    store.dispatch(UIAction.setNewMessageNoti(newMessage));
    setMessageList(
      [...result].sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      )
    );
  };
  useEffect(() => {
    callApiAndGetMessageList();
    console.log("listening on chat seen message...");
    chatIo.on(CHAT_SEEN_MESSAGE, () => {
      callApiAndGetMessageList();
    });
    console.log("listening on chat update message...");
    chatIo.on(CHAT_UPDATE_CHAT_LIST, () => {
      callApiAndGetMessageList();
    });
    return () => {
      // console.log("unsubcribe...");
      // chatIo.off(CHAT_SEEN_MESSAGE);
      // notificationIo.off(CHAT_UPDATE_CHAT_LIST);
    };
  }, []);

  if (isOpenning)
    return (
      <div className="flex flex-col mt-8 overflow-auto h-matchAndChatHeight">
        {messageList.length > 0 &&
          messageList.map((messageBox) => {
            return (
              <NavLink
                to={`/messages/${messageBox.partner.id}`}
                key={messageBox.id}
                className={({ isActive }) =>
                  isActive
                    ? "flex px-5 py-4 cursor-pointer bg-gray-200 intro-y"
                    : "flex px-5 py-4 cursor-pointer hover:bg-gray-200 intro-y"
                }
              >
                <AvatarCircle
                  to={`/messages/${messageBox.partner.id}`}
                  url={`${process.env.REACT_APP_SERVER_URL}/${messageBox.partner.avatar}`}
                  className="w-14 h-14"
                />
                <div className="flex flex-col items-start ml-4">
                  <div className="text-lg font-bold tracking-wider ">
                    {messageBox.partner.name}
                  </div>
                  <div
                    className={`text-base text-gray-500  ${
                      messageBox.sender.id !== userState.data.id &&
                      messageBox.seen === false
                        ? "font-extrabold text-black"
                        : " "
                    }`}
                  >
                    {messageBox.sender.id === userState.data.id
                      ? ("you: " + messageBox.content).length < 25
                        ? "you: " + messageBox.content
                        : ("you: " + messageBox.content).substring(0, 25) +
                          "..."
                      : messageBox.content.length < 25
                      ? messageBox.content
                      : messageBox.content.substring(0, 25) + "..."}
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
