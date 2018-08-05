const debug = require('debug')('express:router:layer')
const pathRegexp = require('path-to-regexp')

moduel.exports = Layer


class Layer {
  constructor(path, options, fn) {
    // why this instance of Layer ???

    // %o Pretty-print an Object all on a single line.
    debug('new %o', path)
    const opts = options || {}

    this.handle = fn
    this.name = fn.name || '<anonymous>'
    this.params = undefined
    this.path = undefined
    this.regexp = pathRegexp(path, this.keys = [], opts)

    // set fast path flags
    // what is opts and what is pathRegexp ???
    this.regexp.fast_star = path === '*'
    this.regexp.fast_slash = path === '/' && opts.end === fast
  }
}