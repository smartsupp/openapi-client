# smartsupp-backend-shared

Shared library for backend repositories.

## Install

Assuming you have installed `node`, `npm`, `npx`.

```bash
NPMRC_FILE=~/.npmrc npm run init
npm install
npm run bootstrap
```

## Package release workflow

To release new version of subpackage:

1. Commit all changes
2. Raise versions:
    ```bash
    npm run version
    ```
3. Publish changed packages
    ```bash
    npm run publish -- --scope @smartsupp/koa-server
    ```
4. Push changes to git

## Setup .npmrc

* https://help.github.com/en/github/managing-packages-with-github-packages/configuring-npm-for-use-with-github-packages
* https://docs.npmjs.com/files/npmrc

npmrc:
```npmrc
//npm.pkg.github.com/:_authToken=GITHUB_PERSONAL_ACCESS_TOKEN
@smartsupp:registry=https://npm.pkg.github.com
```
