import * as yup from 'yup';

import { VALIDATION_MESSAGES, VALIDATION_RULES, EMAIL_VALIDATION } from '../../utils/validation';

export const schema = yup.object().shape({
  firstname: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .min(1, VALIDATION_MESSAGES.message_min)
    .matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_latin),
  lastname: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .min(1, VALIDATION_MESSAGES.message_min)
    .matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_latin),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required(VALIDATION_MESSAGES.message_required)
    .max(VALIDATION_RULES.dateRules, 'You must be at least 13 years old to register!'),
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
});

export type SchemaType = yup.InferType<typeof schema>;
