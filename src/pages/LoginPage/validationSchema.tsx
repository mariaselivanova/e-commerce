import * as yup from 'yup';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';

export const schemaLogin = yup.object().shape({
  email: yup.string().required('Required field!').email(EMAIL_VALIDATION.message).matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: yup
    .string()
    .required('Required field!')
    .min(8, PASSWORD_VALIDATION.message_length)
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit }),
});
