import MatchAndChatNav from "../matchAndChatNav";

interface MatchAndChatProps {}

const MatchAndChatMobile: React.FunctionComponent<MatchAndChatProps> = () => {
  return (
    <div className="w-full h-contentHeight z-30">
      <MatchAndChatNav />
    </div>
  );
};

export default MatchAndChatMobile;
