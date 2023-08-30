import * as yup from 'yup';
import { VALIDATION_MESSAGES, PASSWORD_VALIDATION } from '../../utils/validation';

export const schemaPassword = yup.object().shape({
  currentPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .matches(PASSWORD_VALIDATION.rules_whitespaces, { message: PASSWORD_VALIDATION.message_whitespaces })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit })
    .min(8, PASSWORD_VALIDATION.message_length),
  newPassword: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .matches(PASSWORD_VALIDATION.rules_whitespaces, { message: PASSWORD_VALIDATION.message_whitespaces })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit })
    .min(8, PASSWORD_VALIDATION.message_length),
});
export type SchemaTypePassword = yup.InferType<typeof schemaPassword>;
