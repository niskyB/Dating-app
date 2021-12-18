interface DeviderWithTextProps {
  label: string;
}

const DeviderWithText: React.FunctionComponent<DeviderWithTextProps> = ({
  label,
}) => {
  return (
    <div className="relative mt-5">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-sm text-gray-500">{label}</span>
      </div>
    </div>
  );
};

export default DeviderWithText;
