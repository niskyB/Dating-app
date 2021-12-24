interface LoadingProps {
  isLoading: boolean;
}

const LoadingAnimation: React.FunctionComponent<LoadingProps> = ({
  isLoading,
}) => {
  if (isLoading)
    return (
      <div className="fixed inset-0 w-screen h-screen bg-black/50  z-50 flex justify-center items-center">
        <div className=" flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
          <div className="w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </div>
    );
  return <></>;
};

export default LoadingAnimation;
