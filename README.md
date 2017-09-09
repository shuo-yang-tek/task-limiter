```js
const taskLimiter = require('task-limiter');

taskLimiter.createLimiter(
   'name',     // name of limiter (unique)
   'queue',    // 'queue' (default) or 'stack'
   1           // max count of running task at same time (default: 1)
);

async function someAsyncFunc() {
   // automatically create a Limiter if doesn't exists
   const leave = await taskLimiter.join('name');

   // (do some async things)

   // MUST call 'leave' when complete job
   leave();
}
```
