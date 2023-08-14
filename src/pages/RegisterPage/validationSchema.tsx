import * as yup from 'yup';
import dayjs from 'dayjs';

import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';

const dateRules = dayjs().subtract(13, 'year');
const nameRules = /^[a-zA-Z]*$/gi;
const streetRules = /^[a-zA-Z0-9\s]*$/;
const postalRules = /^\d{6}$/;

const minMessage = 'Must be at least 1 character!';
const nameMessage = 'Must only contain latin characters!';
const streetMessage = 'Street name can only have latin characters, numbers and whitespaces!';

export const schema = yup.object().shape({
  email: yup.string().required('Required field!').email(EMAIL_VALIDATION.message).matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: yup
    .string()
    .required('Required field!')
    .min(8, 'Password must be at least 8 characters long!')
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit }),
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  firstname: yup.string().required('Required field!').min(1, minMessage).matches(nameRules, nameMessage),
  lastname: yup.string().required('Required field!').min(1, minMessage).matches(nameRules, nameMessage),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required('Required field!')
    .max(dateRules, 'You must be at least 13 years old to register!'),
  billing_street: yup.string().required('Required field!').min(1, minMessage).matches(streetRules, streetMessage),
  billing_city: yup.string().required('Required field!').min(1, minMessage).matches(nameRules, nameMessage),
  billing_postal: yup.string().required('Required field!').matches(postalRules, 'Postal code can only contain 6 numbers!'),
  billing_country: yup.string().required('Required field!'),

  shipping_street: yup.string().min(1, minMessage).matches(streetRules, streetMessage),
  shipping_city: yup.string().min(1, minMessage).matches(nameRules, nameMessage),
  shipping_postal: yup.string().matches(postalRules, 'Postal code can only contain 6 numbers!'),
  shipping_country: yup.string(),
});
