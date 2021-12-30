import React, { useEffect, useState } from "react";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
import GoBackIcon from "../../component/icon/goBack";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";
import { showOptionsDefault } from "../../store/defaultData/user";
import { dislikeCard, getMatchList, likeCard } from "./action";
import { MatchCard } from "../../component/card/interface.dto";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { timeDelay } from "../../constants/loading";
import { DirectionString } from "./interface";
import { dir } from "console";
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

  const canGoBack = currentIndex < data.length - 1;

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

  const outOfFrame = (name: string, idx: number) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: string) => {
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };
  return (
    <MatchWrapper>
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
          className="flex items-center justify-center w-20 h-20 rounded-full text-sun-500 border-sun-500 solid border-1"
          onClick={() => goBack()}
        >
          <GoBackIcon />
        </div>
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
    </MatchWrapper>
  );
};

export default MatchPage;
