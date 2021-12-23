import { ShowOptions } from "../../common/interface/entity/showOptions";
import { matchData } from "../../container/match";
import EducationIcon from "../icon/education";

interface CardProps {
  data: matchData;
  options: ShowOptions;
}

const Card: React.FunctionComponent<CardProps> = ({ data, options }) => {
  return (
    <div className="flex flex-col w-full h-full bg-black shadow-lg card">
      <div
        className="flex flex-col justify-end w-96 h-140"
        style={{
          backgroundImage: `url("${process.env.REACT_APP_SERVER_URL}/${data.avatar}") `,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-start justify-end w-full px-5 py-5 customShadow h-1/4">
          <div className="text-3xl font-medium text-white">
            {data.name} {options.showAge && data.age}
          </div>
          {options.showStudyAt && (
            <div className="flex items-center justify-start my-2 text-base font-medium text-gray-200">
              <div className="text-white">
                <EducationIcon />
              </div>
              <span className="ml-3">{data.studyAt}</span>
            </div>
          )}
          {options.showBio && (
            <div className="text-base font-medium text-left text-gray-200">
              {data.bio}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center flex-1 bg-black justify-evenly "></div>
    </div>
  );
};

export default Card;
