import { highlightImg } from "../../common/interface/entity/user";
import AHightLightImage from "../../component/aHighlightImage";

interface HighlightImageProps {
  highlightImgs: highlightImg[];
  avatar: string;
}

const HighlightImage: React.FunctionComponent<HighlightImageProps> = ({
  highlightImgs,
  avatar,
}) => {
  const numberOfRemainSlot = 5 - highlightImgs.length;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-3 px-3 mt-5">
      <AHightLightImage imgUrl={avatar} />
      {highlightImgs.map((img) => {
        return <AHightLightImage key={img.id} imgUrl={img.image} />;
      })}
      {[...Array(numberOfRemainSlot)].map((index) => {
        return <AHightLightImage key={index} />;
      })}
    </div>
  );
};

export default HighlightImage;
