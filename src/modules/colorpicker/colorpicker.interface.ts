// spell-checker:ignore Colorpicker, HSVA, HSLA
export interface SkyColorpickerOutput {
  hex: string;
  rgba?: RGBA;
  hsla?: HSLA;
  hsva?: HSVA;
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
