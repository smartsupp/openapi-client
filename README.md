# openapi-client

**Project in progress**.

Best way to start is look on generated [petstore client](./examples/petstore/typescript).

## Motivation

Recently i start using official [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) but there was drawbacks:

- inline schemas **without** exact name
- multiple client generators (axios, fetch, etc...)

Our company using OpenAPI more and more, and clients are needed like on backend also in frontend.

This project has the following goals:

- only OpenAPI 3.0.*is supported (no planned support for 2.*)
- client is very simple, logic free
- generate clean clients with all types
- interfaces must well named and predicable
- inline interface (related to apis) using namespaces
- well-supported schema types like `anyOf`, `oneOf`, `allOf`, `array`

## Usage

```bash
npm i @openapi-client/generator @openapi-client/compiler-typescript
```

```js
import { generateClients } from '@openapi-client/generator'

generateClients(require('./petstore.json'), [{
 name: 'typescript',
 outDir: __dirname + '/out/typescript',
 compilerOptions: {
  npmName: 'swagger-petstore-client',
  npmAuthor: 'Swagger',
  clientClass: 'SwaggerPetstoreClient',
 }
}])
```

## Development

There is a lot of work todo, like write tests, docs, adapters, build from url and so on to make it ready for production usage.
If anyone like this idea or output, cooperation is welcome.

I'm not strong with open-source, so if there is anybody who want to maintain open-source i really appreciate your help.

Current implementation notes:

- for now only json responses are supported
- schema title is preferred as interface name

```bash
npm install
npm run bootstrap
npm run build:watch
```
