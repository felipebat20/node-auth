const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const user = require('./user')
const auth = require('./authRoute')
const role = require('./role')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    user,
    produto,
    role,
  )
}
