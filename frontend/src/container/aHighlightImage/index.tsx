import { PlusIcon } from "@heroicons/react/solid";
import { store } from "../../store";
import { UIAction } from "../../store/UI";
import XIcon from "../../component/icon/x";
import { deleteHighLighImage } from "./action";
import { userThunk } from "../../store/user/thunk";
import { timeDelay } from "../../constants/loading";
import {
  openSuccessNotification,
  openWarningNotification,
} from "../../utils/notificationHelper";

interface AHightLightImageProps {
  imgUrl?: string;
  id: string;
  isAvatar?: boolean;
}
const limitSize = 2 * 1048576; //2MB
const AHightLightImage: React.FunctionComponent<AHightLightImageProps> = ({
  imgUrl,
  id,
  isAvatar = false,
}) => {
  const onCropImage = (e: any) => {
    if (e.currentTarget.files) {
      const fileName = e.currentTarget.files[0].name as string;
      const matchResult = fileName.match(/\.(jpg|jpeg|png)$/);
      if (matchResult && matchResult?.length > 0) {
        if (e.currentTarget.files[0].size < limitSize) {
          store.dispatch(
            UIAction.setCropImage({
              imageUrl: URL.createObjectURL(e.currentTarget.files[0]),
              isAvatar,
            })
          );
        } else {
          openWarningNotification(
            "File too large",
            "The image should be less than 5MB"
          );
        }
      } else {
        openWarningNotification(
          "Invalid image",
          "The image should be a jpg, jpeg, png file"
        );
      }
    }
  };
  const onRemoveHighlightImage = async () => {
    if (
      window.confirm(
        "Do you really want to delete this image from your libary?"
      )
    ) {
      store.dispatch(UIAction.setIsLoading(true));
      const res = await deleteHighLighImage(id);
      if (res.status === 200) {
        await store.dispatch(userThunk.getCurrentUser());
        setTimeout(() => {
          store.dispatch(UIAction.setIsLoading(false));
          openSuccessNotification("Remove image success!");
        }, timeDelay);
      }
    }
  };
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
            className="absolute p-1 text-red-500 bg-white rounded-full shadow-lg cursor-pointer w-7 h-7 -right-3 -bottom-3"
            onClick={onRemoveHighlightImage}
          >
            <XIcon />
          </div>
        ) : (
          <>
            <label
              htmlFor={id}
              className="absolute p-1 text-white bg-red-500 rounded-full cursor-pointer w-7 h-7 -right-3 -bottom-3"
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
