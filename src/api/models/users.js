const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//Instalo bcrypt npm i bcrypt
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
    }
  },
  { timestamps: true, collection: 'users' }
)
//Esta función pre hace un previo a lo que se le indique.
userSchema.pre('save', function () {
  //con esto encripto la contraseña
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('users', userSchema, 'users')
module.exports = User
