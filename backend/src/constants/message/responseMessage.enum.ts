export enum ResponseMessage {
  // login
  SIGNIN_FAIL = 'Email or password is not correct',
  // existed
  EXISTED_EMAIL = 'Email has already existed',
  EXISTED_PHONE = 'Phone number has already existed',
  // invalid
  INVALID_COFIRMPASSWORD = 'The password confirmation does not match',
  INVALID_PHONE = 'Invalid phone number',
  INVALID_SEX = 'Sex should be male or female',
  INVALID_PASSWORD = 'Password is not correct',
  INVALID_LIMIT = 'Invalid limit',
  INVALID_SKIP = 'Invalid skip',
  INVALID_ROOM = 'Invalid room',
  //
  UNAUTHORIZED = 'Not signin yet',
  FORBIDDEN = "You don't have permission to access / on this page",
  NOTFOUND = 'Sorry, the page not found',
  REACH_LIMIT_HOBBIES = 'The maximum of hobbies is 5. Please remove any hobby to continue',
  // duplicated
  DUPLICATED_PASSWORD = 'New password is same with your current password',
  DUPLICATED_NAME = 'New name is same with your current name',
  DUPLICATED_PHONE = 'New phone number is same with your current phone number',
  DUPLICATED_HOBBIES = 'Hobby has already existed',
  // file
  IMG_ERROR = 'Image uploaded should be jpg/jpeg or png',
}
