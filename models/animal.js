// models/animal.js
import conexao from '../config/conexao.js'

const Animal = conexao.Schema({
  nome: { type: String, required: true },
  idade: { type: Number, required: true },
  especie: { type: String, required: true },
  descricao: { type: String },
  foto: { type: Buffer },
  fotoMimeType: { type: String },
  adotado: { type: Boolean, default: false } // ✅ IMPORTANTE
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

Animal.virtual('fotoBase64').get(function () {
  if (this.foto && this.fotoMimeType) {
    return `data:${this.fotoMimeType};base64,${this.foto.toString('base64')}`
  }
  return null
})

export default conexao.model('Animal', Animal)
