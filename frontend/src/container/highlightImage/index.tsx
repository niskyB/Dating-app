import { highlightImg } from "../../common/interface/entity/user";

interface HighlightImageProps {
  highlightImgs: highlightImg[];
  avatar: string;
}

const HighlightImage: React.FunctionComponent<HighlightImageProps> = () => {
  return (
    <div className="flex flex-row flex-wrap gap-2 px-3 mt-5 ">
      <div className="w-1/3 h-40 border-2 border-black border-dashed"></div>
      <div className="w-1/3 h-40 border-2 border-black border-dashed"></div>
      <div className="w-1/3 h-40 border-2 border-black border-dashed"></div>
    </div>
  );
};

export default HighlightImage;
