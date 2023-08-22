const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const user = require('./user')
const auth = require('./authRoute')

module.exports = app => {
  app.use(
    bodyParser.json(),
    auth,
    produto,
    user,
  )
}
