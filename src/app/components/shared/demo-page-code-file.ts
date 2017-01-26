declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

export class SkyDemoPageCodeFile {
  public readonly language: string;

  public codeFormatted: string;

  public codeImports: string;

  constructor(
    public readonly name: string,
    public readonly code: string,
    public readonly componentName: string,
    public readonly bootstrapSelector: string
  ) {
    let fileNameParts = name.split('.');

    switch (fileNameParts[fileNameParts.length - 1]) {
      case 'ts':
        this.language = 'typescript';
        break;
      default:
        this.language = 'markup';
    }
    this.codeImports = this.code.replace(/\.\.\/\.\.\/\.\.\/core/g, '@blackbaud/skyux/dist/core');

    this.codeFormatted = Prism.highlight(
      this.codeImports,
      Prism.languages[this.language]
    );
  }
}
