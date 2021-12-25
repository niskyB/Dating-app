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
    <div className="flex flex-col w-96 h-140  shadow-lg card relative overflow-hidden">
      <div className="">
        <div
          className="absolute inset-0 w-auto flex  flex-row  duration-200 transition-all ease-in-out "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          <div
            className="min-w-full min-h-full"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_SERVER_URL}/${data.avatar}") `,
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
      </div>
      <div className="bg-transparent w-full h-6 flex items-center absolute top-0 left-0 right-0 z-30 gap-2 px-3">
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
      <div
        className="z-30 text-white/70 hover:text-white cursor-pointer w-10 h-10 absolute top-1/2 left-2"
        onClick={onPreviosImage}
      >
        <ChevronLeftIcon />
      </div>
      <div
        className="z-30 text-white/70 hover:text-white cursor-pointer w-10 h-10 absolute top-1/2 right-2"
        onClick={onNextImage}
      >
        <ChevronRightIcon />
      </div>
      <div className="flex flex-col z-10 justify-end w-96 h-140">
        <div className="flex flex-col items-start justify-end w-full px-5 py-5 customShadow h-1/4">
          <div className="text-3xl font-medium text-white">
            {data.name}
            {options.showAge &&
              new Date().getFullYear() -
                new Date(data.dateOfBirth).getFullYear()}
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
