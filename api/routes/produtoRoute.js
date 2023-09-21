const { Router } = require('express')
const ProdutoController = require('../controllers/produtoController')

const roles = require('../middleware/roles');
const permissions = require('../middleware/permissions');
const permissionRoles = require('../middleware/permissionRole');

const router = Router()

router
  .post('/produto', ProdutoController.cadastrarProduto)
  .get('/produto', permissionRoles(['editar']), ProdutoController.buscarTodosProdutos)
  .get('/produto/id/:id', ProdutoController.buscarProdutoPorId)
  .delete('/produto/id/:id', ProdutoController.deletarProdutoPorId)
  .put('/produto/id/:id', ProdutoController.editarProduto)

module.exports = router