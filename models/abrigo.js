import conexao from '../config/conexao.js'

const Abrigo = conexao.Schema({
  nome: { type: String, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true }
})

export default conexao.model('Abrigo', Abrigo)
