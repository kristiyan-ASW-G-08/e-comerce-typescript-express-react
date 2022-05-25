import { FC } from 'react';

interface FormButtonProps {
  content: string;
  isSubmitting: boolean;
}
const FormButton: FC<FormButtonProps> = ({ content, isSubmitting }) => {
  return (
    <button
      type="submit"
      className="bg-red-400 hover:bg-red-700 text-neutral-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
       flex space-x-3 items-center"
    >
      {isSubmitting ? (
        <>
          <span
            className="animate-spin inline-block w-4 h-4  rounded-full border-l-neutral-500 border-2 "
            role="status"
          ></span>
          <p>Submitting</p>
        </>
      ) : (
        content
      )}
    </button>
  );
};
export default FormButton;
