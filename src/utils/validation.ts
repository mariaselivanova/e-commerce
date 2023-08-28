import dayjs from 'dayjs';

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
  dateRules: dayjs().subtract(13, 'year'),
  nameRules: /^[a-zA-Z]*$/gi,
};
