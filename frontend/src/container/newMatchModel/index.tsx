import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/solid";
import { MatchCard } from "../../component/card/interface.dto";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { UserState } from "../../common/interface/redux/user";
import { Link } from "react-router-dom";
interface NewMatchModelProps {
  isOpenning: boolean;
  onCloseNewMatchPopup: Function;
  target?: MatchCard;
}

const NewMatchModel: React.FunctionComponent<NewMatchModelProps> = ({
  isOpenning,
  target,
  onCloseNewMatchPopup,
}) => {
  const userState = useSelector<RootState, UserState>((state) => state.user);
  return (
    <Transition.Root show={isOpenning} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => onCloseNewMatchPopup()}
      >
        <div className="flex items-end justify-center min-h-full px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-opacity-75 bg-black/80" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-auto px-10 py-10 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:align-middle ">
              <div className="flex flex-col items-center justify-between ">
                <h2 className="font-serif text-2xl italic font-bold">
                  It's a match !
                </h2>
                <p className="mt-2 text-base font-semibold text-gray-500">
                  You and Duc have liked each other!
                </p>
                {target && (
                  <div className="flex items-center gap-5 mt-5">
                    <div
                      className="w-32 h-32 rounded-full"
                      style={{
                        backgroundImage: `url("${
                          userState.data.avatar
                            ? `${process.env.REACT_APP_SERVER_URL}/${userState.data.avatar}`
                            : "/images/dog.jpg"
                        }") `,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <HeartIcon className="w-16 h-16 text-red-500" />
                    <div
                      className="w-32 h-32 rounded-full"
                      style={{
                        backgroundImage: `url("${
                          target
                            ? `${process.env.REACT_APP_SERVER_URL}/${target.avatar}`
                            : "/images/dog.jpg"
                        }") `,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                )}
                <div className="flex w-full gap-5 mt-5">
                  <button
                    onClick={() => onCloseNewMatchPopup()}
                    type="button"
                    className="w-1/2 px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    I'm not ready yet
                  </button>
                  <Link
                    onClick={() => onCloseNewMatchPopup()}
                    to={`/messages/${target?.id}`}
                    className="w-1/2"
                  >
                    <button
                      type="button"
                      className="w-full px-3 py-2 text-sm font-medium leading-4 text-white bg-red-400 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Chat now!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewMatchModel;
