import { PlusIcon } from "@heroicons/react/solid";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import XIcon from "../../component/icon/x";
import { deleteHighLighImage } from "./action";
import { userThunk } from "../../store/user/thunk";

interface AHightLightImageProps {
  imgUrl?: string;
  id: string;
  isAvatar?: boolean;
}

const AHightLightImage: React.FunctionComponent<AHightLightImageProps> = ({
  imgUrl,
  id,
  isAvatar = false,
}) => {
  const onCropImage = (e: any) => {
    if (e.currentTarget.files) {
      store.dispatch(
        UIAction.setCropImage({
          imageUrl: URL.createObjectURL(e.currentTarget.files[0]),
          isAvatar,
        })
      );
    }
  };
  const onRemoveHighlightImage = async () => {
    const res = await deleteHighLighImage(id);
    if (res.status === 200) store.dispatch(userThunk.getCurrentUser());
  };
  console.log(id);
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
        {imgUrl && !isAvatar ? (
          <div
            className="absolute w-7 h-7 p-1 text-red-500 bg-white shadow-lg  rounded-full cursor-pointer -right-3 -bottom-3"
            onClick={onRemoveHighlightImage}
          >
            <XIcon />
          </div>
        ) : (
          <>
            <label
              htmlFor={id}
              className="absolute w-7 h-7 p-1 text-white bg-red-500 rounded-full cursor-pointer -right-3 -bottom-3"
            >
              <PlusIcon />
            </label>
            <input
              id={id}
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
