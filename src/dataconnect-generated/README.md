# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListFestivalPasses*](#listfestivalpasses)
  - [*GetFestivalPass*](#getfestivalpass)
- [**Mutations**](#mutations)
  - [*BookFestivalPass*](#bookfestivalpass)
  - [*CancelFestivalPass*](#cancelfestivalpass)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListFestivalPasses
You can execute the `ListFestivalPasses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listFestivalPasses(options?: ExecuteQueryOptions): QueryPromise<ListFestivalPassesData, undefined>;

interface ListFestivalPassesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListFestivalPassesData, undefined>;
}
export const listFestivalPassesRef: ListFestivalPassesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listFestivalPasses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListFestivalPassesData, undefined>;

interface ListFestivalPassesRef {
  ...
  (dc: DataConnect): QueryRef<ListFestivalPassesData, undefined>;
}
export const listFestivalPassesRef: ListFestivalPassesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listFestivalPassesRef:
```typescript
const name = listFestivalPassesRef.operationName;
console.log(name);
```

### Variables
The `ListFestivalPasses` query has no variables.
### Return Type
Recall that executing the `ListFestivalPasses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListFestivalPassesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListFestivalPassesData {
  festivalPasses: ({
    id: UUIDString;
    passCode: string;
    attendeeName: string;
    email: string;
    passTier: string;
    festivalDay: string;
    quantity: number;
    totalPrice: number;
    favoriteArtist?: string | null;
    createdAt: TimestampString;
  } & FestivalPass_Key)[];
}
```
### Using `ListFestivalPasses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listFestivalPasses } from '@dataconnect/generated';


// Call the `listFestivalPasses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listFestivalPasses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listFestivalPasses(dataConnect);

console.log(data.festivalPasses);

// Or, you can use the `Promise` API.
listFestivalPasses().then((response) => {
  const data = response.data;
  console.log(data.festivalPasses);
});
```

### Using `ListFestivalPasses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listFestivalPassesRef } from '@dataconnect/generated';


// Call the `listFestivalPassesRef()` function to get a reference to the query.
const ref = listFestivalPassesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listFestivalPassesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.festivalPasses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.festivalPasses);
});
```

## GetFestivalPass
You can execute the `GetFestivalPass` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getFestivalPass(vars: GetFestivalPassVariables, options?: ExecuteQueryOptions): QueryPromise<GetFestivalPassData, GetFestivalPassVariables>;

interface GetFestivalPassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetFestivalPassVariables): QueryRef<GetFestivalPassData, GetFestivalPassVariables>;
}
export const getFestivalPassRef: GetFestivalPassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getFestivalPass(dc: DataConnect, vars: GetFestivalPassVariables, options?: ExecuteQueryOptions): QueryPromise<GetFestivalPassData, GetFestivalPassVariables>;

interface GetFestivalPassRef {
  ...
  (dc: DataConnect, vars: GetFestivalPassVariables): QueryRef<GetFestivalPassData, GetFestivalPassVariables>;
}
export const getFestivalPassRef: GetFestivalPassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getFestivalPassRef:
```typescript
const name = getFestivalPassRef.operationName;
console.log(name);
```

### Variables
The `GetFestivalPass` query requires an argument of type `GetFestivalPassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetFestivalPassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetFestivalPass` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetFestivalPassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetFestivalPassData {
  festivalPass?: {
    id: UUIDString;
    passCode: string;
    attendeeName: string;
    email: string;
    passTier: string;
    festivalDay: string;
    quantity: number;
    totalPrice: number;
    favoriteArtist?: string | null;
    createdAt: TimestampString;
  } & FestivalPass_Key;
}
```
### Using `GetFestivalPass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getFestivalPass, GetFestivalPassVariables } from '@dataconnect/generated';

// The `GetFestivalPass` query requires an argument of type `GetFestivalPassVariables`:
const getFestivalPassVars: GetFestivalPassVariables = {
  id: ..., 
};

// Call the `getFestivalPass()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getFestivalPass(getFestivalPassVars);
// Variables can be defined inline as well.
const { data } = await getFestivalPass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getFestivalPass(dataConnect, getFestivalPassVars);

console.log(data.festivalPass);

// Or, you can use the `Promise` API.
getFestivalPass(getFestivalPassVars).then((response) => {
  const data = response.data;
  console.log(data.festivalPass);
});
```

### Using `GetFestivalPass`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getFestivalPassRef, GetFestivalPassVariables } from '@dataconnect/generated';

// The `GetFestivalPass` query requires an argument of type `GetFestivalPassVariables`:
const getFestivalPassVars: GetFestivalPassVariables = {
  id: ..., 
};

// Call the `getFestivalPassRef()` function to get a reference to the query.
const ref = getFestivalPassRef(getFestivalPassVars);
// Variables can be defined inline as well.
const ref = getFestivalPassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getFestivalPassRef(dataConnect, getFestivalPassVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.festivalPass);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.festivalPass);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## BookFestivalPass
You can execute the `BookFestivalPass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
bookFestivalPass(vars: BookFestivalPassVariables): MutationPromise<BookFestivalPassData, BookFestivalPassVariables>;

interface BookFestivalPassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: BookFestivalPassVariables): MutationRef<BookFestivalPassData, BookFestivalPassVariables>;
}
export const bookFestivalPassRef: BookFestivalPassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
bookFestivalPass(dc: DataConnect, vars: BookFestivalPassVariables): MutationPromise<BookFestivalPassData, BookFestivalPassVariables>;

