import * as yup from 'yup';
import { emailMessage, passwordMassage, emailRules, passwordRules } from '../../utils/inputRules';

export const schemaLogin = yup.object().shape({
  email: yup.string().required('Required field!').email(emailMessage).matches(emailRules, emailMessage),
  password: yup.string().required('Required field!').matches(passwordRules, { message: passwordMassage }),
});
