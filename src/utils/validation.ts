export const EMAIL_VALIDATION = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Please type an email of correct format (e.g. example@gmail.com)!',
};

export const PASSWORD_VALIDATION = {
  rules_uppercase: /(?=.*[A-Z])/,
  rules_lowercase: /(?=.*[a-z])/,
  rules_digit: /\d/,
  message_uppercase: 'Must contain at least one uppercase letter!',
  message_lowercase: 'Must contain at least one lowercase letter!',
  message_digit: 'Must contain at least one digit!',
  message_length: 'Password must be at least 8 characters long!',
};

export const VALIDATION_MESSAGES = {
  message_latin: 'Must only contain latin characters!',
  message_required: 'Required field!',
  message_street: 'Street name can only have latin characters, dots, numbers and whitespaces!',
  message_postal: 'Postal code can only contain 6 numbers!',
};
