const { isAuth, isAdmin } = require('../../middlewares/auth')
const { getUsers, register, login } = require('../controllers/users')

const userRoutes = require('express').Router()
// Le paso los el middlelware para que se ejecute antes de la funcion
userRoutes.get('/', [isAdmin], getUsers)
userRoutes.post('/register', register)
userRoutes.post('/login', login)

module.exports = userRoutes
