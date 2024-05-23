import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  // console.log("fieldChange field",fieldChange);
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setfile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setfile(acceptedFiles);
      fieldChange(acceptedFiles); //triggers the onChange for the form and rerender the form
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpg", ".svg", ".jpeg"],
    },
  });
  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or Drag Photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag Photo Here!
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG , PNG , JPEG</p>

          <button className="shad-button_dark_4">Select From Computer</button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
