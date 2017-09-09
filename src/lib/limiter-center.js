const Limiter = require('./limiter');

const limiters = {};

function createLimiter(name, opts) {
   if( !name )
      throw new Error('limiter name is required');

   if( limiters[name] )
      throw new Error(`limiter ${name} exists`);

   opts = opts || {};
   limiters[name] = new Limiter(opts.type, opts.size);
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
