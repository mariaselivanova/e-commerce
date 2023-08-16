import * as yup from 'yup';
import dayjs from 'dayjs';

import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../utils/validation';

const dateRules = dayjs().subtract(13, 'year');
const nameRules = /^[a-zA-Z]*$/gi;
const streetRules = /^[a-zA-Z0-9.\s]*$/;
const postalRules = /^\d{6}$/;

const requiredMessage = 'Required field!';
const minMessage = 'Must be at least 1 character!';
const nameMessage = 'Must only contain latin characters!';
const streetMessage = 'Street name can only have latin characters, dots, numbers and whitespaces!';

export const schema = yup.object().shape({
  email: yup.string().required(requiredMessage).email(EMAIL_VALIDATION.message).matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: yup
    .string()
    .required(requiredMessage)
    .min(8, 'Password must be at least 8 characters long!')
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit }),
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  firstname: yup.string().required(requiredMessage).min(1, minMessage).matches(nameRules, nameMessage),
  lastname: yup.string().required(requiredMessage).min(1, minMessage).matches(nameRules, nameMessage),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required(requiredMessage)
    .max(dateRules, 'You must be at least 13 years old to register!'),
  billing_street: yup.string().required(requiredMessage).min(1, minMessage).matches(streetRules, streetMessage),
  billing_city: yup.string().required(requiredMessage).min(1, minMessage).matches(nameRules, nameMessage),
  billing_postal: yup.string().required(requiredMessage).matches(postalRules, 'Postal code can only contain 6 numbers!'),
  billing_country: yup.string().required(requiredMessage),

  sameAddress: yup.boolean(),
  defaultBilling: yup.boolean(),
  defaultShipping: yup.boolean(),

  shipping_street: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required('Required field!').min(1, minMessage).matches(streetRules, streetMessage),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_city: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required('Required field!').min(1, minMessage).matches(nameRules, nameMessage),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_postal: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required('Required field!').matches(postalRules, 'Postal code can only contain 6 numbers!'),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_country: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.min(1, minMessage).matches(streetRules, streetMessage),
    otherwise: (value) => value.notRequired(),
  }),
});
