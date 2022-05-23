const postRequest = async (url: string, formValues: { [key: string]: any }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`,
      {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export default postRequest;
