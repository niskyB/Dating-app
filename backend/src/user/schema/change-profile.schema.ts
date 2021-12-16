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
