// spell-checker:ignore Colorpicker, HSVA, HSLA, CMYK
export interface SkyColorpickerChangeAxis {
  yAxis?: number;
  xAxis?: number;
  xCoordinate?: number;
  yCoordinate?: number;
  maxRange?: number;
}

export interface SkyColorpickerChangeColor {
  color: string;
  colorValue: number;
  maxRange: number;
}
