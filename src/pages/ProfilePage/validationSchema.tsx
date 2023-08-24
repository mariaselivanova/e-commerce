import * as yup from 'yup';
import dayjs from 'dayjs';

import { VALIDATION_MESSAGES } from '../../utils/validation';

const dateRules = dayjs().subtract(13, 'year');
const nameRules = /^[a-zA-Z]*$/gi;

const minMessage = 'Must be at least 1 character!';

export const schema = yup.object().shape({
  firstname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  lastname: yup.string().required(VALIDATION_MESSAGES.message_required).min(1, minMessage).matches(nameRules, VALIDATION_MESSAGES.message_latin),
  date: yup
    .date()
    .nullable()
    .typeError('Please type date of a correct format!')
    .required(VALIDATION_MESSAGES.message_required)
    .max(dateRules, 'You must be at least 13 years old to register!'),
});

export type SchemaType = yup.InferType<typeof schema>;
