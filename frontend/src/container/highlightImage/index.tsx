import { HighlightImg } from "../../common/interface/entity/highlightImg";
import AHightLightImage from "../aHighlightImage";

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
      {/* render avatar */}
      <AHightLightImage
        imgUrl={avatar && `${process.env.REACT_APP_SERVER_URL}/${avatar}`}
        isAvatar={true}
        id={"avatar"}
      />
      {/* render highlight image */}
      {highlightImgs.map((img) => {
        return (
          <AHightLightImage
            key={img.id}
            imgUrl={`${process.env.REACT_APP_SERVER_URL}/${img.image}`}
            id={img.id}
            isAvatar={false}
          />
        );
      })}
      {/* render remain slot of image */}
      {[...Array(numberOfRemainSlot)].map((value, index) => {
        return <AHightLightImage key={index} id={index.toString()} />;
      })}
    </div>
  );
};

export default HighlightImage;
