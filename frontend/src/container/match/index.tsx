import React from "react";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
import GoBackIcon from "../../component/icon/goBack";
import Card from "../../component/card";
import MatchWrapper from "../../component/matchWrapper";
import { showOptionsDefault } from "../../store/defaultData/user";
interface MatchPageProps {}

export interface matchData {
  avatar: string;
  name: string;
  age: number;
  studyAt: string;
  bio: string;
}

const data: matchData[] = [
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/267039246_2866623933560160_829497954930763995_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=KeR6b9tImZIAX9D1nI1&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9ImHALF6bM53XwSCp4Ao9D-pS_j6WD1_CjrN-3d_JEuw&oe=61BDF153",
    name: "Duc Dauuu",
    age: 20,
    bio: " hihi heheh ohho haah lele haha lala h ohho haah lele haha lala",
    studyAt: "FPT University",
  },
  {
    avatar:
      "https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/132442993_2798827007004557_137046347792697494_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YFghZRynzXcAX-B4gS1&_nc_ht=scontent.fdad1-3.fna&oh=00_AT-a3jChm1QKjSoLGWlWor6Duej5o1aJoeCciPmr4woOSg&oe=61DE9FAA",
    name: "Hoang Loc",
    age: 20,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "FBT",
  },
  {
    avatar:
      "https://scontent.fdad1-1.fna.fbcdn.net/v/t1.18169-9/18519894_10155384569051108_8863789770266210474_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=qXI24DOvj7kAX-vmscU&_nc_ht=scontent.fdad1-1.fna&oh=00_AT-KBtbgQ0tV26mzzowzZsmRSddBxuEvQZIA6WWlGKzyfw&oe=61E11908",
    name: "Hoang The Nguyen",
    age: 35,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "FBT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/89509099_2392946930945950_5348971859784237056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=G2k9CRljZhEAX-vWx-r&_nc_ht=scontent.fdad1-2.fna&oh=00_AT-G2gI0ZNTNJjnI_-ZD1sjcnF3Ar36omjl1Tv68DdlbVQ&oe=61E0391D",
    name: "Quynh Nhuw",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/263488927_4023040267796341_1123261746121990824_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=1JrkpO5HNHsAX-GbPwH&_nc_ht=scontent.fdad1-2.fna&oh=00_AT8sWZGIyOp5tdTtDOyeLC3PwDiass9IagSJ8dx3x8Y73g&oe=61BFA74E",
    name: "Tuan Nguyen",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-1/p320x320/134116226_1528278150701049_7055072940211633866_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ibzwgKNMBusAX_Rv3rm&_nc_oc=AQkBoTDjsC6PM6PxryXWQijPzjgmbTCuRiE21ZWybISKEcTv2dsvXDxx-K-2YsiQfeW9xhZwbkDoSE_Sp6wekw8g&_nc_ht=scontent.fdad1-1.fna&oh=00_AT_cyMkEdl12L6FAapjYCBn4G1dolKgQZ_haFCI_SaWwOQ&oe=61DF049E",
    name: "Phuoc Thanh",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/134730612_2150353421765290_5839745717352446089_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=mdX1H50ZLtAAX95vrSH&tn=DcZMTwYmrWFGBHGB&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_z6c9al1hVJ7a68KkQWp2NTVMqrfQjOvUVWKObqPkOBQ&oe=61E13235",
    name: "Thach Chi Khang",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/49864710_2220390381561723_7665445716214415360_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=XgSFRM89LswAX_sseS4&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9GrHxP-ylLKQeRIbUvW3JujJXPNtgwZCI5QyLJhgFYmA&oe=61E1A6BD",
    name: "Pham Vinh Nhan",
    age: 32,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/89509099_2392946930945950_5348971859784237056_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=G2k9CRljZhEAX-vWx-r&_nc_ht=scontent.fdad1-2.fna&oh=00_AT-G2gI0ZNTNJjnI_-ZD1sjcnF3Ar36omjl1Tv68DdlbVQ&oe=61E0391D",
    name: "Quynh Nhuw",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/263488927_4023040267796341_1123261746121990824_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=1JrkpO5HNHsAX-GbPwH&_nc_ht=scontent.fdad1-2.fna&oh=00_AT8sWZGIyOp5tdTtDOyeLC3PwDiass9IagSJ8dx3x8Y73g&oe=61BFA74E",
    name: "Tuan Nguyen",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-1.fna.fbcdn.net/v/t1.6435-1/p320x320/134116226_1528278150701049_7055072940211633866_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ibzwgKNMBusAX_Rv3rm&_nc_oc=AQkBoTDjsC6PM6PxryXWQijPzjgmbTCuRiE21ZWybISKEcTv2dsvXDxx-K-2YsiQfeW9xhZwbkDoSE_Sp6wekw8g&_nc_ht=scontent.fdad1-1.fna&oh=00_AT_cyMkEdl12L6FAapjYCBn4G1dolKgQZ_haFCI_SaWwOQ&oe=61DF049E",
    name: "Phuoc Thanh",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/134730612_2150353421765290_5839745717352446089_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=mdX1H50ZLtAAX95vrSH&tn=DcZMTwYmrWFGBHGB&_nc_ht=scontent.fdad1-2.fna&oh=00_AT_z6c9al1hVJ7a68KkQWp2NTVMqrfQjOvUVWKObqPkOBQ&oe=61E13235",
    name: "Thach Chi Khang",
    age: 40,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/49864710_2220390381561723_7665445716214415360_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=XgSFRM89LswAX_sseS4&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9GrHxP-ylLKQeRIbUvW3JujJXPNtgwZCI5QyLJhgFYmA&oe=61E1A6BD",
    name: "Pham Vinh Nhan",
    age: 32,
    bio: "test test test test test test test test test test test test test test test ",
    studyAt: "NTT",
  },
];

const MatchPage: React.FunctionComponent<MatchPageProps> = () => {
  const [currentIndex, setCurrentIndex] = React.useState(data.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = React.useRef(currentIndex);

  const childRefs = React.useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  ) as any;

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction: any, nameToDelete: any, index: any) => {
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, idx: any) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir: any) => {
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
          key={data.name}
          onSwipe={(dir) => swiped(dir, data.name, index)}
          onCardLeftScreen={() => outOfFrame(data.name, index)}
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
