interface UpdateInfoPopupProps {
  name: string;
  description: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
}

const UpdateInfoPopup: React.FunctionComponent<UpdateInfoPopupProps> = ({
  description,
  label,
  name,
  defaultValue,
  type = "text",
  value,
}) => {
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Update your {label}
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>{description}</p>
        </div>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full sm:max-w-xs">
            <label htmlFor={name} className="sr-only">
              {label}
            </label>
            <input
              value={value}
              defaultValue={defaultValue}
              type={type}
              name={name}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateInfoPopup;
