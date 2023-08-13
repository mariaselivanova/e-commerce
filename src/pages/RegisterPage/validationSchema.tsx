import * as yup from 'yup';
import dayjs from 'dayjs';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const dateRules = dayjs().subtract(13, 'year');
const emailRules = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const nameRules = /^[a-zA-Z]*$/gi;
const streetRules = /^[a-zA-Z0-9\s]*$/;
const postalRules = /^\d{6}$/;

const minMessage = 'Must be at least 1 character!';
const nameMessage = 'Must only contain latin characters!';
const emailMessage = 'Please type an email of correct format (e.g. example@gmail.com)!';
const streetMessage = 'Street name can only have latin characters, numbers and whitespaces!';

export const schema = yup.object().shape({
  email: yup.string().required('Required field!').email(emailMessage).matches(emailRules, emailMessage),
  password: yup
    .string()
    .required('Required field!')
    .matches(passwordRules, { message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase and 1 number!' }),
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
