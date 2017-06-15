// spell-checker:ignore Colorpicker, HSVA, HSLA
export interface SkyColorpickerOutput {
  hex: string;
  rgba?: RGBA;
  hsla?: HSLA;
  hsva?: HSVA;
}

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

interface HSVA {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}

interface HSLA {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

interface RGBA {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
