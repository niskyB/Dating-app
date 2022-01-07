import MatchAndChatNav from "../matchAndChatNav";

interface MatchAndChatDesktopProps {}

const MatchAndChatDesktop: React.FunctionComponent<
  MatchAndChatDesktopProps
> = () => {
  return (
    <>
      <div className="hidden lg:block">
        <MatchAndChatNav />
      </div>
    </>
  );
};

export default MatchAndChatDesktop;
