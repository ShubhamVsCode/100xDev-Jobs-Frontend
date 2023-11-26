import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/user-store";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ProfileType } from "@/lib/validations/auth";
import { useDropzone } from "react-dropzone";
import { getObjectURL } from "@/lib/utils";
import { Button } from "../ui/button";
import UploadAPI from "@/api/upload";

type StepProps = {
  updateForm: UseFormSetValue<ProfileType>;
  getValues: UseFormGetValues<ProfileType>;
};

const UserInfoForm = ({ updateForm, getValues }: StepProps) => {
  const [profilePicture, setProfilePicture] = useState<{
    uploaded: string | null;
    notUploaded: File | null;
  }>({
    uploaded: getValues("picture") || null,
    notUploaded: null,
  });

  useEffect(() => {
    if (!getValues("picture")) return;
    setProfilePicture((prev) => ({
      ...prev,
      uploaded: getValues("picture")!,
    }));
  }, [getValues("picture")]);

  const onUpload = useCallback(async () => {
    if (!profilePicture?.notUploaded) return;
    console.log("Uploading...");

    try {
      const { objectKey, url } = await UploadAPI.uploadFile(
        profilePicture.notUploaded.name,
        "profile-picture"
      );
      await UploadAPI.uploadOnS3(url, profilePicture.notUploaded);
      setProfilePicture({
        uploaded: objectKey,
        notUploaded: null,
      });
      updateForm("picture", objectKey);
    } catch (error) {
      console.log(error);
    }
  }, [profilePicture]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setProfilePicture((prev) => ({
      ...prev,
      notUploaded: acceptedFiles[0],
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  const { user } = useUserStore();

  if (!user) {
    return;
  }
  const { name, email, username } = user;
  return (
    <FormWrapper
      title="Personal info"
      description="Your name, username and email address."
    >
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-2 h-60">
          <div className="grid grid-cols-2 gap-5 h-full relative">
            {(profilePicture.notUploaded || profilePicture.uploaded) && (
              <img
                src={
                  profilePicture.notUploaded
                    ? URL.createObjectURL(profilePicture.notUploaded)
                    : getObjectURL(profilePicture.uploaded as string)
                }
                alt="Profile Picture"
                className="object-cover w-full rounded-md max-h-60"
              />
            )}

            <div
              className={cn(
                profilePicture.notUploaded || profilePicture.uploaded
                  ? "col-span-1"
                  : "col-span-full"
              )}
            >
              <div
                {...getRootProps()}
                className={cn(
                  "h-full border grid place-content-center rounded-md border-dashed cursor-pointer"
                )}
              >
                <input {...getInputProps()} accept="image/*" />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    <p>Drag & drop here, or click to select file</p>
                    <p className="text-sm text-center text-slate-500">
                      Accepted file type .jpeg & .png
                    </p>
                  </>
                )}
              </div>
              {profilePicture.notUploaded && (
                <Button
                  type="button"
                  variant="secondary"
                  className="relative bottom-10 w-full rounded-t-none"
                  onClick={onUpload}
                >
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={name}
            className="w-full "
            required
            disabled
          />
          {/* {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} */}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="text"
            name="email"
            id="email"
            placeholder="e.g. stephenking@lorem.com"
            value={email}
            className="w-full "
            required
            disabled
          />
          {/* {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )} */}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="e.g. +1 234 567 890"
            value={username}
            className="w-full "
            required
            disabled
          />
          {/* {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )} */}
        </div>
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
