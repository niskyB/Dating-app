export interface UpdatePopupData {
  isOpenning: boolean;
  name: string;
  description?: string;
  label: string;
  type?: string;
  value?: string;
  defaultValue?: string;
  isTextArea?: boolean;
  onConfirm?: () => any;
}
export interface UIState {
  isMatchOpen: boolean;
  isMessagesOpen: boolean;
  updatePopup: UpdatePopupData;
}
