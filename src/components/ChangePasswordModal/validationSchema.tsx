import * as yup from 'yup';
import { PASSWORD_SCHEMA } from '../../utils/validation';

export const schemaPassword = yup.object().shape({
  currentPassword: PASSWORD_SCHEMA,
  newPassword: PASSWORD_SCHEMA,
});
export type SchemaTypePassword = yup.InferType<typeof schemaPassword>;
