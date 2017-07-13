/* tslint:disable max-line-length */

import { Injectable } from '@angular/core';

import { SkyDemoPageCodeFile } from './demo-page-code-file';

@Injectable()
export class SkyDemoPagePlunkerService {
  public getFiles(codeFiles: SkyDemoPageCodeFile[]): any[] {
    let declarations: string[] = [];
    let bootstrapSelectors: string[] = [];
    let entryComponents: string[] = [];
    let files: any[] = [];
    let imports: string[] = [];

    for (let codeFile of codeFiles) {
      files.push({
        name: codeFile.name,
        content: codeFile.codeImports
      });

      let componentName = codeFile.componentName;

      if (componentName) {
        imports.push(
          `import { ${componentName} } from './${codeFile.name}';`
        );

        declarations.push(componentName);

        if (codeFile.bootstrapSelector) {
          bootstrapSelectors.push(codeFile.bootstrapSelector);
        } else {
          entryComponents.push(componentName);
        }
      }
    }

    let combinedSelectors = '';
    bootstrapSelectors.forEach((item) => {
      combinedSelectors += '<' + item + '></' + item + '>';
    });

    return [
      ...files,
      {
        name: 'config.js',
        content:
`System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  //map tells the System loader where to look for things
  map: {

    'app': '.',

    '@angular/core': 'npm:@angular/core@4.2.5/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common@4.2.5/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler@4.2.5/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser@4.2.5/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@4.2.5/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http@4.2.5/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router@4.2.5/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms@4.2.5/bundles/forms.umd.js',
    '@angular/animations': 'npm:@angular/animations@4.2.5/bundles/animations.umd.js',
    '@angular/platform-browser/animations': 'npm:@angular/platform-browser@4.2.5/bundles/platform-browser-animations.umd.js',
    '@angular/animations/browser': 'npm:@angular/animations@4.2.5/bundles/animations-browser.umd.js',
    'tslib': 'npm:tslib@1.6.1',

    'rxjs': 'npm:rxjs',
    'typescript': 'npm:typescript@2.2.1/lib/typescript.js',
    '@blackbaud/skyux/dist/core': 'npm:@blackbaud/skyux/dist/bundles/core.umd.js',

    'moment': 'npm:moment/moment.js',

    'microedge-rxstate/dist': 'npm:microedge-rxstate/dist/index.js',

    //dragula packages
    'ng2-dragula/ng2-dragula': 'npm:ng2-dragula',
    'dragula': 'npm:dragula',
    'contra': 'npm:contra',
    'atoa': 'npm:atoa',
    'ticky': 'npm:ticky',
    'crossvent': 'npm:crossvent/src',
    'custom-event': 'npm:custom-event'
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    '@blackbaud/skyux/dist/core': {
       format: 'cjs'
     },
    'ng2-dragula/ng2-dragula': {
      main: 'ng2-dragula.js',
      defaultExtension: 'js'

    },
    'dragula': { main: 'dragula.js', defaultExtension: 'js' },
    'contra': { main: 'contra.js', defaultExtension: 'js' },
    'atoa': { main: 'atoa.js', defaultExtension: 'js' },
    'ticky': { main: 'ticky.js', defaultExtension: 'js' },
    'crossvent': { main: 'crossvent.js', defaultExtension: 'js' },
    'custom-event': { main: 'index.js', defaultExtension: 'js' },
  }
});`
      },
      {
        name: 'index.html',
        content:
`<!DOCTYPE html>
<html>

  <head>
    <base href="." />
    <title>SKY UX 2 Demo</title>
    <link rel="stylesheet" href="https://unpkg.com/@blackbaud/skyux/dist/css/sky.css" />
    <link rel="stylesheet" href="style.css" />
    <script src="https://unpkg.com/core-js@2.4.1/client/shim.min.js"></script>
    <script src="https://unpkg.com/zone.js@0.8.10/dist/zone.js"></script>
    <script src="https://unpkg.com/zone.js/dist/long-stack-trace-zone.js"></script>
    <script src="https://unpkg.com/reflect-metadata@0.1.3/Reflect.js"></script>
    <script src="https://unpkg.com/systemjs@0.19.31/dist/system.js"></script>
    <script src="config.js"></script>
    <script>
    System.import('app')
      .catch(console.error.bind(console));
  </script>
  </head>

  <body>
    <sky-demo-app>
      loading...
    </sky-demo-app>
  </body>

</html>
`
      },
      {
        name: 'style.css',
        content: '/* Styles go here */'
      },
      {
        name: 'app.component.ts',
        content:
`import { Component } from '@angular/core';

@Component({
  selector: 'sky-demo-app',
  template: '${combinedSelectors}'
})
export class AppComponent() { }`
      },
      {
        name: 'main.ts',
        content:
`
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SkyModule } from '@blackbaud/skyux/dist/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

${imports.join('\n')}

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    SkyModule
  ],
  declarations: [
    AppComponent,
    ${declarations.join(',\n')}
  ],
  entryComponents: [
    ${entryComponents.join(',\n')}
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);`
      }
    ];
  }
}
