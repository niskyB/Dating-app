import { Link } from "react-router-dom";

interface NotLoginMessageProps {}

const NotLoginMessage: React.FunctionComponent<NotLoginMessageProps> = () => {
  return (
    <>
      <div className="mx-auto mb-5 text-base font-semibold">
        You are not login yet, login now
      </div>
      <Link
        to="/login"
        type="button"
        className="inline-flex items-center px-4 py-2 mx-auto text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm max-w-max hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Log in
      </Link>
    </>
  );
};

export default NotLoginMessage;
