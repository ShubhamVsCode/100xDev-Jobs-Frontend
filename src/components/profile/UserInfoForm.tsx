import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone, Uploader } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/user-store";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ProfileType } from "@/lib/validations/auth";

type StepProps = {
  updateForm: UseFormSetValue<ProfileType>;
  getValues: UseFormGetValues<ProfileType>;
};

const UserInfoForm = ({ updateForm, getValues }: StepProps) => {
  const [tempProfilePicture, setTempProfilePicture] = useState(
    getValues("picture")
  );

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
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-5">
            {(getValues("picture") || tempProfilePicture) && (
              <img
                src={tempProfilePicture || getValues("picture")}
                alt="Profile Picture"
                className="w-full h-full object-cover rounded-md "
              />
            )}
            <UploadDropzone
              content={{
                label: "Drag & Drop / Choose your profile picture",
              }}
              endpoint="imageUploader"
              className={cn(
                "border dark:border-white/20 mt-0",
                !(getValues("picture") || tempProfilePicture) && "col-span-full"
              )}
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                if (res && res?.at(0)?.url) {
                  updateForm("picture", res[0].url);
                  setTempProfilePicture(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
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
