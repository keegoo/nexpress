const flatten = require('array-flatten')


class Route {

  // app.all('/secret', function(){})
  all() {
    const handles = flatten(slice.call(arguments))

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i]

      if (typeof handle !== 'function') {
        const type = toString.call(handle)
        const msg = 'Route.all() requires a callback function but got a ' + type
        throw new TypeError(msg)
      }

      const layer = Layer('/', {}, handle)
    }
  }
}