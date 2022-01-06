import { ScissorsIcon, XIcon } from "@heroicons/react/solid";
import * as React from "react";
import Cropper from "react-easy-crop";
import { useSelector } from "react-redux";
import { UIState } from "../../common/interface/redux/ui";
import { timeDelay } from "../../constants/loading";
import { RootState, store } from "../../store";
import { UIAction } from "../../store/UI";
import { userThunk } from "../../store/user/thunk";
import { openSuccessNotification } from "../../utils/notificationHelper";
import { updateAvatar, updateHighlightImg } from "./action";
import getCroppedImg from "./cropImage";
interface CropperProps {}

const CropperBox: React.FunctionComponent<CropperProps> = () => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);
  const [rotateImage, setRotateImage] = React.useState<number>(0);
  const UIState = useSelector<RootState, UIState>((state) => state.UI);
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const onQuitCropper = () => {
    store.dispatch(UIAction.resetCropper());
  };
  const onCropImage = React.useCallback(async () => {
    try {
      store.dispatch(UIAction.setIsLoading(true));
      const croppedImageUrl = (await getCroppedImg(
        UIState.cropper.imageUrl,
        croppedAreaPixels,
        rotateImage
      )) as any;
      let file = await fetch(croppedImageUrl)
        .then((r) => r.blob())
        .then(
          (blobFile) => new File([blobFile], "image", { type: "image/png" })
        );
      let res;
      if (UIState.cropper.isAvatar) {
        res = await updateAvatar(file);
      } else {
        res = await updateHighlightImg(file);
      }
      if (res.status === 200) {
        await store.dispatch(userThunk.getCurrentUser());
        store.dispatch(UIAction.setCropImage({ imageUrl: "", isAvatar: null }));
        //remove previous blob image url
        URL.revokeObjectURL(UIState.cropper.imageUrl);
        store.dispatch(UIAction.setCroppedImage(croppedImageUrl));

        setTimeout(() => {
          store.dispatch(UIAction.setIsLoading(false));
          openSuccessNotification("Update success!");
        }, timeDelay);
      }
    } catch (e) {
      console.error(e);
    }
  }, [
    croppedAreaPixels,
    rotateImage,
    UIState.cropper.imageUrl,
    UIState.cropper.isAvatar,
  ]);

  const onRotateChange = (e: any) => {
    setRotateImage(e.target.valueAsNumber);
  };
  const onZoomChange = (e: any) => {
    setZoom(e.target.valueAsNumber);
  };
  if (UIState.cropper.imageUrl)
    return (
      <div className="absolute inset-0 z-40">
        <div className="absolute inset-0 bg-white bottom-20">
          <Cropper
            image={UIState.cropper.imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={5 / 7}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            rotation={rotateImage}
          />
        </div>
        <div className="absolute bottom-0 gap-2  flex flex-col lg:flex-row px-5 lg:px-0 justify-center w-full bg-white items-start lg:items-center h-[18%] lg:h-20">
          <div className="flex items-center justify-center w-full lg:w-auto  lg:px-0 lg:mr-5">
            <div className="text-base font-semibold w-16 lg:w-auto lg:mr-3">
              Zoom
            </div>
            <input
              type="range"
              className="flex-auto lg:flex-shrink-0 lg:flex-grow-0"
              min="1"
              max="3"
              step={0.1}
              defaultValue={1}
              onChange={onZoomChange}
            />
          </div>
          <div className="flex items-center justify-center w-full lg:w-auto  lg:px-0">
            <div className="text-base font-semibold w-16 lg:w-auto lg:mr-3">
              Rotate
            </div>
            <input
              type="range"
              className="flex-auto lg:flex-shrink-0 lg:flex-grow-0"
              min="0"
              max="360"
              defaultValue={0}
              onChange={onRotateChange}
            />
          </div>
          <button
            onClick={onCropImage}
            type="button"
            className="inline-flex lg:ml-5 items-center w-full lg:w-auto px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Crop and update
            <ScissorsIcon className="text-white w-5 h-5 ml-3" />
          </button>
        </div>
        <div
          className="absolute top-4 right-4 text-white w-8 h-8"
          onClick={onQuitCropper}
        >
          <XIcon />
        </div>
      </div>
    );

  return <></>;
};

export default CropperBox;
