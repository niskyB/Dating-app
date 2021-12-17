interface TextFieldProps {
  name: string;
  label: string;
  editable?: boolean;
  value: string;
}

const TextField: React.FunctionComponent<TextFieldProps> = ({
  name,
  label,
  editable = true,
  value,
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
      <div className="mt-1">
        <textarea
          readOnly={!editable}
          rows={4}
          name="comment"
          id="comment"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm bg-gray-300 border-gray-300 "
          defaultValue={value}
        />
      </div>
    </div>
  );
};

export default TextField;
