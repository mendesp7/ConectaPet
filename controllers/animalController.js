// controllers/animalController.js
import Animal from '../models/animal.js'

export default class AnimalController {
  constructor(caminhoBase = 'animal/') {
    this.caminhoBase = caminhoBase

    // 🔹 Abrir formulário de cadastro
    this.openAdd = async (req, res) => {
      res.render(caminhoBase + 'add')
    }

    // 🔹 Cadastrar animal
    this.add = async (req, res) => {
      try {
        let novaFoto = null
        let tipoFoto = null

        if (req.file) {
          novaFoto = req.file.buffer
          tipoFoto = req.file.mimetype
          console.log('📦 Arquivo recebido no upload:', req.file.originalname)
        }

        await Animal.create({
          nome: req.body.nome,
          idade: req.body.idade,
          especie: req.body.especie,
          descricao: req.body.descricao,
          foto: novaFoto,
          fotoMimeType: tipoFoto
        })

        res.redirect('/animal/lst')
      } catch (err) {
        console.error('❌ Erro ao cadastrar animal:', err)
        res.status(500).send('Erro ao cadastrar animal')
      }
    }

   // listar animais
this.list = async (req, res) => {
  try {
    // busca apenas animais não adotados
    const animais = await Animal.find({ adotado: false })
    res.render(this.caminhoBase + 'lst', { animais })
  } catch (err) {
    console.error(err)
    res.status(500).send('Erro ao listar animais')
  }
}



    // 🔹 Abrir edição
    this.openEdit = async (req, res) => {
      try {
        const animal = await Animal.findById(req.params.id)
        if (!animal) return res.status(404).send('Animal não encontrado')
        res.render(caminhoBase + 'edit', { animal })
      } catch (err) {
        console.error('❌ Erro ao abrir edição:', err)
        res.status(500).send('Erro ao abrir edição')
      }
    }

    // 🔹 Editar animal
    this.edit = async (req, res) => {
      try {
        const updateData = {
          nome: req.body.nome,
          idade: req.body.idade,
          especie: req.body.especie,
          descricao: req.body.descricao
        }

        if (req.file) {
          updateData.foto = req.file.buffer
          updateData.fotoMimeType = req.file.mimetype
          console.log('📸 Nova foto recebida:', req.file.originalname)
        }

        await Animal.findByIdAndUpdate(req.params.id, updateData)
        res.redirect('/animal/lst')
      } catch (err) {
        console.error('❌ Erro ao editar animal:', err)
        res.status(500).send('Erro ao editar animal')
      }
    }

    // 🔹 Excluir animal
    this.delete = async (req, res) => {
      try {
        await Animal.findByIdAndDelete(req.params.id)
        res.redirect('/animal/lst')
      } catch (err) {
        console.error('❌ Erro ao excluir animal:', err)
        res.status(500).send('Erro ao excluir animal')
      }
    }

    // 🔹 Servir imagem (mostrar foto no navegador)
    this.getFoto = async (req, res) => {
      try {
        const animal = await Animal.findById(req.params.id)
        if (!animal || !animal.foto) return res.status(404).send('Imagem não encontrada')

        res.set('Content-Type', animal.fotoMimeType)
        res.send(animal.foto)
      } catch (err) {
        console.error('❌ Erro ao carregar imagem:', err)
        res.status(500).send('Erro ao carregar imagem')
      }
    }
  }
}
