import * as Joi from 'joi';
import { JoiMessage } from 'joi-message';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';

export const changePasswordSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .trim()
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Password' }),
      'string.min': ResponseMessage.INVALID_PASSWORD,
      'string.max': ResponseMessage.INVALID_PASSWORD,
      'string.empty': ResponseMessage.INVALID_PASSWORD,
      'any.required': ResponseMessage.INVALID_PASSWORD,
    }),
  newPassword: Joi.string()
    .min(6)
    .max(50)
    .required()
    .trim()
    .messages(
      JoiMessage.createArrayMessages({
        field: 'New password',
        min: 6,
        max: 50,
      }),
    ),
  confirmPassword: Joi.string()
    .valid(Joi.ref('newPassword'))
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Confirm password' }),
      'any.only': ResponseMessage.INVALID_COFIRMPASSWORD,
    }),
});
