# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListItems*](#listitems)
  - [*GetItem*](#getitem)
- [**Mutations**](#mutations)
  - [*CreateItem*](#createitem)
  - [*UpdateItem*](#updateitem)
  - [*DeleteItem*](#deleteitem)

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

## ListItems
You can execute the `ListItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listItems(options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface ListItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListItemsData, undefined>;
}
export const listItemsRef: ListItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListItemsData, undefined>;

interface ListItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListItemsData, undefined>;
}
export const listItemsRef: ListItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listItemsRef:
```typescript
const name = listItemsRef.operationName;
console.log(name);
```

### Variables
The `ListItems` query has no variables.
### Return Type
Recall that executing the `ListItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListItemsData {
  items: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
  } & Item_Key)[];
}
```
### Using `ListItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listItems } from '@dataconnect/generated';


// Call the `listItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listItems(dataConnect);

console.log(data.items);

// Or, you can use the `Promise` API.
listItems().then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

### Using `ListItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listItemsRef } from '@dataconnect/generated';


// Call the `listItemsRef()` function to get a reference to the query.
const ref = listItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.items);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.items);
});
```

## GetItem
You can execute the `GetItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getItem(vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

interface GetItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
}
export const getItemRef: GetItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getItem(dc: DataConnect, vars: GetItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetItemData, GetItemVariables>;

interface GetItemRef {
  ...
  (dc: DataConnect, vars: GetItemVariables): QueryRef<GetItemData, GetItemVariables>;
}
export const getItemRef: GetItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getItemRef:
```typescript
const name = getItemRef.operationName;
console.log(name);
```

### Variables
The `GetItem` query requires an argument of type `GetItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetItemData {
  item?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Item_Key;
}
```
### Using `GetItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getItem, GetItemVariables } from '@dataconnect/generated';

// The `GetItem` query requires an argument of type `GetItemVariables`:
const getItemVars: GetItemVariables = {
  id: ..., 
};

// Call the `getItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getItem(getItemVars);
// Variables can be defined inline as well.
const { data } = await getItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getItem(dataConnect, getItemVars);

console.log(data.item);

// Or, you can use the `Promise` API.
getItem(getItemVars).then((response) => {
  const data = response.data;
  console.log(data.item);
});
```

### Using `GetItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getItemRef, GetItemVariables } from '@dataconnect/generated';

// The `GetItem` query requires an argument of type `GetItemVariables`:
const getItemVars: GetItemVariables = {
  id: ..., 
};

// Call the `getItemRef()` function to get a reference to the query.
const ref = getItemRef(getItemVars);
// Variables can be defined inline as well.
const ref = getItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getItemRef(dataConnect, getItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.item);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.item);
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

## CreateItem
You can execute the `CreateItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createItem(vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createItem(dc: DataConnect, vars: CreateItemVariables): MutationPromise<CreateItemData, CreateItemVariables>;

interface CreateItemRef {
  ...
  (dc: DataConnect, vars: CreateItemVariables): MutationRef<CreateItemData, CreateItemVariables>;
}
export const createItemRef: CreateItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createItemRef:
```typescript
const name = createItemRef.operationName;
console.log(name);
```

### Variables
The `CreateItem` mutation requires an argument of type `CreateItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateItemVariables {
  name: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateItemData {
  item_insert: Item_Key;
}
```
### Using `CreateItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createItem, CreateItemVariables } from '@dataconnect/generated';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createItem(createItemVars);
// Variables can be defined inline as well.
const { data } = await createItem({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createItem(dataConnect, createItemVars);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
createItem(createItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

### Using `CreateItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createItemRef, CreateItemVariables } from '@dataconnect/generated';

// The `CreateItem` mutation requires an argument of type `CreateItemVariables`:
const createItemVars: CreateItemVariables = {
  name: ..., 
  description: ..., // optional
};

// Call the `createItemRef()` function to get a reference to the mutation.
const ref = createItemRef(createItemVars);
// Variables can be defined inline as well.
const ref = createItemRef({ name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createItemRef(dataConnect, createItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_insert);
});
```

## UpdateItem
You can execute the `UpdateItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateItem(vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface UpdateItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
}
export const updateItemRef: UpdateItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateItem(dc: DataConnect, vars: UpdateItemVariables): MutationPromise<UpdateItemData, UpdateItemVariables>;

interface UpdateItemRef {
  ...
  (dc: DataConnect, vars: UpdateItemVariables): MutationRef<UpdateItemData, UpdateItemVariables>;
}
export const updateItemRef: UpdateItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateItemRef:
```typescript
const name = updateItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateItemVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateItemData {
  item_update?: Item_Key | null;
}
```
### Using `UpdateItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateItem, UpdateItemVariables } from '@dataconnect/generated';

// The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`:
const updateItemVars: UpdateItemVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateItem(updateItemVars);
// Variables can be defined inline as well.
const { data } = await updateItem({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateItem(dataConnect, updateItemVars);

console.log(data.item_update);

// Or, you can use the `Promise` API.
updateItem(updateItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

### Using `UpdateItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateItemRef, UpdateItemVariables } from '@dataconnect/generated';

// The `UpdateItem` mutation requires an argument of type `UpdateItemVariables`:
const updateItemVars: UpdateItemVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateItemRef()` function to get a reference to the mutation.
const ref = updateItemRef(updateItemVars);
// Variables can be defined inline as well.
const ref = updateItemRef({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateItemRef(dataConnect, updateItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_update);
});
```

## DeleteItem
You can execute the `DeleteItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteItem(vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface DeleteItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
}
export const deleteItemRef: DeleteItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteItem(dc: DataConnect, vars: DeleteItemVariables): MutationPromise<DeleteItemData, DeleteItemVariables>;

interface DeleteItemRef {
  ...
  (dc: DataConnect, vars: DeleteItemVariables): MutationRef<DeleteItemData, DeleteItemVariables>;
}
export const deleteItemRef: DeleteItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteItemRef:
```typescript
const name = deleteItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteItemData {
  item_delete?: Item_Key | null;
}
```
### Using `DeleteItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteItem, DeleteItemVariables } from '@dataconnect/generated';

// The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`:
const deleteItemVars: DeleteItemVariables = {
  id: ..., 
};

// Call the `deleteItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteItem(deleteItemVars);
// Variables can be defined inline as well.
const { data } = await deleteItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteItem(dataConnect, deleteItemVars);

console.log(data.item_delete);

// Or, you can use the `Promise` API.
deleteItem(deleteItemVars).then((response) => {
  const data = response.data;
  console.log(data.item_delete);
});
```

### Using `DeleteItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteItemRef, DeleteItemVariables } from '@dataconnect/generated';

// The `DeleteItem` mutation requires an argument of type `DeleteItemVariables`:
const deleteItemVars: DeleteItemVariables = {
  id: ..., 
};

// Call the `deleteItemRef()` function to get a reference to the mutation.
const ref = deleteItemRef(deleteItemVars);
// Variables can be defined inline as well.
const ref = deleteItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteItemRef(dataConnect, deleteItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.item_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.item_delete);
});
```

