import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { FANTASY_NAME_SERVICES } from "@/helpers/constants";

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

export function getNewService(currentServices: string[]) {
  // Find a service name that is not already in currentServices
  const availableServices = FANTASY_NAME_SERVICES.filter(
    (service) => !currentServices.includes(service),
  );

  if (availableServices.length === 0) {
    return "last-mission-service";
  }

  // Optionally, you can randomize the selection from the remaining services
  const randomIndex = Math.floor(Math.random() * availableServices.length);
  return availableServices[randomIndex];
}
