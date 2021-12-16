import * as Joi from 'joi';
import { JoiMessage } from 'joi-message';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';
import { Sex } from '../../user/enum/user.sex.enum';

export const createUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages(JoiMessage.createStringMessages({ field: 'Email' })),
  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .trim()
    .messages(
      JoiMessage.createArrayMessages({ field: 'Password', min: 6, max: 50 }),
    ),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Confirm password' }),
      'any.only': ResponseMessage.INVALID_COFIRMPASSWORD,
    }),
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(
      JoiMessage.createArrayMessages({ field: 'Name', min: 2, max: 50 }),
    ),
  phone: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      ...JoiMessage.createStringMessages({
        field: 'Phone number',
        min: 6,
        max: 20,
      }),
      'string.pattern.base': ResponseMessage.INVALID_PHONE,
    }),
  address: Joi.string()
    .max(255)
    .required()
    .messages(JoiMessage.createArrayMessages({ field: 'Address', max: 255 })),
  sex: Joi.string()
    .valid(Sex.MALE, Sex.FEMALE)
    .required()
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Confirm password' }),
      'any.only': ResponseMessage.INVALID_SEX,
    }),
});
