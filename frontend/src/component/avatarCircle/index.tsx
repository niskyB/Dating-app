interface AvatarCircleProps {
  url: string;
  alt: string;
}

const AvatarCircle: React.FunctionComponent<AvatarCircleProps> = ({
  url,
  alt,
}) => {
  return (
    <img
      className="inline-block h-10 w-10 rounded-full cursor-pointer hover:outline outline-3 outline-white"
      src={url}
      alt={alt}
    />
  );
};

export default AvatarCircle;
