import PlusCircleIcon from "../icon/plusCircle";

interface AHightLightImageProps {
  imgUrl?: string;
}

const AHightLightImage: React.FunctionComponent<AHightLightImageProps> = ({
  imgUrl,
}) => {
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
          <div className="absolute w-8 h-8 text-red-500 bg-white cursor-pointer -right-3 -bottom-3">
            <PlusCircleIcon />
          </div>
        )}
      </div>
    </>
  );
};

export default AHightLightImage;
