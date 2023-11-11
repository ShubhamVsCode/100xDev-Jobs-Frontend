import FormWrapper from "./FormWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormItems } from "@/app/(main)/profile/page";
import { UploadDropzone, Uploader } from "@/utils/uploadthing";
import { useState } from "react";
import { cn } from "@/lib/utils";

type StepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
  errors: Partial<FormItems>;
};

const UserInfoForm = ({
  name,
  email,
  username,
  errors,
  updateForm,
}: StepProps) => {
  const [tempProfilePicture, setTempProfilePicture] = useState("");

  return (
    <FormWrapper
      title="Personal info"
      description="Your name, username and email address."
    >
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-5">
            {tempProfilePicture && (
              <img
                src={tempProfilePicture}
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
                !tempProfilePicture && "col-span-full"
              )}
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                if (res && res?.at(0)?.url) {
                  updateForm({ profilePicture: res[0].url });
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
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full "
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
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
            onChange={(e) => updateForm({ email: e.target.value })}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
            onChange={(e) => updateForm({ username: e.target.value })}
            required
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  );
};

export default UserInfoForm;
