"use client";

import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Carousel from "./carousel";
import useProjectStore from "@/store/project-store";
import { getObjectURL } from "@/lib/utils";

const ThumbnailUploader = () => {
  const { thumbnails, setNotUploadedThumbnails, setUploadedThumbnails } =
    useProjectStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setNotUploadedThumbnails([...thumbnails.notUploaded, ...acceptedFiles]);
    },
    [thumbnails]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  useEffect(() => {
    return () => {
      setNotUploadedThumbnails([]);
      setUploadedThumbnails([]);
    };
  }, []);

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
            <p>Drag & drop some files here, or click to select files</p>
            <p className="text-sm text-center text-slate-500">
              Accepted file type .jpeg & .png
            </p>
          </>
        )}
      </div>

      <div>
        <Carousel
          showArrows
          showThumbs
          imageByIndex={(index) => {
            if (index < thumbnails.uploaded?.length) {
              return getObjectURL(thumbnails.uploaded?.at(index) as string);
            } else {
              return URL.createObjectURL(
                thumbnails.notUploaded?.at(
                  index - thumbnails.uploaded?.length
                ) as File
              );
            }
          }}
          slides={Array.from(
            Array(
              Number(thumbnails.uploaded?.length || 0) +
                Number(thumbnails.notUploaded?.length || 0)
            ).keys()
          )}
          canDelete
          height="lg"
          onDelete={(index) => {
            if (index < thumbnails.uploaded?.length) {
              setUploadedThumbnails(
                thumbnails.uploaded?.filter((_, i) => i !== index) || []
              );
            }
            if (index >= thumbnails.uploaded?.length) {
              setNotUploadedThumbnails(
                thumbnails.notUploaded?.filter(
                  (_, i) => i !== index - thumbnails.uploaded?.length
                ) || []
              );
            }
          }}
        />
      </div>
    </section>
  );
};

export default ThumbnailUploader;
