import Abrigo from '../models/abrigo.js'

export default class AbrigoController {
  constructor(caminhoBase = 'abrigo/') {
    this.caminhoBase = caminhoBase

    // abrir formulário de cadastro
    this.openAdd = async (req, res) => {
      res.render(caminhoBase + 'add')
    }

    // cadastrar abrigo
    this.add = async (req, res) => {
      try {
        await Abrigo.create({
          nome: req.body.nome,
          endereco: req.body.endereco,
          telefone: req.body.telefone,
          email: req.body.email
        })
        res.redirect('/abrigo/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao cadastrar abrigo')
      }
    }

    // listar abrigos
    this.list = async (req, res) => {
      try {
        const abrigos = await Abrigo.find({})
        res.render(caminhoBase + 'lst', { abrigos })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar abrigos')
      }
    }

    // abrir edição
    this.openEdit = async (req, res) => {
      try {
        const abrigo = await Abrigo.findById(req.params.id)
        if (!abrigo) return res.status(404).send('Abrigo não encontrado')
        res.render(caminhoBase + 'edit', { abrigo })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao abrir edição')
      }
    }

    // editar abrigo
    this.edit = async (req, res) => {
      try {
        await Abrigo.findByIdAndUpdate(req.params.id, {
          nome: req.body.nome,
          endereco: req.body.endereco,
          telefone: req.body.telefone,
          email: req.body.email
        })
        res.redirect('/abrigo/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao editar abrigo')
      }
    }

    // excluir abrigo
    this.delete = async (req, res) => {
      try {
        await Abrigo.findByIdAndDelete(req.params.id)
        res.redirect('/abrigo/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir abrigo')
      }
    }
  }
}
