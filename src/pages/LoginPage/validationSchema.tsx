import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailRules = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const emailMessage = 'Please type an email of correct format (e.g. example@gmail.com)!';
const passwordMassage = 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase and 1 number!';

export const schema = yup.object().shape({
  email: yup.string().required('Required field!').email(emailMessage).matches(emailRules, emailMessage),
  password: yup.string().required('Required field!').matches(passwordRules, { message: passwordMassage }),
});
