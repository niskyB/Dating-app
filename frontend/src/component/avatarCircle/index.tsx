import { Link } from "react-router-dom";

interface AvatarCircleProps {
  url: string;
  alt: string;
  to: string;
}

const AvatarCircle: React.FunctionComponent<AvatarCircleProps> = ({
  url,
  alt,
  to,
}) => {
  return (
    <Link to={to}>
      <img
        className="inline-block h-10 w-10 rounded-full cursor-pointer hover:outline outline-3 outline-white"
        src={url}
        alt={alt}
      />
    </Link>
  );
};

export default AvatarCircle;
