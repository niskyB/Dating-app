import { store } from "../store";
import { UIAction } from "../store/UI";

export const openSuccessModel = (title: string, message: string = "") => {
  store.dispatch(
    UIAction.setSuccessModel({
      isOpenning: true,
      title,
      message,
    })
  );
  setTimeout(() => {
    store.dispatch(UIAction.onCloseSuccessModel());
  }, 3000);
};

export const openSuccessNotification = (
  title: string,
  message: string = ""
) => {
  store.dispatch(
    UIAction.setNotification({
      status: "SUCCESS",
      title,
      message,
      isOpenning: true,
    })
  );
  setTimeout(() => {
    store.dispatch(UIAction.onCloseNotification());
  }, 3000);
};

export const openWarningNotification = (
  title: string,
  message: string = ""
) => {
  store.dispatch(
    UIAction.setNotification({
      status: "WARNING",
      title,
      message,
      isOpenning: true,
    })
  );
  setTimeout(() => {
    store.dispatch(UIAction.onCloseNotification());
  }, 3000);
};

export const openErrorNotification = (title: string, message: string = "") => {
  store.dispatch(
    UIAction.setNotification({
      status: "ERROR",
      title,
      message,
      isOpenning: true,
    })
  );
  setTimeout(() => {
    store.dispatch(UIAction.onCloseNotification());
  }, 3000);
};
