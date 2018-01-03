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
      case 'scss':
        this.language = 'scss';
        break;
      case 'ts':
        this.language = 'typescript';
        break;
      default:
        this.language = 'markup';
    }

    // This changes the imports from using the relative path to displaying the SKY UX 2 npm path
    let modifiedCode = this.code.replace(/\.\.\/\.\.\/\.\.\/core/g, '@blackbaud/skyux/dist/core');
    modifiedCode = modifiedCode.replace(/\.\.\/\.\.\/core/g, '@blackbaud/skyux/dist/core');
    this.codeImports = modifiedCode;
  }
}
