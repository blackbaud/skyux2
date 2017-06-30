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

export interface SkyColorpickerOutput {
  hslaText: string;
  rgbaText: string;
  cmykText: string;
  hsva: Hsva;
  rgba: Rgba;
  hsla: Hsla;
  cmyk: Cmyk;
  hex: string;
}

interface Hsva {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
}
interface Hsla {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}
interface Rgba {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}
interface Cmyk {
  cyan: number;
  magenta: number;
  yellow: number;
  key: number;
}
