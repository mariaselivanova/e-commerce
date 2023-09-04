import dayjs from 'dayjs';
import * as yup from 'yup';

export const EMAIL_VALIDATION = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Please type an email of correct format (e.g. example@gmail.com)!',
};

export const PASSWORD_VALIDATION = {
  rules_uppercase: /(?=.*[A-Z])/,
  rules_lowercase: /(?=.*[a-z])/,
  rules_digit: /\d/,
  rules_whitespaces: /^((?!\s).)*$/,
  message_uppercase: 'Must contain at least one uppercase letter!',
  message_lowercase: 'Must contain at least one lowercase letter!',
  message_digit: 'Must contain at least one digit!',
  message_length: 'Password must be at least 8 characters long!',
  message_whitespaces: 'Password cannot contain whitespaces!',
};

export const VALIDATION_MESSAGES = {
  message_latin: 'Must only contain latin characters!',
  message_required: 'Required field!',
  message_street: 'Street name can only have latin characters, dots, numbers and whitespaces!',
  message_postal_cis: 'Postal code of this country can only contain 6 digits',
  message_postal_usa: 'USA postal code can only be one these formats: XXXXX or XXXXX-XXXX',
  message_postal_georgia: 'Georgia postal code can only contain 4 digits',
  message_min: 'Must be at least 1 character!',
};

export const VALIDATION_RULES = {
  streetRules: /^[a-zA-Z0-9.\s]*$/,
  dateRules: dayjs().subtract(13, 'year'),
  nameRules: /^[a-zA-Z]*$/,
  postalRulesCis: /^\d{6}$/,
  postalRulesUsa: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
  postalRulesGeorgia: /^\d{4}$/,
};

export const PASSWORD_SCHEMA = yup
  .string()
  .required(VALIDATION_MESSAGES.message_required)
  .matches(PASSWORD_VALIDATION.rules_whitespaces, { message: PASSWORD_VALIDATION.message_whitespaces })
  .matches(PASSWORD_VALIDATION.rules_lowercase, { message: PASSWORD_VALIDATION.message_lowercase })
  .matches(PASSWORD_VALIDATION.rules_uppercase, { message: PASSWORD_VALIDATION.message_uppercase })
  .matches(PASSWORD_VALIDATION.rules_digit, { message: PASSWORD_VALIDATION.message_digit })
  .min(8, PASSWORD_VALIDATION.message_length);

export const getPostalCodeError = ({
  postalCode,
  countryCode,
}: {
  postalCode: string;
  countryCode: string;
}): { errorMessage: string; hasError: boolean } => {
  switch (countryCode) {
    case 'BY':
    case 'RU': {
      const rule = !VALIDATION_RULES.postalRulesCis.test(postalCode);
      return { errorMessage: VALIDATION_MESSAGES.message_postal_cis, hasError: rule };
    }
    case 'GE': {
      const rule = !VALIDATION_RULES.postalRulesGeorgia.test(postalCode);
      return { errorMessage: VALIDATION_MESSAGES.message_postal_georgia, hasError: rule };
    }
    case 'US': {
      const rule = !VALIDATION_RULES.postalRulesUsa.test(postalCode);
      return { errorMessage: VALIDATION_MESSAGES.message_postal_usa, hasError: rule };
    }
    default:
      return { errorMessage: 'We don`t this have country code', hasError: true };
  }
};
