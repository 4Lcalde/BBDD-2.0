const jwt = require('jsonwebtoken')

//una llave para ser generada necesita un dato para partir.
//Esta función sirve para generar el token

const generateSign = (id) => {
  //Le tengo que pasar el dato que recibo, la clave y las opciones
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1y' })
}
//esta funcion sirve3 para comprobar si la llave la hemos hecho nosotros
const verifyJWT = (token) => {
  //Para verificar si es correcto hay que pasarle el token y la clave secreta
  return jwt.verify(token, process.env.JWT_SECRET)
}
module.exports = { generateSign, verifyJWT }
