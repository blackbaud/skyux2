declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

export class SkyDemoPageCodeFile {
  public readonly language: string;

  public codeFormatted: string;

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

    this.codeFormatted = Prism.highlight(
      this.code,
      Prism.languages[this.language]
    );
  }
}
