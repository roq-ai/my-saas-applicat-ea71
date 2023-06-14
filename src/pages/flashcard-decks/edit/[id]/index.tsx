import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getFlashcardDeckById, updateFlashcardDeckById } from 'apiSdk/flashcard-decks';
import { Error } from 'components/error';
import { flashcardDeckValidationSchema } from 'validationSchema/flashcard-decks';
import { FlashcardDeckInterface } from 'interfaces/flashcard-deck';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { LearningGroupInterface } from 'interfaces/learning-group';
import { UserInterface } from 'interfaces/user';
import { getLearningGroups } from 'apiSdk/learning-groups';
import { getUsers } from 'apiSdk/users';

function FlashcardDeckEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<FlashcardDeckInterface>(
    () => (id ? `/flashcard-decks/${id}` : null),
    () => getFlashcardDeckById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FlashcardDeckInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFlashcardDeckById(id, values);
      mutate(updated);
      resetForm();
      router.push('/flashcard-decks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<FlashcardDeckInterface>({
    initialValues: data,
    validationSchema: flashcardDeckValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Flashcard Deck
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
              {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
            </FormControl>
            <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
              <FormLabel>Description</FormLabel>
              <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
              {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
            </FormControl>
            <FormControl id="image" mb="4" isInvalid={!!formik.errors?.image}>
              <FormLabel>Image</FormLabel>
              <Input type="text" name="image" value={formik.values?.image} onChange={formik.handleChange} />
              {formik.errors.image && <FormErrorMessage>{formik.errors?.image}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<LearningGroupInterface>
              formik={formik}
              name={'learning_group_id'}
              label={'Select Learning Group'}
              placeholder={'Select Learning Group'}
              fetcher={getLearningGroups}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'content_creator_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'flashcard_deck',
  operation: AccessOperationEnum.UPDATE,
})(FlashcardDeckEditPage);
