import * as yup from 'yup';

export const dataSourceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  file_path: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
