import { Link } from "react-router-dom";

interface AvatarCircleProps {
  url: string;
  to: string;
  onClick?: () => any;
  className?: string;
}

const AvatarCircle: React.FunctionComponent<AvatarCircleProps> = ({
  url,
  to,
  onClick,
  className,
}) => {
  return (
    <Link to={to} onClick={onClick}>
      <div
        className={`h-10 w-10 rounded-full cursor-pointer hover:outline outline-3 outline-white ${
          className || ""
        }`}
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
