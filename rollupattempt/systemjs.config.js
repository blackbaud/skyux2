/** Add Transpiler for Typescript */
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    }
  }
});
/** Add Transpiler for Typescript */
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  packages: {
    '.': {
      defaultExtension: 'ts'
    },
    '../node_modules': {
      defaultExtension: 'js'
    }
  }
});

System.config({
  map: {
    'rxjs': '../node_modules/rxjs',
    'main': 'main.js',
    // Angular specific mappings.
   'skyux/core': '../dist/packages-dist/core/bundles',
   '@angular/core': '../node_modules/@angular/core/bundles/core.umd.js',
  '@angular/common': '../node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': '../node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/http': '../node_modules/@angular/http/bundles/http.umd.js',
    '@angular/forms': '../node_modules/@angular/forms/bundles/forms.umd.js',
    '@angular/router': '../node_modules/@angular/router/bundles/router.umd.js',
    '@angular/platform-browser': '../node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': '../node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'ng2-dragula/ng2-dragula': '../node_modules/ng2-dragula',
    'dragula': '../node_modules/dragula',
    'contra': '../node_modules/contra',
    'atoa': '../node_modules/atoa',
    'ticky': '../node_modules/ticky',
    'crossvent': '../node_modules/crossvent/src',
    'custom-event': '../node_modules/custom-event'
  },
  packages: {
    // Thirdparty barrels.
    'rxjs': { main: 'index' },
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
     'skyux/core': {
       format: 'cjs',
       main: 'core.umd.js'
     }
  }
});
