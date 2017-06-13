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
export class SliderPosition {
  constructor(
    public hue: number,
    public saturation: number,
    public v: number,
    public alpha: number) { }
}
export class SliderDimension {
  constructor(
    public hue: number,
    public saturation: number,
    public value: number,
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
