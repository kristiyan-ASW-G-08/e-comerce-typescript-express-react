const postRequest = async (
  url: string,
  formValues: { [key: string]: any },
  token = '',
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`,
      {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export default postRequest;
