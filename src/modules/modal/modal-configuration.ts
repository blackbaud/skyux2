import { Injectable } from '@angular/core';

@Injectable()
export class SkyModalConfiguration {

  public fullPage: boolean;
  public size: string;

  constructor() {
    this.fullPage = this.fullPage;
    this.size = 'medium';
  }
}
