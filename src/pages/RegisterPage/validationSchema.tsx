import * as yup from 'yup';
import dayjs from 'dayjs';

import { EMAIL_VALIDATION, PASSWORD_VALIDATION, VALIDATION_MESSAGES } from '../../utils/validation';

const dateRules = dayjs().subtract(13, 'year');
const nameRules = /^[a-zA-Z]*$/gi;
const streetRules = /^[a-zA-Z0-9.\s]*$/;

const postalRulesCis = /^\d{6}$/;
const postalRulesUsa = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
const postalRulesGeorgia = /^\d{4}$/;

const minMessage = 'Must be at least 1 character!';

const cisPostalRulesHelper = (value: string): boolean => value === 'Belarus' || value === 'Russian Federation';

export const schema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .matches(PASSWORD_VALIDATION.rules_whitespaces, { message: PASSWORD_VALIDATION.message_whitespaces })
    .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
    .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
    .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit })
    .min(8, PASSWORD_VALIDATION.message_length),
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
  firstname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  lastname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required(VALIDATION_MESSAGES.message_required)
    .max(dateRules, 'You must be at least 13 years old to register!'),
  billing_street: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .min(1, minMessage)
    .matches(streetRules, VALIDATION_MESSAGES.message_street),
  billing_city: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  billing_postal: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .when('billing_country', {
      is: 'Georgia',
      then: (value) => value.matches(postalRulesGeorgia, VALIDATION_MESSAGES.message_postal_georgia),
    })
    .when('billing_country', {
      is: 'United States',
      then: (value) => value.matches(postalRulesUsa, VALIDATION_MESSAGES.message_postal_usa),
    })
    .when('billing_country', {
      is: cisPostalRulesHelper,
      then: (value) => value.matches(postalRulesCis, VALIDATION_MESSAGES.message_postal_cis),
    }),
  billing_country: yup.string().required(VALIDATION_MESSAGES.message_required),

  sameAddress: yup.boolean(),
  defaultBilling: yup.boolean(),
  defaultShipping: yup.boolean(),

  shipping_street: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required('Required field!').min(1, minMessage).matches(streetRules, VALIDATION_MESSAGES.message_street),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_city: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required('Required field!').min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_postal: yup
    .string()
    .when('sameAddress', {
      is: false,
      then: (value) => value.required('Required field!'),
      otherwise: (value) => value.notRequired(),
    })
    .when('shipping_country', {
      is: 'Georgia',
      then: (value) => value.matches(postalRulesGeorgia, VALIDATION_MESSAGES.message_postal_georgia),
    })
    .when('shipping_country', {
      is: 'United States',
      then: (value) => value.matches(postalRulesUsa, VALIDATION_MESSAGES.message_postal_usa),
    })
    .when('shipping_country', {
      is: cisPostalRulesHelper,
      then: (value) => value.matches(postalRulesCis, VALIDATION_MESSAGES.message_postal_cis),
    }),
  shipping_country: yup.string().when('sameAddress', {
    is: false,
    then: (value) => value.required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(streetRules, VALIDATION_MESSAGES.message_street),
    otherwise: (value) => value.notRequired(),
  }),
});

export type SchemaType = yup.InferType<typeof schema>;
