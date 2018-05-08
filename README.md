# RestGrid

[![Build Status](https://api.travis-ci.org/sarbull/rest-grid-old.svg?branch=master)](https://travis-ci.org/sarbull/rest-grid-old)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Example
```html
<rg-rest-grid [endpoint]="endpoint" (onActionClick)="onActionClick($event)"></rg-rest-grid>
```

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'rg-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  endpoint: String = '/api/elements';

  onActionClick(data): void {
    console.log('parent', data);
  }
}
```


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

# Documentation

## Filtering

| Types              | Description                             |
|:------------------ |:--------------------------------------- |
| numberColumnFilter | A Number Filter for number comparisons. |
| textColumnFilter   | A Text Filter for string comparisons.   |
| dateColumnFilter   | A Date Filter for date comparisons.     |
| setColumnFilter    | A set of data filter type.              |

## Sorting

|  Types             | Description                |
|:------------------ |:-------------------------- |
| numberComparator   | Sorting for numbers.       |
| textComparator     | Sorting for strings.       |
| dateComparator     | Sorting for date entities. |

## Current "tree -I node_modules"
```
.
 |-- README.md
 |-- api
 |   |-- elements
 |   |   |-- data.json
 |   |   `-- grid.json
 |   `-- index.js
 |-- coverage
 |   |-- base.css
 |   |-- block-navigation.js
 |   |-- index.html
 |   |-- lcov.info
 |   |-- prettify.css
 |   |-- prettify.js
 |   |-- sort-arrow-sprite.png
 |   |-- sorter.js
 |   `-- src
 |       |-- components
 |       |   |-- app
 |       |   |   |-- app.component.ts.html
 |       |   |   |-- app.module.ts.html
 |       |   |   `-- index.html
 |       |   `-- rest-grid
 |       |       |-- contextual-menu
 |       |       |   |-- contextual-menu.component.ts.html
 |       |       |   |-- contextual-menu.module.ts.html
 |       |       |   `-- index.html
 |       |       |-- filters
 |       |       |   |-- date
 |       |       |   |   |-- date.filter.ts.html
 |       |       |   |   `-- index.html
 |       |       |   |-- number
 |       |       |   |   |-- index.html
 |       |       |   |   `-- number.filter.ts.html
 |       |       |   `-- string
 |       |       |       |-- index.html
 |       |       |       `-- string.filter.ts.html
 |       |       |-- index.html
 |       |       |-- rest-grid-data.service.ts.html
 |       |       |-- rest-grid.component.ts.html
 |       |       `-- rest-grid.module.ts.html
 |       |-- index.html
 |       |-- polyfills.ts.html
 |       `-- test.ts.html
 |-- docs
 |   |-- CNAME
 |   `-- index.html
 |-- e2e
 |   |-- app.e2e-spec.ts
 |   |-- app.po.ts
 |   `-- tsconfig.e2e.json
 |-- karma.conf.js
 |-- package-lock.json
 |-- package.json
 |-- protractor.conf.js
 |-- proxy.conf.json
 |-- src
 |   |-- assets
 |   |-- components
 |   |   |-- app
 |   |   |   |-- app.component.html
 |   |   |   |-- app.component.spec.ts
 |   |   |   |-- app.component.ts
 |   |   |   `-- app.module.ts
 |   |   `-- rest-grid
 |   |       |-- contextual-menu
 |   |       |   |-- contextual-menu.component.html
 |   |       |   |-- contextual-menu.component.ts
 |   |       |   `-- contextual-menu.module.ts
 |   |       |-- filters
 |   |       |   |-- date
 |   |       |   |   |-- date.filter.css
 |   |       |   |   |-- date.filter.html
 |   |       |   |   `-- date.filter.ts
 |   |       |   |-- number
 |   |       |   |   |-- number.filter.css
 |   |       |   |   |-- number.filter.html
 |   |       |   |   `-- number.filter.ts
 |   |       |   `-- string
 |   |       |       |-- string.filter.css
 |   |       |       |-- string.filter.html
 |   |       |       `-- string.filter.ts
 |   |       |-- options
 |   |       |   `-- grid-options.interface.ts
 |   |       |-- rest-grid-data.component.spec.ts
 |   |       |-- rest-grid-data.service.ts
 |   |       |-- rest-grid.component.html
 |   |       |-- rest-grid.component.ts
 |   |       `-- rest-grid.module.ts
 |   |-- environments
 |   |   |-- environment.prod.ts
 |   |   `-- environment.ts
 |   |-- favicon.ico
 |   |-- index.html
 |   |-- main.ts
 |   |-- polyfills.ts
 |   |-- styles.scss
 |   |-- test.ts
 |   |-- tsconfig.app.json
 |   |-- tsconfig.spec.json
 |   `-- typings.d.ts
 |-- tree.txt
 |-- tsconfig.json
 `-- tslint.json
 
 26 directories, 77 files
```
