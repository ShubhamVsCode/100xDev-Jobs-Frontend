import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  preText: string;
  wrapperClassName?: string;
}

const InputWithText = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, preText, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center px-2 h-12 w-full rounded-md border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          wrapperClassName
        )}
      >
        <span>{preText}</span>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

InputWithText.displayName = "Input";
export { InputWithText };
