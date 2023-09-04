import * as yup from 'yup';
import { EMAIL_VALIDATION, PASSWORD_SCHEMA } from '../../utils/validation';

export const schemaLogin = yup.object().shape({
  email: yup.string().required('Required field!').email(EMAIL_VALIDATION.message).matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: PASSWORD_SCHEMA,
});
