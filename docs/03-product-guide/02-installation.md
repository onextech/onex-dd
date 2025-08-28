# Installation
Our apps are built with NextJS. The following steps outline the steps required to run or build a NextJS application.

### Pre-requisites:

- [ ]  [**Node**](https://nodejs.org/en/) `LTS`
- [ ]  [**Yarn:**](https://classic.yarnpkg.com/en/docs/install) `npm install -g yarn`

### Installation
For more details, refer to the NextJS docs.

1. To **install dependencies**: `yarn install`
2. To **run the development server**: `yarn dev`
3. To **run the production server**: `yarn build && yarn start`

:::note
💡 Use the correct dependency manager when installing your dependencies to ensure your build works as intended. As a rule of thumb, in JavaScript apps, if you see a `yarn.lock` file, use `yarn install`; if you see a `package-lock.json` file, use `npm install`.
:::

:::tip
💡 At this point, your local app should be ready at [http://localhost:3000](http://localhost:3000)
:::

### Getting to a passing build

Before handover, we verify that the source code provided to you generates a passing build. If you’re unable to get to a successful build, kindly ensure that you’re using the correct dependency manager and installing the dependency versions listed in your package.json file.

Avoid making major upgrades to your app’s dependencies e.g. React 17 → 18 as this will most likely cause your build to fail. The dependency lock files are meant to ensure that your versions stay locked, so use it well.
