import * as Joi from 'joi';
import JoiMessage from 'joi-message';
import { ResponseMessage } from 'src/constants/message/responseMessage.enum';

export const signinUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Email' }),
      'string.email': ResponseMessage.SIGNIN_FAIL,
    }),
  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .trim()
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Password' }),
      'string.min': ResponseMessage.SIGNIN_FAIL,
      'string.max': ResponseMessage.SIGNIN_FAIL,
    }),
});
