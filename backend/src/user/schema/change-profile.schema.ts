import * as Joi from 'joi';
import { JoiMessage } from 'joi-message';
import { ResponseMessage } from '../../constants/message/responseMessage.enum';
import { Sex } from '../enum/user.sex.enum';

export const changeUserNameSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages(
      JoiMessage.createStringMessages({ field: 'Name', min: 2, max: 50 }),
    ),
});

export const changeUserBioSchema = Joi.object({
  bio: Joi.string()
    .max(255)
    .allow('')
    .required()
    .messages(JoiMessage.createStringMessages({ field: 'Bio', max: 255 })),
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

export const changeUserAddressSchema = Joi.object({
  address: Joi.string()
    .max(255)
    .required()
    .messages(JoiMessage.createStringMessages({ field: 'Address', max: 255 })),
});

export const changeUserSexSchema = Joi.object({
  sex: Joi.string()
    .valid(Sex.MALE, Sex.FEMALE)
    .required()
    .messages({
      ...JoiMessage.createStringMessages({ field: 'Sex' }),
      'any.only': ResponseMessage.INVALID_SEX,
    }),
});

export const changeUserDateOfBirthSchema = Joi.object({
  dateOfBirth: Joi.date()
    .required()
    .messages(JoiMessage.createDateMessages({ field: 'Date of birth' })),
});

export const changeStudyAtSchema = Joi.object({
  studyAt: Joi.string()
    .required()
    .max(255)
    .allow('')
    .messages(JoiMessage.createStringMessages({ field: 'Study at' })),
});

export const changeHobbySchema = Joi.object({
  name: Joi.string()
    .required()
    .max(255)
    .messages(JoiMessage.createStringMessages({ field: 'Hobby' })),
});

export const changeShowAgeOptionSchema = Joi.object({
  showAge: Joi.boolean()
    .required()
    .messages(JoiMessage.createBooleanMessages({ field: 'Show age' })),
});

export const changeShowStudyOptionSchema = Joi.object({
  showStudy: Joi.boolean()
    .required()
    .messages(JoiMessage.createBooleanMessages({ field: 'Show study' })),
});

export const changeShowBioOptionSchema = Joi.object({
  showBio: Joi.boolean()
    .required()
    .messages(JoiMessage.createBooleanMessages({ field: 'Show bio' })),
});

export const changeShowHobbiesOptionSchema = Joi.object({
  showHobbies: Joi.boolean()
    .required()
    .messages(JoiMessage.createBooleanMessages({ field: 'Show hobbies' })),
});
