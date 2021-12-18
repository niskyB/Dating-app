interface CheckBoxProps {
  description?: string;
  label: string;
  className?: string;
  checked: boolean;
  onChange: () => any;
}

const CheckBox: React.FunctionComponent<CheckBoxProps> = ({
  description = "",
  label,
  className = "",
  checked,
  onChange,
}) => {
  return (
    <fieldset className={`space-y-5 ${className}`}>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
          <input
            onChange={onChange}
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            checked={checked}
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {label}
          </label>
          <p id="comments-description" className="text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </fieldset>
  );
};

export default CheckBox;
