const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const user = require('./user')
const auth = require('./authRoute')
const role = require('./role')
const permission = require('./permission')
const security = require('./securityRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    user,
    produto,
    role,
    permission,
    security,
  )
}
