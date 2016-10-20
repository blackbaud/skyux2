declare let Prism: any;
import 'prismjs/prism';
import 'prismjs/components/prism-typescript';

export class SkyDemoPageCodeFile {
  public readonly code: string;

  public readonly language: string;

  public codeFormatted: string;

  constructor(folder: string, public readonly name: string) {
    let fileNameParts = name.split('.');

    switch (fileNameParts[fileNameParts.length - 1]) {
      case 'ts':
        this.language = 'typescript';
        break;
      default:
        this.language = 'markup';
    }

    this.code = require(`!!raw!../components/${folder}/${name}`);

    this.codeFormatted = Prism.highlight(
      this.code,
      Prism.languages[this.language]
    );
  }
}
