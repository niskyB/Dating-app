import * as Joi from 'joi';
import { JoiMessage } from 'joi-message';

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
