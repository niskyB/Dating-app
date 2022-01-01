interface MatchWrapperProps {}

const MatchWrapper: React.FunctionComponent<MatchWrapperProps> = ({
  children,
}) => {
  return (
    <div className="relative flex flex-row-reverse items-center justify-center w-full h-screen  text-center">
      <div className="relative flex flex-col bg-black shadow-2xl w-96 h-168">
        {children}
      </div>
    </div>
  );
};

export default MatchWrapper;
