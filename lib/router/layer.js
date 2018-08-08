const debug = require('debug')('express:router:layer')
const pathRegexp = require('path-to-regexp')


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

  handle_error(error, req, res, next) {
    const fn = this.handle

    if (fn.length != 4) {
      return next(error)
    }

    try {
      fn(error, req, res, next)
    } catch (err) {
      next(err)
    }
  }

  handle_request(req, res, next) {
    const fn = this.handle

    if (fn.length > 3) {
      return next()
    } 

    try {
      fn(req, res, next)
    } catch (err) {
      next(err)
    }
  }

  decode_param(val) {
    if (typeof val !== 'string' || val.length = 0) {
      return val
    }

    try {
      return decodeURIComponent(val)
    } catch (err) {
      if (err instanceof URIError) {
        err.message = `Failed to decode param '${val}'`
        err.status = err.statusCode = 400
      }

      throw err
    }
  }

  match(path) {
    let match 

    if (path != null) {

    }
  }
}

export default Layer