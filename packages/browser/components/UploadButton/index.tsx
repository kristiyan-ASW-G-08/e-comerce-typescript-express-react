import React, { FC, SyntheticEvent, useState, useRef } from 'react';
import Image from 'next/image';
import { ErrorMessage } from 'formik';
import getFile from 'utilities/getFile';
import clickHandler from './clickHandler';

interface UploadButtonProps {
  name: string;
  setFieldValue: (name: string, value: File) => any;
}

export const UploadButton: FC<UploadButtonProps> = ({
  name,
  setFieldValue,
}) => {
  const [fileUrl, setFileUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    //@ts-ignore
    const { file, fileUrl } = getFile(e);
    setFileUrl(fileUrl);
    setFieldValue(name, file);
  };
  return (
    <div>
      {fileUrl ? <img className="h-28 w-24 " src={fileUrl} alt="" /> : ''}
      <input
        data-testid="file-input"
        ref={inputRef}
        name={name}
        type="file"
        onChange={uploadHandler}
        hidden
      />
      <button
        className={
          'text-red-400  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        }
        type="button"
        onClick={() => clickHandler(inputRef)}
      >
        Upload
      </button>
      <ErrorMessage
        className="text-red-400 text-xs italic"
        component="label"
        name={name}
      />
    </div>
  );
};

export default UploadButton;
