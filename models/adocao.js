import conexao from '../config/conexao.js'

const Adoacao = conexao.Schema({
  animal: { type: conexao.Types.ObjectId, ref: 'Animal', required: true },
  adotante: { type: conexao.Types.ObjectId, ref: 'Adotante', required: true },
  dataAdocao: { type: Date, required: true },
  observacoes: { type: String }
})

export default conexao.model('Adoacao', Adoacao)
