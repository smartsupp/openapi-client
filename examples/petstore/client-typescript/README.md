# petstore

This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about
Swagger at [http://swagger.io](http://swagger.io). In the third iteration of the pet store, we&#x27;ve switched to the design first approach!
You can now help us improve the API whether it&#x27;s by making changes to the definition itself or to the code.
That way, with time, we can improve the API in general, and expose some of the new features in OAS3.

Some useful links:
- [The Pet Store repository](https://github.com/swagger-api/swagger-petstore)
- [The source API definition for the Pet Store](https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml)

## Install

```
npm install petstore --save
```

## Usage

```typescript
import coreApi from '@smartsupp/client-core-api'

const client = coreApi.createClient(somehowCreateAdapter())
// now you can use client instance
```

Adapter must be created and implemented by you. This client only deliver data to you adapter.
