import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getObjectURL(objectKey: string) {
  return `https://100xdev-jobs.s3.ap-south-1.amazonaws.com/${objectKey}`;
}
