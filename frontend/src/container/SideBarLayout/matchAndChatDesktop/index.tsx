import MatchAndChatNav from "../matchAndChatNav";

interface MatchAndChatDesktopProps {}

const MatchAndChatDesktop: React.FunctionComponent<
  MatchAndChatDesktopProps
> = () => {
  return (
    <>
      <div className="hidden lg:block desktop">
        <MatchAndChatNav />
      </div>
    </>
  );
};

export default MatchAndChatDesktop;
