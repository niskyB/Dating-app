export enum ResponseMessage {
  SIGNIN_FAIL = 'Email or password is not correct',
  EXISTED_EMAIL = 'Email has already existed',
  EXISTED_PHONE = 'Phone number has already existed',
  INVALID_COFIRMPASSWORD = 'The password confirmation does not match',
  INVALID_PHONE = 'Invalid phone number',
  INVALID_SEX = 'Sex should be male or female',
  INVALID_PASSWORD = 'Password is not correct',
  UNAUTHORIZED = 'Not signin yet',
  FORBIDDEN = "You don't have permission to access / on this page",
  NOTFOUND = 'Sorry, the page not found',
  DUPLICATED_PASSWORD = 'New password is same with your current password',
  DUPLICATED_NAME = 'New name is same with your current name',
  DUPLICATED_PHONE = 'New phone number is same with your current phone number',
  IMG_ERROR = 'Image uploaded should be jpg/jpeg or png',
}
