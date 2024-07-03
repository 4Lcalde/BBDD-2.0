const { generateSign } = require('../../config/jwt')
const User = require('../models/users')
const bcrypt = require('bcrypt')
//Instalo npm i jsonwebtoken, que permite crear llaves y verificar si las hemos creado para que los usuarios se loguen

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      userName: req.body.userName,
      password: req.body.password,
      rol: 'user'
    })

    const duplicatedUser = await User.findOne({ userName: req.body.userName })
    //Estas lineas verifican si hay algun user repetido
    if (duplicatedUser) {
      return res.status(400).json('Nombre en uso. ')
    }
    const userSaved = await newUser.save()

    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })

    //Esto verifica si el usuario existe o no existe.
    if (!user) {
      return res.status(400).json('Este usuario no existe. ')
    }
    //Compara una contraseña encriptada con una no encriptada
    if (bcrypt.compareSync(req.body.password, user.password)) {
      //con esto le paso al token el id del usuario
      const token = generateSign(user._id)
      return res.status(200).json('Login correcto')
    } else {
      return res.status(400).json('La contraseña está mal')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}
module.exports = {
  getUsers,
  register,
  login
}
