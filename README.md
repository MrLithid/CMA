This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

![Preview](doc/images/preview.png)

## Setup

Uses python 3.8.3, supports `pyenv`
Uses node 12.8.0 supports `nodenv`

```
npm install
npm run generate:collection
npm run start
```

React is smart enough so if you start the server before generating the collection you can just generate the collection and it will notice the filesystem change.


## Available Scripts

In the project directory, you can run:

### `npm run generate:collection`

Generates a collection of image data objects from `lib/CMA-test/cma-artworks.db` in json format.<br />
This collection is stored under `src/json/collection.json`

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
