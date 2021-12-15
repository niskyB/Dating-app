import React from "react";
import EducationIcon from "../../component/icon/education";
import HeartIcon from "../../component/icon/heart";
import XIcon from "../../component/icon/x";
import TinderCard from "react-tinder-card";
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
      "https://scontent.fdad1-2.fna.fbcdn.net/v/t1.6435-9/134730612_2150353421765290_5839745717352446089_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=mdX1H50ZLtAAX_mDFRN&tn=DcZMTwYmrWFGBHGB&_nc_ht=scontent.fdad1-2.fna&oh=00_AT-Xt2lre7IjGSHielWHGzlypdG8qlZYx81qb551tvnIAA&oe=61E13235",
    name: "Chi Khang",
    age: 20,
    bio: "test test test test test test test test test test test test test test test ",
    school: "FBTT",
  },
];

const MatchPage: React.FunctionComponent<MatchPageProps> = () => {
  const [lastDirection, setLastDirection] = React.useState();
  const onDislike = () => {};
  const onLike = () => {};
  //direction contain value which the card go left or right
  //name to detele in here will be the id
  const swiped = (direction: any, nameToDelete: any) => {
    console.log("removing: " + nameToDelete);
    console.log(direction);
    setLastDirection(direction);
  };
  //the action when the card is left the screen
  const outOfFrame = (name: any) => {
    console.log(name + " left the screen!");
  };
  return (
    <div className="w-full h-screen flex justify-center  items-center text-center relative ">
      <div className="w-96 h-168 relative">
        {data.map((data) => {
          return (
            <TinderCard
              key={data.name}
              onSwipe={(dir) => swiped(dir, data.name)}
              onCardLeftScreen={() => outOfFrame(data.name)}
              preventSwipe={["up", "down"]}
              className="w-full h-full absolute inset-0"
            >
              <div className="w-full h-full flex flex-col shadow-lg bg-gray-800">
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
                <div className="flex bg-black flex-row justify-evenly items-center flex-1">
                  <div
                    className="text-radical-red-500 flex justify-center items-center w-20 h-20 border-radical-red-500 solid border-1 rounded-full"
                    onClick={onDislike}
                  >
                    <XIcon />
                  </div>
                  <div
                    className="text-mountain-meadow-500 flex justify-center items-center w-20 h-20 border-mountain-meadow-500 solid border-1 rounded-full"
                    onClick={onLike}
                  >
                    <HeartIcon />
                  </div>
                </div>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
};

export default MatchPage;
