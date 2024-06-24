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
juegosRouter.post('/', postJuego)
juegosRouter.put('/:id', putJuego)
juegosRouter.delete('/:id', deletejuego)

module.exports = juegosRouter
