import * as yup from 'yup';

export const groupMemberValidationSchema = yup.object().shape({
  role: yup.string().required(),
  user_id: yup.string().nullable().required(),
  learning_group_id: yup.string().nullable().required(),
});
