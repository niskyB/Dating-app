import { store } from "../../store";
import { UIAction } from "../../store/UI";
import PlusCircleIcon from "../icon/plusCircle";

interface AHightLightImageProps {
  imgUrl?: string;
}

const AHightLightImage: React.FunctionComponent<AHightLightImageProps> = ({
  imgUrl,
}) => {
  const onCropImage = (e: any) => {
    if (e.currentTarget.files) {
      store.dispatch(
        UIAction.setCropImage(URL.createObjectURL(e.currentTarget.files[0]))
      );
    }
  };
  return (
    <>
      <div
        className="relative h-40 border-2 border-red-400 border-dashed w-less1/3"
        style={{
          backgroundImage: `url("${imgUrl}") `,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {imgUrl || (
          <>
            <label
              htmlFor="file-upload"
              className="absolute w-8 h-8 text-red-500 bg-white cursor-pointer -right-3 -bottom-3"
            >
              <PlusCircleIcon />
            </label>
            <input
              id="file-upload"
              type="file"
              className="sr-only"
              onChange={onCropImage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default AHightLightImage;
