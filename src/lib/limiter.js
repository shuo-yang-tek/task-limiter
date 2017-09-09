class Limiter {
   constructor(type = 'queue', size = 1) {
      this._type = type;
      this._size = size;
      this._count = 0;
      this._resolves = [];

      this.join = this.join.bind(this);
      this.leave = this.leave.bind(this);
   }

   join() {
      return new Promise(resolve => {
         this._resolves.push(resolve);
         if( this._count < this._size ) {
            this._count += 1;
            this.leave();
         }
      });
   }

   leave() {
      this._count -= 1;
      const resolve = this._type === 'queue' ?
         this._resolves.shift() :
         this._resolves.pop();

      if( resolve ) {
         this._count += 1;
         resolve(this.leave);
      }
   }
}

module.exports = Limiter;
