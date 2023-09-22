import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  useState,
} from 'react';

type UseFormReturn = {
  isLoading: boolean;
  formValues: Record<string, string>;
  register: (name: string) => {
    onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    value: string;
  };
  clearForm: () => void;
  getValue: (key: string) => string;
  handleSubmit: (
    fn: (values: Record<string, string>) => void
  ) => FormEventHandler<HTMLFormElement>;
};

const useForm = (defaultValue: Record<string, string> = {}): UseFormReturn => {
  const [formValues, setFormValues] =
    useState<Record<string, string>>(defaultValue);

  const [isLoading, setIsLoading] = useState(false);

  const createOnChange =
    (name: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormValues({ ...formValues, [name]: e.target.value });
    };

  return {
    isLoading,
    formValues,
    register: (name: string) => ({
      onChange: createOnChange(name),
      value: formValues[name],
    }),
    clearForm: () => {
      setFormValues(defaultValue);
    },
    getValue: (key: string) => formValues[key],
    handleSubmit: (fn) => async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      await fn(formValues);
      setIsLoading(false);
    },
  };
};

export { useForm };
