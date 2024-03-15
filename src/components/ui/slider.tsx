import React from "react";
import {
  Slider as AriaSlider,
  Label,
  SliderOutput,
  SliderThumb,
  SliderTrack,
} from "react-aria-components";

type SliderProps = {
  label?: React.ReactNode;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
};

export default function Slider({
  label,
  defaultValue = 1,
  minValue = 1,
  maxValue = 10,
  onChange,
}: SliderProps) {
  return (
    <AriaSlider
      defaultValue={defaultValue}
      onChange={onChange}
      minValue={minValue}
      maxValue={maxValue}
      className="w-60 font-sans text-base"
    >
      <div className="flex">
        {label ? <Label className="flex-1">{label}</Label> : null}
        <SliderOutput />
      </div>
      <SliderTrack className="relative h-7 w-full">
        {({ state }) => (
          <>
            {/* track */}
            <div className="absolute top-[50%] h-2 w-full translate-y-[-50%] rounded-full bg-gray-300" />
            {/* fill */}
            <div
              className="absolute top-[50%] h-2 translate-y-[-50%] rounded-full bg-emerald-400"
              style={{ width: state.getThumbPercent(0) * 100 + "%" }}
            />
            <SliderThumb className="top-[50%] h-5 w-5 rounded-full border border-solid border-emerald-800/75 bg-white outline-none ring-black transition focus-visible:ring-2 dragging:bg-emerald-100" />
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
}
