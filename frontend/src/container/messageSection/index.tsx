interface MessageSectionProps {}
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
  {
    id: "2",
    name: "duc dauu",
    lastMessage: "hoho",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
  {
    id: "3",
    name: "duc dauu",
    lastMessage: "hihi",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
  {
    id: "4",
    name: "duc dauu",
    lastMessage: "oke :v",
    avatar:
      "https://scontent.fdad2-1.fna.fbcdn.net/v/t1.6435-9/205956104_2751433955079159_2840020984542922686_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=8K0GTpEtUJ8AX-nChVX&_nc_ht=scontent.fdad2-1.fna&oh=00_AT_11vE4g5rFVtXfQRhoSU2nxOzwZCSMrwieTnFjLQ_1mA&oe=61E101E8",
  },
];
const MessageSection: React.FunctionComponent<MessageSectionProps> = () => {
  return (
    <div className="flex-col flex-1 w-full intro-y">
      {matchList.map((match) => {
        return (
          <div
            key={match.id}
            className="flex px-5 py-4 cursor-pointer hover:bg-gray-200"
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
              <div className="text-base text-gray-500">{match.lastMessage}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSection;
