const createFormData = (formValues: { [key: string]: any }): FormData => {
  return Object.entries(formValues).reduce((acc: FormData, [key, value]) => {
    acc.append(key, value);
    return acc;
  }, new FormData());
};

export default createFormData;
