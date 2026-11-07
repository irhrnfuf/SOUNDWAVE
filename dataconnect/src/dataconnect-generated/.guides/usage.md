# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createItem, updateItem, deleteItem, listItems, getItem } from '@dataconnect/generated';


// Operation CreateItem:  For variables, look at type CreateItemVars in ../index.d.ts
const { data } = await CreateItem(dataConnect, createItemVars);

// Operation UpdateItem:  For variables, look at type UpdateItemVars in ../index.d.ts
const { data } = await UpdateItem(dataConnect, updateItemVars);

// Operation DeleteItem:  For variables, look at type DeleteItemVars in ../index.d.ts
const { data } = await DeleteItem(dataConnect, deleteItemVars);

// Operation ListItems: 
const { data } = await ListItems(dataConnect);

// Operation GetItem:  For variables, look at type GetItemVars in ../index.d.ts
const { data } = await GetItem(dataConnect, getItemVars);


```