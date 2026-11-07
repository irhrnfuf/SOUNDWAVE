# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { bookFestivalPass, cancelFestivalPass, listFestivalPasses, getFestivalPass } from '@dataconnect/generated';


// Operation BookFestivalPass:  For variables, look at type BookFestivalPassVars in ../index.d.ts
const { data } = await BookFestivalPass(dataConnect, bookFestivalPassVars);

// Operation CancelFestivalPass:  For variables, look at type CancelFestivalPassVars in ../index.d.ts
const { data } = await CancelFestivalPass(dataConnect, cancelFestivalPassVars);

// Operation ListFestivalPasses: 
const { data } = await ListFestivalPasses(dataConnect);

// Operation GetFestivalPass:  For variables, look at type GetFestivalPassVars in ../index.d.ts
const { data } = await GetFestivalPass(dataConnect, getFestivalPassVars);


```