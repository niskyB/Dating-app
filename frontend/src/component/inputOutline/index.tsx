interface InputOutlineProps {
  label: string;
  name: string;
  value?: string;
  editable?: boolean;
  type?: string;
  defaultValue?: string;
}

const InputOutline: React.FunctionComponent<InputOutlineProps> = ({
  label,
  name,
  value,
  editable = true,
  type = "text",
  defaultValue,
}) => {
  return (
    <div className="mt-5">
      <div className="px-2 flex flex-row justify-between">
        <label
          htmlFor={name}
          className="block text-base  font-medium text-gray-500"
        >
          {label}
        </label>
        <div className="text-base text-blue-500 font-semibold cursor-pointer">
          Edit
        </div>
      </div>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          readOnly={!editable}
          type={type}
          name={name}
          className="block text-sm w-full  border-0 border-b border-transparent bg-gray-300 focus:border-indigo-600 focus:ring-0 sm:text-base"
          value={value}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default InputOutline;
