import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required().trim(),
  confirmPassword: Joi.string().valid(Joi.ref('password')),
  name: Joi.string().min(2).max(50).required(),
  phone: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^[0-9]+$/)
    .required(),
  address: Joi.string().max(255).required(),
  sex: Joi.string().valid('MALE', 'FEMALE').required(),
});
