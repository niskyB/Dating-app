import * as React from "react";
import Cropper from "react-easy-crop";
interface CropperProps {
  image: string;
}

const CropperBox: React.FunctionComponent<CropperProps> = ({ image }) => {
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const onCropComplete = React.useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
  }, []);
  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={5 / 6}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default CropperBox;
