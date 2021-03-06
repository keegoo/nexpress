const flatten = require('array-flatten')
const debug = require('debug')('express:application')
const router = require('./router')


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
    this.lazyrouter()
    const router = this._router

    fns.forEach(fn => {
      // don't understand
      // non-express app
      if (!fn || !fn.handle || !fn.set) {
        return router.use(path, fn)
      }

      debug(`.use app under ${path}`)
      // again, set arbitrary value to fn ...
      // better solution
      fn.mountpath = path
      fn.parent = this

      // restore .app property on req and res
      router.use(path, (req, res, next) => {
        const orig = req.app
        fn.handle(req, res, (err) => {
          setPrototypeOf(req, orig.request)
          setPrototypeOf(res, orig.response)
          next(err)
        })
      })

      fn.emit('mount', this)
    }, this)

    return this
  }


  lazyrouter() {
    if(!this._router) {
      this._router = new Router({
        caseSensitive: this.enabled
      })

      // to be continue ...
    }
  }

  // app.disabled('foo') => true
  // 
  // app.enable('foo')
  // app.disabled('foo') => false

  enable(setting) {
    return this.set(setting, true)
  }

  disable(setting) {
    return this.set(setting, false)
  }

  enabled(setting) {
    return Boolean(this.set(setting))
  }

  disabled(setting) {
    return !this.set(setting)
  }


  // Assign `setting` to `val`, or return `setting`'s value.
  // 
  //    app.set('foo', 'bar')
  //    app.set('foo')
  //
  set(setting, val) {
    if(arguments.length == 1) {
      // get setting
      return this.settings[setting]
    }
    debug(`set ${setting} to ${val}`)

    // set setting
    this.settings[setting] = val

    // trigger matched settings
    // todo: what are these etag/query parser/trust proxy

    return this
  }
}

export default App