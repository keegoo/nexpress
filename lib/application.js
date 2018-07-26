const flatten = require('array-flatten')

class App {
  constructor() {
    this.cache = {}
    this.engines = {}
    this.settings = {}
  }

  use(fn) {
    let offset = 0
    let path = '/'

    if (typeof fn !== 'function') {
      // ignore: deeply nested array
      // todo: why ?
      offset = 1
      path = fn
    }

    const fns = flatten(arguments.slice(offset))

    if (fns.length === 0) {
      throw new TypeError('app.use() requires a middleware function')
    }

    // to be continue ...
  }
}

module.exports = App