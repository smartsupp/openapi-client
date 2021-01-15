# openapi-client

**Project in progress**. 
 
Best way to start is look on generated [petstore client](./examples/petstore/client-typescript).

## Motivation

Recently i start using official [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) but there was drawbacks:
- inline schemas **without** exact name
- multiple client generators (axios, fetch, etc...)

In our company we using OpenAPI more and more, and clients are needed like on backend also in frontend.

This project have those goals:
- only OpenAPI 3.0.* is supported (no planned support for 2.*)
- client is very simple, logic free
- generate clean clients with all types
- interfaces must well named and predicable
- inline interface (related to apis) using namespaces
- well supported schema types like `anyOf`, `oneOf`, `allOf`, `array`

For now clients dont implement request sending, they have just dependency on interface that execute requests.
In future i plan to add packages `@openapi-client/adatper-axios` and `@openapi-client/adapter-fetch` for request processing.

## Install

```bash
npm install
npm run bootstrap
npm run build:watch
```

## Development

There is lot of work todo, like write tests, docs, adapters and so on to make it ready for production usage. 
If anyone like this idea or output, cooperation is welcome. 

I'm not strong with open-source, so if there is anybody who know how to maintain open-source, setup correct licences i really like that kind of help.

Current implementation notes:

- for now only json responses are supported
- schema title is preferred as interface name
