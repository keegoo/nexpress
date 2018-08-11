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
    this.fast_star = ( path === '*' )
    this.fast_slash = ( path === '/' && opts.end === false )
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
    let match = false

    if (path != null) {
      if (this.fast_slash) {
        this.params = {}
        this.path = ''
        return true
      }

      if (this.fast_star) {
        this.params = {'0': this.decode_param(path)}
        this.path = path
        return true
      }

      match = this.regexp.exec(path)
    }

    if (!match) {
      this.params = undefined
      this.path = undefined
      return false
    }

    this.params = {}
    this.path = match[0]

    const matchedGroups = match.slice(1)

    for (let i = 0; i < matchedGroups.length; i ++) {
      const prop = this.keys[i].name
      const val = this.decode_param(matchedGroups[i])

      if (val !== undefined || !(this.params.hasOwnProperty(prop))) {
        this.params[prop] = val
      }
    }
    
    return true
  }

}

export default Layer