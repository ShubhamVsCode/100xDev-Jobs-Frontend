import { FormItems } from "@/app/(main)/profile/page";
import { Checkbox } from "@/components/ui/checkbox";
import FormWrapper from "./FormWrapper";
import Image from "next/image";
import ReactIcon from "/public/skills/react.png";
import { cn } from "@/lib/utils";

type stepProps = FormItems & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void;
};

const AddonsForm = ({ addOns, yearly, updateForm }: stepProps) => {
  function handleCheckboxChange(addOnId: number, checked: boolean) {
    const updatedAddOns = addOns.map((addOn) => {
      if (addOn.id === addOnId) {
        return {
          ...addOn,
          checked,
        };
      } else {
        return addOn;
      }
    });
    updateForm({ addOns: updatedAddOns });
  }

  return (
    <FormWrapper
      title="Showcase your skills"
      description="Add skills you have experience with."
    >
      <div className="grid grid-cols-3 gap-3">
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
        <div
          className={cn(
            "flex flex-col items-center border rounded-md border-black/10 p-4"
          )}
        >
          <Image src={ReactIcon} alt="React" width={50} height={50} />
          React
        </div>
      </div>
    </FormWrapper>
  );
};

export default AddonsForm;
