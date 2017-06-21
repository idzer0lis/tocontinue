>Warning: Make sure you're using the latest version of Node.js and NPM

### Quick start

```bash
# clone repo and change directory to your app
$ git clone ... && cd my-app

# install the dependencies with npm && start the server
$ npm install && npm start

```
go to [http://localhost:8080](http://localhost:8080) in your browser.



## Developing

After you have installed all dependencies you can now start developing with:

* `npm start`

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The application can be checked at `http://localhost:8080`.

As an alternative, you can work using Hot Module Replacement (HMR):

* `npm run start:hmr`

You can now modify your components on the fly without having to reload the entire page.

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode (TDD style): `npm run test-watch`

#### 2. End-to-End Tests (aka. e2e, integration)

* single run:
  * in a tab, *if not already running!*: `npm start`
  * in a new tab: `npm run webdriver-start`
  * in another new tab: `npm run e2e`
* interactive mode:
  * instead of the last command above, you can run: `npm run e2e-live`
  * when debugging or first writing test suites, you may find it helpful to try out Protractor commands without starting up the entire test suite. You can do this with the element explorer.
  * you can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

## Production

To build your application, run:

* `npm run build`

You can now go to `/dist` and deploy that to your server!

## Documentation

You can generate api docs (using [TypeDoc](http://typedoc.org/)) for your code with the following:

* `npm run docs`

## Internationalization
* `npm run i18n`
It will generate xlf file, into src/public/locale/

# FAQ

#### Do I need to add script / link tags into index.html ?

No, Webpack will add all the needed Javascript bundles as script tags and all the CSS files as link tags. The advantage is that you don't need to modify the index.html every time you build your solution to update the hashes.

#### How to include external angular libraries ?

Just install the lib via npm and import it in your code when you need it. Don't forget that you need to configure some external libs in the [main.ts] of your application.

#### How to include external css files such as bootstrap.css ?

Just install the lib and import the css files in [vendor.ts] For example this is how to do it with bootstrap:

```sh
npm install bootstrap@next --save
```

And in [vendor.ts] add the following:

```ts
import 'bootstrap/dist/css/bootstrap.css';
```

# License
TDB
