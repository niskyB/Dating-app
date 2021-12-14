import * as Joi from 'joi';

export const signinUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required().trim(),
});
