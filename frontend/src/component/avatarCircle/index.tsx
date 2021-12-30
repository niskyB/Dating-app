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
      <div
        className="h-10 w-10 rounded-full cursor-pointer hover:outline outline-3 outline-white"
        style={{
          backgroundImage: `url("${url}") `,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </Link>
  );
};

export default AvatarCircle;
