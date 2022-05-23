const createFormData = (formValues: { [key: string]: any }): FormData => {
  const formData = new FormData();
  Object.entries(formValues).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};

export default createFormData;
