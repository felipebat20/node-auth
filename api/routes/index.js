const bodyParser = require('body-parser')

const produto = require('./produtoRoute')
const user = require('./user')

module.exports = app => {
  app.use(
    bodyParser.json(),
    produto,
    user,
  )
}
