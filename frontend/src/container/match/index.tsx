import React, { useEffect, useState } from "react";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";
import { showOptionsDefault } from "../../store/defaultData/user";
import { dislikeCard, getMatchList, likeCard } from "./action";
import { MatchCard } from "../../component/card/interface.dto";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { timeDelay } from "../../constants/loading";
import { DirectionString } from "./interface";
interface MatchPageProps {}

const MatchPage: React.FunctionComponent<MatchPageProps> = () => {
  const [data, setData] = useState<MatchCard[]>([]);

  useEffect(() => {
    store.dispatch(UIAction.setIsLoading(true));
    async function getData() {
      return await (
        await getMatchList()
      ).data.data;
    }
    getData().then((data) => {
      setData(data);
      setCurrentIndex(data.length - 1);
      setTimeout(() => {
        store.dispatch(UIAction.setIsLoading(false));
      }, timeDelay);
    });
    return () => {};
  }, []);
  const [currentIndex, setCurrentIndex] = React.useState(data.length - 1);

  // used for outOfFrame closure
  const currentIndexRef = React.useRef(currentIndex);

  const childRefs = React.useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => React.createRef()),
    [data.length]
  ) as any;

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  const swipeApiAction = (dir: DirectionString, id: string) => {
    if (dir === "left") {
      dislikeCard(id);
    } else if (dir === "right") {
      likeCard(id);
    }
  };
  // set last direction and decrease current index
  const swiped = (direction: DirectionString, id: string, index: number) => {
    swipeApiAction(direction, id);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (id: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <MatchWrapper>
      {data.length > 0 && currentIndex !== -1 ? (
        <>
          {data.map((data, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="absolute inset-0 swipe"
              key={data.id}
              onSwipe={(dir) => swiped(dir, data.id, index)}
              onCardLeftScreen={() => outOfFrame(data.id, index)}
              preventSwipe={["up", "down"]}
            >
              <Card data={data} options={showOptionsDefault} />
            </TinderCard>
          ))}

          <div className="absolute bottom-0 left-0 right-0 flex flex-row items-center flex-1 pb-4 justify-evenly">
            <div
              className="flex items-center justify-center w-20 h-20 p-3 rounded-full text-radical-red-500 border-radical-red-500 solid border-1"
              onClick={() => swipe("left")}
            >
              <XIcon />
            </div>
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full text-mountain-meadow-500 border-mountain-meadow-500 solid border-1"
              onClick={() => swipe("right")}
            >
              <HeartIcon />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center bg-white px-8">
          <img src="./images/corgi.gif" alt="corgi loading gif" />
          <div className="text-base font-semibold">
            We are looking for new people, please wait for a moment...
          </div>
          <div className="relative my-4">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-gray-500">Or</span>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="block items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              See again all people that you've skipped
            </button>
          </div>
        </div>
      )}
    </MatchWrapper>
  );
};

export default MatchPage;
