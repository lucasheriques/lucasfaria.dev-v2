import React from "react";
import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  Label,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

import { cn } from "@/helpers/functions";

type SliderProps<T extends number | number[]> = {
  label?: React.ReactNode;
  layout?: "horizontal" | "vertical";
  defaultValue?: T;
  value?: T;
} & AriaSliderProps<T>;

export default function Slider<T extends number | number[]>({
  label,
  layout = "vertical",
  defaultValue,
  value,
  minValue = 1,
  maxValue = 10,
  onChange,
  onChangeEnd,
  isDisabled,
  ...rest
}: SliderProps<T>) {
  return (
    <AriaSlider<T>
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      onChangeEnd={onChangeEnd}
      minValue={minValue}
      maxValue={maxValue}
      isDisabled={isDisabled}
      className={cn(
        "flex w-60 font-sans text-sm",
        layout === "horizontal" ? "flex-row items-center gap-4" : "flex-col",
      )}
      {...rest}
    >
      <div className="flex">
        {label ? <Label className="flex-1">{label}</Label> : null}
        <SliderOutput />
      </div>
      <SliderTrack className="relative h-6 w-full">
        {({ state }) => (
          <>
            {/* track */}
            <div className="absolute top-[50%] h-1.5 w-full translate-y-[-50%] rounded-full bg-gray-300" />
            {/* fill */}
            <div
              className="absolute top-[50%] h-1.5 translate-y-[-50%] rounded-full bg-emerald-400"
              style={{ width: state.getThumbPercent(0) * 100 + "%" }}
            />
            <SliderThumb className="top-[50%] h-5 w-5 rounded-full border border-solid border-emerald-800/75 bg-white outline-none ring-black transition focus-visible:ring-2 dragging:bg-emerald-100" />
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
