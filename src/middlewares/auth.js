const User = require('../api/models/users')
const { verifyJWT } = require('../config/jwt')

const isAuth = async (req, res, next) => {
  try {
    //Creamos la puerta que nos indica si podemos pasar o no pasar con la llave
    const token = req.headers.authotization
    //Con esto me quedo con el valor limpio de mi token
    const parsedToken = token.replace('Bearer ', '')
    //Con esto le mando a verifiToken el token que necesita corroborar
    //Extraigo el ID de aqui
    const { id } = verifyJWT(parsedToken)

    const user = await User.findById(id)

    user.password = null
    req.user = user

    next()
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authotization

    const parsedToken = token.replace('Bearer ', '')

    const { id } = verifyJWT(parsedToken)

    const user = await User.findById(id)

    //Esta función es exactamente igual que la anterior, solo que solo se puede hacer la acción si eres admin
    if (user.rol === 'admin') {
      user.password = null
      req.user = user
      next()
    } else {
      return res.status(400).json('No eres administrador')
    }
  } catch (error) {
    return res.status(400).json('No estás autorizado')
  }
}

module.exports = { isAuth, isAdmin }
