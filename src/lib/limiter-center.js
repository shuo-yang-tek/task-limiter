const Limiter = require('./limiter');

const limiters = {};

function createLimiter(name, type, size) {
   if( !name )
      throw new Error('limiter name is required');

   if( limiters[name] )
      throw new Error(`limiter ${name} exists`);

   limiters[name] = new Limiter(type, size);
}

function join(name) {
   if( !limiters[name] )
      createLimiter(name);

   return limiters[name].join();
}

module.exports = {
   createLimiter,
   join
};
