// spell-checker:ignore hsva,hsla,cmyk
export class Hsva {
  constructor(
    public hue: number,
    public saturation: number,
    public value: number,
    public alpha: number) { }
}
export class Hsla {
  constructor(
    public hue: number,
    public saturation: number,
    public lightness: number,
    public alpha: number) { }
}
export class Rgba {
  constructor(
    public red: number,
    public green: number,
    public blue: number,
    public alpha: number) { }
}

export class Cmyk {
  constructor(
    public cyan: number,
    public magenta: number,
    public yellow: number,
    public key: number
  ) { }
}
export class SliderPosition {
  constructor(
    public hue: number,
    public saturation: number,
    public value: number,
    public alpha: number) { }
}
export class SliderDimension {
  constructor(
    public hue: number,
    public saturation: number,
    public value: number,
    public alpha: number) { }
}

export class SkyColorpickerOutput {
  constructor(
    public local: string,
    public hsva: Hsva,
    public rgba: Rgba,
    public hsla: Hsla,
    public cmyk: Cmyk,
    public hex: string
  ) { }
}
