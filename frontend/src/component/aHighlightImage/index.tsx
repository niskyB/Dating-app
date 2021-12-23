import { PlusIcon } from "@heroicons/react/solid";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import XIcon from "../icon/x";

interface AHightLightImageProps {
  imgUrl?: string;
  id?: string;
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
  const onRemoveIcon = (e: any) => {};
  return (
    <>
      <div
        className={`relative h-40   ${
          imgUrl ? "" : "border-dashed border-red-400 border-2"
        } w-[29%]`}
        style={{
          backgroundImage: `url("${imgUrl}") `,
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      >
        {imgUrl ? (
          <div
            className="absolute p-1 text-red-500 bg-white rounded-full shadow-lg cursor-pointer w-7 h-7 -right-3 -bottom-3"
            onClick={onRemoveIcon}
          >
            <XIcon />
          </div>
        ) : (
          <>
            <label
              htmlFor="file-upload"
              className="absolute p-1 text-white bg-red-500 rounded-full cursor-pointer w-7 h-7 -right-3 -bottom-3"
            >
              <PlusIcon />
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
