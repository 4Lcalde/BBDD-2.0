const { isAuth, isAdmin } = require('../../middlewares/auth')
const {
  getJuegos,
  getJuegoByCategory,
  getJuegoById,
  getJuegoByPrice,
  putJuego,
  postJuego,
  deletejuego
} = require('../controllers/juegos')

const juegosRouter = require('express').Router()

juegosRouter.get('/:id', getJuegoById)
juegosRouter.get('/categoria/:categoria', getJuegoByCategory)
juegosRouter.get('/precio/:precio', getJuegoByPrice)
juegosRouter.get('/', getJuegos)
juegosRouter.post('/', [isAuth], postJuego)
juegosRouter.put('/:id', [isAdmin], putJuego)
juegosRouter.delete('/:id', [isAdmin], deletejuego)

module.exports = juegosRouter
