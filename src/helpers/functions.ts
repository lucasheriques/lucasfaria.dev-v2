import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

export const range = (start: number, end?: number, step = 1) => {
  let output = [];
  if (!end) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end!; i += step) {
    output.push(i);
  }
  return output;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
