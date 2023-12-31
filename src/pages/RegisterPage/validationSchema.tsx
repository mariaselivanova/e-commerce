import * as yup from 'yup';

import { EMAIL_VALIDATION, PASSWORD_SCHEMA, VALIDATION_MESSAGES, VALIDATION_RULES } from '../../utils/validation';

const cisPostalRulesHelper = (value: string): boolean => value === 'Belarus' || value === 'Russian Federation';

export const schema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .email(EMAIL_VALIDATION.message)
    .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
  password: PASSWORD_SCHEMA,
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('password')], 'Your passwords do not match.'),
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
  billing_street: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .min(1, VALIDATION_MESSAGES.message_min)
    .matches(VALIDATION_RULES.streetRules, VALIDATION_MESSAGES.message_street),
  billing_city: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .min(1, VALIDATION_MESSAGES.message_min)
    .matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_latin),
  billing_postal: yup
    .string()
    .required(VALIDATION_MESSAGES.message_required)
    .when('billing_country', {
      is: 'Georgia',
      then: (value) => value.matches(VALIDATION_RULES.postalRulesGeorgia, VALIDATION_MESSAGES.message_postal_georgia),
    })
    .when('billing_country', {
      is: 'United States',
      then: (value) => value.matches(VALIDATION_RULES.postalRulesUsa, VALIDATION_MESSAGES.message_postal_usa),
    })
    .when('billing_country', {
      is: cisPostalRulesHelper,
      then: (value) => value.matches(VALIDATION_RULES.postalRulesCis, VALIDATION_MESSAGES.message_postal_cis),
    }),
  billing_country: yup.string().required(VALIDATION_MESSAGES.message_required),

  sameAddress: yup.boolean(),
  defaultBilling: yup.boolean(),
  defaultShipping: yup.boolean(),

  shipping_street: yup.string().when('sameAddress', {
    is: false,
    then: (value) =>
      value
        .required('Required field!')
        .min(1, VALIDATION_MESSAGES.message_min)
        .matches(VALIDATION_RULES.streetRules, VALIDATION_MESSAGES.message_street),
    otherwise: (value) => value.notRequired(),
  }),
  shipping_city: yup.string().when('sameAddress', {
    is: false,
    then: (value) =>
      value
        .required('Required field!')
        .min(1, VALIDATION_MESSAGES.message_min)
        .matches(VALIDATION_RULES.nameRules, VALIDATION_MESSAGES.message_latin),
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
      then: (value) => value.matches(VALIDATION_RULES.postalRulesGeorgia, VALIDATION_MESSAGES.message_postal_georgia),
    })
    .when('shipping_country', {
      is: 'United States',
      then: (value) => value.matches(VALIDATION_RULES.postalRulesUsa, VALIDATION_MESSAGES.message_postal_usa),
    })
    .when('shipping_country', {
      is: cisPostalRulesHelper,
      then: (value) => value.matches(VALIDATION_RULES.postalRulesCis, VALIDATION_MESSAGES.message_postal_cis),
    }),
  shipping_country: yup.string().when('sameAddress', {
    is: false,
    then: (value) =>
      value
        .required(VALIDATION_MESSAGES.message_required)
        .min(1, VALIDATION_MESSAGES.message_min)
        .matches(VALIDATION_RULES.streetRules, VALIDATION_MESSAGES.message_street),
    otherwise: (value) => value.notRequired(),
  }),
});

export type SchemaType = yup.InferType<typeof schema>;
