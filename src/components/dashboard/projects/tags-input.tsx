import { cn } from "@/lib/utils";
import { Listbox } from "@headlessui/react";
import { Check } from "lucide-react";
import { useState } from "react";

const tags = [
  { id: 1, label: "React Js" },
  { id: 2, label: "Next Js" },
  { id: 3, label: "Javascript" },
  { id: 4, label: "Typescript" },
  { id: 5, label: "AWS S3" },
  { id: 6, label: "AWS EC2" },
  { id: 7, label: "Docker" },
];

const TagInput = () => {
  const [selectedItem, setSelectedItem] = useState<typeof tags>([]);

  return (
    <Listbox value={selectedItem} onChange={setSelectedItem} multiple>
      <Listbox.Button
        className={cn(
          "flex min-h-[2.5rem] w-full text-left rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        )}
      >
        {selectedItem.map((item) => item?.label).join(", ")}
      </Listbox.Button>
      <Listbox.Options
        className={
          "absolute z-50 min-w-[10rem] px-2 py-1 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        }
      >
        {tags.map((item) => (
          <Listbox.Option
            key={item.id}
            value={item}
            className={
              "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            }
          >
            {selectedItem.includes(item) && (
              <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                <Check className="h-4 w-4" />
              </span>
            )}
            {item.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default TagInput;
