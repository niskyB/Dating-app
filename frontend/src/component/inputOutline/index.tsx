interface InputOutlineProps {
  label: string;
  name: string;
  value?: string;
  editable?: boolean;
  type?: string;
  defaultValue?: string;
  onEditClick?: () => any;
  updatable?: boolean;
}

const InputOutline: React.FunctionComponent<InputOutlineProps> = ({
  label,
  name,
  value,
  editable = true,
  type = "text",
  defaultValue,
  onEditClick,
  updatable = true,
}) => {
  return (
    <div className="mt-5">
      <div className="flex flex-row justify-between px-2">
        <label
          htmlFor={name}
          className="block text-base font-medium text-black"
        >
          {label}
        </label>
        {updatable && (
          <div
            className="text-base font-semibold text-blue-500 cursor-pointer"
            onClick={onEditClick}
          >
            Edit
          </div>
        )}
      </div>
      <div className="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
        <input
          readOnly={!editable}
          type={type}
          name={name}
          className="block w-full text-sm bg-gray-300 border-0 border-b border-transparent focus:border-indigo-600 focus:ring-0 sm:text-base"
          value={value}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
};

export default InputOutline;
