import * as yup from 'yup';
import { PASSWORD_SCHEMA } from '../../utils/validation';

export const schemaPassword = yup.object().shape({
  currentPassword: PASSWORD_SCHEMA,
  newPassword: PASSWORD_SCHEMA,
  confirmPassword: yup
    .string()
    .required('Retype your password!')
    .oneOf([yup.ref('newPassword')], 'Your passwords do not match.'),
});
export type SchemaTypePassword = yup.InferType<typeof schemaPassword>;
