import * as yup from 'yup';

export const flashcardDeckValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  image: yup.string(),
  learning_group_id: yup.string().nullable().required(),
  content_creator_id: yup.string().nullable().required(),
});
