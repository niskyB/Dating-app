interface MatchWrapperProps {}

const MatchWrapper: React.FunctionComponent<MatchWrapperProps> = ({
  children,
}) => {
  return (
    <div className="relative flex  items-center justify-center w-full h-screen text-center overflow-scroll">
      <div className="relative flex flex-col bg-black w-96 h-168 shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default MatchWrapper;
