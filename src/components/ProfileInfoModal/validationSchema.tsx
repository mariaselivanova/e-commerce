import * as yup from 'yup';
import dayjs from 'dayjs';

import { VALIDATION_MESSAGES, PASSWORD_VALIDATION, EMAIL_VALIDATION } from '../../utils/validation';

const dateRules = dayjs().subtract(13, 'year');
const nameRules = /^[a-zA-Z]*$/gi;

const minMessage = 'Must be at least 1 character!';

export const schema = yup.object().shape({
  firstname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  lastname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required(VALIDATION_MESSAGES.message_required)
    .max(dateRules, 'You must be at least 13 years old to register!'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
});

export const schemaPassword = yup.object().shape({
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .matches(PASSWORD_VALIDATION.rules_whitespaces, { message: PASSWORD_VALIDATION.message_whitespaces })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit })
    .min(8, PASSWORD_VALIDATION.message_length),
});

export type SchemaType = yup.InferType<typeof schema>;
export type SchemaTypePassword = yup.InferType<typeof schemaPassword>;
