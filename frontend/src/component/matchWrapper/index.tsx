interface MatchWrapperProps {}

const MatchWrapper: React.FunctionComponent<MatchWrapperProps> = ({
  children,
}) => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen text-center ">
      <div className="relative bg-black w-96 h-168">{children}</div>
    </div>
  );
};

export default MatchWrapper;
