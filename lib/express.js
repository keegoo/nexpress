const proto = require('./application')
const Route = require('./router/route')
const Router = require('./router')


function createApplication() {
  const app = {}

  app.proto = new proto()
  app.Route = Route
  app.Router = Router

  return app
}


export default createApplication