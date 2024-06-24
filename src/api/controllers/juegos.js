const Juego = require('../models/juegos')

const getJuegos = async (req, res, next) => {
  try {
    const juegos = await Juego.find()
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegoById = async (req, res, next) => {
  try {
    const { id } = req.params
    const juegos = await Juego.findById(id)
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegoByPrice = async (req, res, next) => {
  try {
    const { precio } = req.params
    //                                      esto es less than y permite buscar los inferiores.
    const juegos = await Juego.find({ precio: { $lt: precio } })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const getJuegoByCategory = async (req, res, next) => {
  try {
    const { categoria } = req.params
    const juegos = await Juego.find({ categoria })
    return res.status(200).json(juegos)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const postJuego = async (req, res, next) => {
  try {
    const newJuego = new Juego(req.body)
    juegoSaved = await newJuego.save()
    return res.status(201).json(juegoSaved)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const putJuego = async (req, res, next) => {
  try {
    const { id } = req.params
    const newJuego = new Juego(req.body)
    newJuego._id = id
    const juegoUpdated = await Juego.findByIdAndUpdate(id, newJuego, {
      new: true
    })
    return res.status(200).json(juegoUpdated)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

const deletejuego = async (req, res, next) => {
  try {
    const { id } = req.params
    const juegoDeleted = await Juego.findByIdAndDelete(id)
    return res.status(200).json(juegoDeleted)
  } catch (error) {
    return res.status(400).json('Error en la solicitud')
  }
}

module.exports = {
  getJuegos,
  getJuegoByCategory,
  getJuegoByCategory,
  getJuegoById,
  getJuegoByPrice,
  putJuego,
  postJuego,
  deletejuego
}