interface BookFestivalPassRef {
  ...
  (dc: DataConnect, vars: BookFestivalPassVariables): MutationRef<BookFestivalPassData, BookFestivalPassVariables>;
}
export const bookFestivalPassRef: BookFestivalPassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the bookFestivalPassRef:
```typescript
const name = bookFestivalPassRef.operationName;
console.log(name);
```

### Variables
The `BookFestivalPass` mutation requires an argument of type `BookFestivalPassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface BookFestivalPassVariables {
  passCode: string;
  attendeeName: string;
  email: string;
  passTier: string;
  festivalDay: string;
  quantity: number;
  totalPrice: number;
  favoriteArtist?: string | null;
}
```
### Return Type
Recall that executing the `BookFestivalPass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `BookFestivalPassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface BookFestivalPassData {
  festivalPass_insert: FestivalPass_Key;
}
```
### Using `BookFestivalPass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, bookFestivalPass, BookFestivalPassVariables } from '@dataconnect/generated';

// The `BookFestivalPass` mutation requires an argument of type `BookFestivalPassVariables`:
const bookFestivalPassVars: BookFestivalPassVariables = {
  passCode: ..., 
  attendeeName: ..., 
  email: ..., 
  passTier: ..., 
  festivalDay: ..., 
  quantity: ..., 
  totalPrice: ..., 
  favoriteArtist: ..., // optional
};

// Call the `bookFestivalPass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await bookFestivalPass(bookFestivalPassVars);
// Variables can be defined inline as well.
const { data } = await bookFestivalPass({ passCode: ..., attendeeName: ..., email: ..., passTier: ..., festivalDay: ..., quantity: ..., totalPrice: ..., favoriteArtist: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await bookFestivalPass(dataConnect, bookFestivalPassVars);

console.log(data.festivalPass_insert);

// Or, you can use the `Promise` API.
bookFestivalPass(bookFestivalPassVars).then((response) => {
  const data = response.data;
  console.log(data.festivalPass_insert);
});
```

### Using `BookFestivalPass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, bookFestivalPassRef, BookFestivalPassVariables } from '@dataconnect/generated';

// The `BookFestivalPass` mutation requires an argument of type `BookFestivalPassVariables`:
const bookFestivalPassVars: BookFestivalPassVariables = {
  passCode: ..., 
  attendeeName: ..., 
  email: ..., 
  passTier: ..., 
  festivalDay: ..., 
  quantity: ..., 
  totalPrice: ..., 
  favoriteArtist: ..., // optional
};

// Call the `bookFestivalPassRef()` function to get a reference to the mutation.
const ref = bookFestivalPassRef(bookFestivalPassVars);
// Variables can be defined inline as well.
const ref = bookFestivalPassRef({ passCode: ..., attendeeName: ..., email: ..., passTier: ..., festivalDay: ..., quantity: ..., totalPrice: ..., favoriteArtist: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = bookFestivalPassRef(dataConnect, bookFestivalPassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.festivalPass_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.festivalPass_insert);
});
```

## CancelFestivalPass
You can execute the `CancelFestivalPass` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
cancelFestivalPass(vars: CancelFestivalPassVariables): MutationPromise<CancelFestivalPassData, CancelFestivalPassVariables>;

interface CancelFestivalPassRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CancelFestivalPassVariables): MutationRef<CancelFestivalPassData, CancelFestivalPassVariables>;
}
export const cancelFestivalPassRef: CancelFestivalPassRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
cancelFestivalPass(dc: DataConnect, vars: CancelFestivalPassVariables): MutationPromise<CancelFestivalPassData, CancelFestivalPassVariables>;

interface CancelFestivalPassRef {
  ...
  (dc: DataConnect, vars: CancelFestivalPassVariables): MutationRef<CancelFestivalPassData, CancelFestivalPassVariables>;
}
export const cancelFestivalPassRef: CancelFestivalPassRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the cancelFestivalPassRef:
```typescript
const name = cancelFestivalPassRef.operationName;
console.log(name);
```

### Variables
The `CancelFestivalPass` mutation requires an argument of type `CancelFestivalPassVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CancelFestivalPassVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `CancelFestivalPass` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CancelFestivalPassData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CancelFestivalPassData {
  festivalPass_delete?: FestivalPass_Key | null;
}
```
### Using `CancelFestivalPass`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, cancelFestivalPass, CancelFestivalPassVariables } from '@dataconnect/generated';

// The `CancelFestivalPass` mutation requires an argument of type `CancelFestivalPassVariables`:
const cancelFestivalPassVars: CancelFestivalPassVariables = {
  id: ..., 
};

// Call the `cancelFestivalPass()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await cancelFestivalPass(cancelFestivalPassVars);
// Variables can be defined inline as well.
const { data } = await cancelFestivalPass({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await cancelFestivalPass(dataConnect, cancelFestivalPassVars);

console.log(data.festivalPass_delete);

// Or, you can use the `Promise` API.
cancelFestivalPass(cancelFestivalPassVars).then((response) => {
  const data = response.data;
  console.log(data.festivalPass_delete);
});
```

### Using `CancelFestivalPass`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, cancelFestivalPassRef, CancelFestivalPassVariables } from '@dataconnect/generated';

// The `CancelFestivalPass` mutation requires an argument of type `CancelFestivalPassVariables`:
const cancelFestivalPassVars: CancelFestivalPassVariables = {
  id: ..., 
};

// Call the `cancelFestivalPassRef()` function to get a reference to the mutation.
const ref = cancelFestivalPassRef(cancelFestivalPassVars);
// Variables can be defined inline as well.
const ref = cancelFestivalPassRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = cancelFestivalPassRef(dataConnect, cancelFestivalPassVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.festivalPass_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.festivalPass_delete);
});
```

