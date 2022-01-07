import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UIState } from "../../common/interface/redux/ui";
import { MatchCard } from "../../component/card/interface.dto";
import { RootState } from "../../store";
import { GetMatchedList } from "./action";

interface MatchListProps {
  isOpenning: boolean;
}

const MatchList: React.FunctionComponent<MatchListProps> = ({ isOpenning }) => {
  const [data, setData] = useState<MatchCard[]>([]);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  useEffect(() => {
    GetMatchedList().then((data) => {
      setData(data.data.data);
    });

    return () => {};
  }, [UIState.socket.newMatch]);
  if (!isOpenning) return null;

  return (
    <div className="flex flex-row flex-wrap w-ful h-full gap-6 px-5 pt-5 overflow-auto intro-y">
      {data.map((match) => {
        return (
          <Link
            to={`/messages/${match.id}`}
            key={match.id}
            className="w-[45%] h-52 duration-200 border-2 rounded-lg shadow-lg cursor-pointer hover:scale-110 block"
            style={{
              backgroundImage: `url("${process.env.REACT_APP_SERVER_URL}/${match.avatar}") `,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
              backgroundRepeat: "no-repeat",
            }}
          ></Link>
        );
      })}
    </div>
  );
};

export default MatchList;
