import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { UseFormRegister } from "react-hook-form";
interface InputFieldProps {
  label?: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  errorMessage?: string;
  showLabel?: boolean;
  defaultValue?: string | number;
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  errorMessage,
  register,
  showLabel = true,
  defaultValue,
}) => {
  return (
    <div>
      {showLabel && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type={type}
          id={name}
          defaultValue={defaultValue}
          className={
            errorMessage
              ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              : "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          }
          placeholder={placeholder}
          {...register(name)}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {errorMessage && (
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
