import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { ShowOptions } from "../../common/interface/entity/showOptions";
import EducationIcon from "../icon/education";
import { MatchCard } from "./interface.dto";

interface CardProps {
  data: MatchCard;
  options: ShowOptions;
}

const Card: React.FunctionComponent<CardProps> = ({ data, options }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numberOfImage = data.highlightImgs.length + 1;
  const onPreviosImage = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(numberOfImage - 1);
    }
  };
  const onNextImage = () => {
    if (currentIndex + 1 > numberOfImage - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };
  return (
    <div className="relative flex flex-col overflow-hidden transition-all duration-300 ease-in-out bg-black-500 w-96 h-140 card">
      {/* avatar + image */}
      <div
        className="absolute inset-0 z-0 flex flex-row w-auto transition-all duration-200 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        <div
          className="min-w-full min-h-full"
          style={{
            backgroundImage: `url("${
              data.avatar
                ? `${process.env.REACT_APP_SERVER_URL}/${data.avatar}`
                : "/images/dog.jpg"
            }") `,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        {data.highlightImgs.map((image) => {
          return (
            <div
              className="min-w-full min-h-full "
              style={{
                backgroundImage: `url("${process.env.REACT_APP_SERVER_URL}/${image.image}") `,
                backgroundSize: "cover",
                backgroundPosition: "50% 50%",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          );
        })}
      </div>
      {/* top bar image */}
      {numberOfImage > 1 && (
        <div className="absolute top-0 left-0 right-0 flex items-center w-full h-6 gap-2 px-3 bg-transparent">
          {[...Array(numberOfImage)].map((value, index) => {
            return (
              <div
                style={{ width: `calc(100%/ ${numberOfImage})` }}
                className={`h-1 ${
                  index === currentIndex ? "bg-white/90" : "bg-black/10"
                } rounded-md`}
              ></div>
            );
          })}
        </div>
      )}
      {/* privious icon */}
      {numberOfImage > 1 && (
        <>
          <div
            className="absolute z-30 invisible hidden w-10 h-10 cursor-pointer controlIcon top-1/2 left-2"
            onClick={onPreviosImage}
          >
            <ChevronLeftIcon />
          </div>
          {/* next icon */}
          <div
            className="absolute z-30 invisible hidden w-10 h-10 cursor-pointer controlIcon top-1/2 right-2"
            onClick={onNextImage}
          >
            <ChevronRightIcon />
          </div>
        </>
      )}
      {/* profile */}
      <div className="absolute bottom-0 flex flex-col items-start justify-end w-full px-5 py-5 customShadow h-1/4 pb-7">
        <div className="text-3xl font-medium text-white">
          {data.name}{" "}
          {options.showAge &&
            new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()}
        </div>

        {options.showStudyAt && data.studyAt && (
          <div className="flex items-center justify-start my-2 text-base font-medium text-gray-200">
            <div className="text-white">
              <EducationIcon />
            </div>
            <span className="ml-3">{data.studyAt}</span>
          </div>
        )}

        {options.showBio && data.bio && (
          <div className="text-base font-medium text-left text-gray-200">
            {data.bio}
          </div>
        )}

        {options.showHobbies && data.hobbies.length > 0 && (
          <div className="flex flex-row max-w- flex-wrap space-x-2 max-w-[80%]">
            {data.hobbies.map((hobby) => (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-black/40 text-gray-200 capitalize mt-2">
                {hobby.hobbies}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* <div className="flex flex-row items-center flex-1 bg-black justify-evenly "></div> */}
    </div>
  );
};

export default Card;
