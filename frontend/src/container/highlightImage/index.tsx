import { HighlightImg } from "../../common/interface/entity/highlightImg";
import AHightLightImage from "../../component/aHighlightImage";

interface HighlightImageProps {
  highlightImgs: HighlightImg[];
  avatar: string;
}

const HighlightImage: React.FunctionComponent<HighlightImageProps> = ({
  highlightImgs,
  avatar,
}) => {
  const numberOfRemainSlot = 5 - highlightImgs.length;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-5 px-3 mt-5">
      <AHightLightImage
        imgUrl={avatar && `${process.env.REACT_APP_SERVER_URL}/${avatar}`}
      />
      {highlightImgs.map((img) => {
        return (
          <AHightLightImage
            key={img.id}
            imgUrl={`${process.env.REACT_APP_SERVER_URL}/${img.image}`}
            id={img.id}
          />
        );
      })}
      {[...Array(numberOfRemainSlot)].map((index) => {
        return <AHightLightImage key={index} />;
      })}
    </div>
  );
};

export default HighlightImage;
