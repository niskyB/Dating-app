import React from "react";
import EducationIcon from "../../component/icon/education";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
import GoBackIcon from "../../component/icon/goBack";
interface MatchPageProps {}

interface matchData {
  avatar: string;
  name: string;
  age: number;
  school: string;
  bio: string;
}
const data: matchData[] = [
  {
    avatar:
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/267039246_2866623933560160_829497954930763995_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=KeR6b9tImZIAX9D1nI1&_nc_ht=scontent.fdad1-2.fna&oh=00_AT9ImHALF6bM53XwSCp4Ao9D-pS_j6WD1_CjrN-3d_JEuw&oe=61BDF153",
    name: "Duc Dauuu",
    age: 20,
    bio: " hihi heheh ohho haah lele haha lala h ohho haah lele haha lala",
    school: "FPT University",
  },
  {
    avatar:
      "https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/132442993_2798827007004557_137046347792697494_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YFghZRynzXcAX-B4gS1&_nc_ht=scontent.fdad1-3.fna&oh=00_AT-a3jChm1QKjSoLGWlWor6Duej5o1aJoeCciPmr4woOSg&oe=61DE9FAA",
    name: "Hoang Loc",
    age: 20,
    bio: "test test test test test test test test test test test test test test test ",
    school: "FBT",
  },
  {
    avatar:
      "https://scontent.fdad1-3.fna.fbcdn.net/v/t1.6435-9/132442993_2798827007004557_137046347792697494_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YFghZRynzXcAX-B4gS1&_nc_ht=scontent.fdad1-3.fna&oh=00_AT-a3jChm1QKjSoLGWlWor6Duej5o1aJoeCciPmr4woOSg&oe=61DE9FAA",
    name: "Hoang Loc",
    age: 20,
    bio: "test test test test test test test test test test test test test test test ",
    school: "FBT",
  },
];

const MatchPage: React.FunctionComponent<MatchPageProps> = () => {
  const onDislike = () => {};
  const onLike = () => {};
  const [currentIndex, setCurrentIndex] = React.useState(data.length - 1);
  const [lastDirection, setLastDirection] = React.useState();
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
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: any, idx: any) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
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
    <div className="w-full h-screen flex justify-center  items-center text-center relative ">
      <div className="w-96 h-168 relative bg-black">
        {data.map((data, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe absolute inset-0"
            key={data.name}
            onSwipe={(dir) => swiped(dir, data.name, index)}
            onCardLeftScreen={() => outOfFrame(data.name, index)}
            preventSwipe={["top", "bottom"]}
          >
            <div className="w-full h-full flex flex-col shadow-lg bg-black">
              <div
                className="w-96 h-140  flex flex-col justify-end"
                style={{
                  backgroundImage: `url("${data.avatar}") `,
                  backgroundSize: "120.755%",
                  backgroundPosition: "50% 50%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="customShadow flex flex-col justify-end items-start px-5 py-5 w-full h-1/4">
                  <div className="text-white text-4xl font-medium">
                    {data.name} {data.age}
                  </div>
                  <div className="text-gray-200 items-center flex justify-start my-2 text-base font-medium">
                    <div className="text-white">
                      <EducationIcon />
                    </div>
                    <span className="ml-3">{data.school}</span>
                  </div>
                  <div className="text-gray-200 text-left text-base font-medium">
                    {data.bio}
                  </div>
                </div>
              </div>
              <div className="flex bg-black flex-row justify-evenly items-center flex-1 "></div>
            </div>
          </TinderCard>
        ))}
        <div className="flex bg-black flex-row justify-evenly items-center flex-1 absolute bottom-0 left-0 right-0 pb-4">
          <div
            className="text-sun-500 flex justify-center items-center w-20 h-20 border-sun-500 solid border-1 rounded-full"
            onClick={() => goBack()}
          >
            <GoBackIcon />
          </div>
          <div
            className="text-radical-red-500 flex justify-center items-center w-20 h-20 border-radical-red-500 solid border-1 rounded-full"
            onClick={() => swipe("left")}
          >
            <XIcon />
          </div>
          <div
            className="text-mountain-meadow-500 flex justify-center items-center w-20 h-20 border-mountain-meadow-500 solid border-1 rounded-full"
            onClick={() => swipe("right")}
          >
            <HeartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchPage;
