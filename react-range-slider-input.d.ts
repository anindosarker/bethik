declare module "react-range-slider-input" {
  import * as React from "react";

  export interface RangeSliderProps {
    min: number;
    max: number;
    step?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    id?: string;
    onInput?: (value: [number, number], userInteraction: boolean) => void;
  }

  export default class RangeSlider extends React.Component<RangeSliderProps> {}
}
