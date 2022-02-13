import MatchAndChatNav from "../matchAndChatNav";

interface MatchAndChatProps {}

const MatchAndChatMobile: React.FunctionComponent<MatchAndChatProps> = () => {
  return (
    <div className="z-30 w-full h-contentHeight mobile">
      <MatchAndChatNav />
    </div>
  );
};

export default MatchAndChatMobile;
