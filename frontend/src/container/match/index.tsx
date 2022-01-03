import React, { useEffect, useState } from "react";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";
import { showOptionsDefault } from "../../store/defaultData/user";
import {
  dislikeCard,
  getMatchList,
  likeCard,
  resetDislikeList,
} from "./action";
import { MatchCard } from "../../component/card/interface.dto";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import { timeDelay } from "../../constants/loading";
import { DirectionString } from "./interface";
import { openWarningNotification } from "../../utils/notificationHelper";
import useInterval from "../../common/hook/useInterval";
interface MatchPageProps {}

const MatchPage: React.FunctionComponent<MatchPageProps> = () => {
  const [data, setData] = useState<MatchCard[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(data.length - 1);
  const numberOfCardOnceCall = 6;
  //call api and get unmatch list
  const callApiAndGetMatchList = async (limit: number, loading?: boolean) => {
    if (loading) store.dispatch(UIAction.setIsLoading(true));
    const res = await getMatchList(limit);

    const newData = res.data.data;
    setData(newData);
    setCurrentIndex(newData.length - 1);
    if (loading)
      setTimeout(() => {
        store.dispatch(UIAction.setIsLoading(false));
      }, timeDelay);
  };

  //view again card that user have skipped
  const onViewAgain = async () => {
    store.dispatch(UIAction.setIsLoading(true));
    const responseOfReset = await resetDislikeList();
    if (responseOfReset.status === 200) {
      const responseOfNewData = await getMatchList(numberOfCardOnceCall);
      const newData = responseOfNewData.data.data;
      //check that have new data or not, if not send notification to user
      if (newData.length > 0) {
        setData(newData);
        setCurrentIndex(newData.length - 1);
      } else {
        openWarningNotification(
          "Opps, look like that there noone here that you can view again :( "
        );
      }
    }

    setTimeout(() => {
      store.dispatch(UIAction.setIsLoading(false));
    }, timeDelay);
  };
  //get match card for the first render
  useEffect(() => {
    callApiAndGetMatchList(numberOfCardOnceCall, true);
    return () => {};
  }, []);

  //custom hook for use interval for calling api after each 3 seconds for finding new user
  useInterval(() => {
    if (data.length === 0 || currentIndex === -1) {
      callApiAndGetMatchList(numberOfCardOnceCall);
    }
  }, 3000);

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
  const swipeApiAction = async (
    dir: DirectionString,
    id: string,
    index: number
  ) => {
    if (dir === "left") {
      dislikeCard(id);
    } else if (dir === "right") {
      likeCard(id);
    }
    if (currentIndex - 1 === 4) {
      console.log("calling and get new data....");
      const res = await getMatchList(numberOfCardOnceCall);
      if (res.status === 200 && res.data.data.length > 0) {
        setData([...res.data.data, ...data]);
        updateCurrentIndex(index + res.data.data.length - 1);
      }
    }
  };

  // set last direction and decrease current index
  const swiped = (direction: DirectionString, id: string, index: number) => {
    swipeApiAction(direction, id, index);
    updateCurrentIndex(index - 1);
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
              className="absolute inset-0 bg-black swipe"
              key={data.id}
              onSwipe={(dir) => swiped(dir, data.id, index)}
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
        <div className="flex flex-col justify-center w-full h-full px-8 bg-white">
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
              <span className="px-2 text-sm text-gray-500 bg-white">Or</span>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              type="button"
              className="block items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onViewAgain}
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
