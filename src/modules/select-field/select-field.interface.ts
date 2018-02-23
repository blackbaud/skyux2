export interface SkySelectFieldListItems {
  id: string;
  label: string;
  description: string;
  category: string;
}

export interface SkySelectFieldOutput extends Array<SkySelectFieldListItems> { }
