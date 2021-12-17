import * as Joi from 'joi';
import { JoiMessage } from 'joi-message';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';

export const changeUserNameSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(
      JoiMessage.createArrayMessages({ field: 'Name', min: 2, max: 50 }),
    ),
});

export const changeUserBioSchema = Joi.object({
  bio: Joi.string()
    .max(255)
    .allow('')
    .required()
    .messages(JoiMessage.createArrayMessages({ field: 'Bio', max: 255 })),
});

export const changeUserPhoneSchema = Joi.object({
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
});
