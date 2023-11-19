"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Carousel from "./carousel";

const ThumbnailUploader = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <section>
      <div
        {...getRootProps()}
        className="min-h-[18rem] border grid place-content-center rounded-md border-dashed cursor-pointer"
      >
        <input {...getInputProps()} accept="image/*" />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <p>Drag 'n' drop some files here, or click to select files</p>
            <p className="text-sm text-center text-slate-500">
              Accepted file type .jpeg & .png
            </p>
          </>
        )}
      </div>

      <div>
        <Carousel
          // showArrows
          imageByIndex={(index) => URL.createObjectURL(files[index])}
          slides={Array.from(Array(files.length).keys())}
          // canDelete
          // onDelete={(index) => {
          //   const newFiles = [...files];
          //   newFiles.splice(index, 1);
          //   setFiles(newFiles);
          // }}
        />
      </div>
    </section>
  );
};

export default ThumbnailUploader;
