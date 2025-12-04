import Adotante from '../models/adotante.js'
import { enviarEmail } from '../utils/email.js' // 🔹 importa o módulo de envio de e-mail

export default class AdotanteController {
  constructor(caminhoBase = 'adotante/') {
    this.caminhoBase = caminhoBase

    // abrir formulário de cadastro
    this.openAdd = async (req, res) => {
      res.render(caminhoBase + 'add')
    }

    // cadastrar adotante
    this.add = async (req, res) => {
      try {
        const { nome, email, telefone } = req.body

        await Adotante.create({ nome, email, telefone })

        // 🔹 Enviar e-mail de confirmação de cadastro
        await enviarEmail(
  email,
  '🎉 Bem-vindo(a) ao ConectaPet!',
  `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fdfb; padding: 20px; border-radius: 12px;">
    <h2 style="color: #04BF8A;">Olá, ${nome}! 🐶💚</h2>

    <p style="font-size: 16px; color: #333;">
      Que alegria ter você com a gente! Seu cadastro no <strong>ConectaPet</strong> foi concluído com sucesso.
    </p>

    <p style="font-size: 16px; color: #333;">
      A partir de agora, você faz parte da nossa comunidade de amor e cuidado pelos animais. 
      Explore os pets disponíveis para adoção, descubra novas histórias e, quem sabe, encontre o seu novo melhor amigo! 🐾
    </p>

    <div style="background-color: #e6faf3; border-left: 5px solid #04BF8A; padding: 10px 15px; margin: 20px 0; border-radius: 6px;">
      <p style="margin: 0; color: #025940;">
        💡 <strong>Dica:</strong> mantenha seu perfil atualizado — assim, você recebe sugestões personalizadas de pets que combinam com o seu estilo de vida!
      </p>
    </div>

    <p style="font-size: 16px; color: #333;">
      Se tiver qualquer dúvida ou precisar de ajuda, nossa equipe está sempre à disposição.
    </p>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 25px 0;"/>

    <p style="font-size: 14px; color: #555; text-align: center;">
      💌 Com carinho, <br>
      <strong>Equipe ConectaPet</strong><br>
      <small>Conectando lares, transformando vidas 🐕🐈</small>
    </p>
  </div>
  `
)


        res.redirect('/adotante/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao cadastrar adotante')
      }
    }

    // listar adotantes
    this.list = async (req, res) => {
      try {
        const adotantes = await Adotante.find({})
        res.render(caminhoBase + 'lst', { adotantes })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar adotantes')
      }
    }

    // abrir edição
    this.openEdit = async (req, res) => {
      try {
        const adotante = await Adotante.findById(req.params.id)
        if (!adotante) return res.status(404).send('Adotante não encontrado')
        res.render(caminhoBase + 'edit', { adotante })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao abrir edição')
      }
    }

    // editar adotante
    this.edit = async (req, res) => {
      try {
        await Adotante.findByIdAndUpdate(req.params.id, {
          nome: req.body.nome,
          email: req.body.email,
          telefone: req.body.telefone
        })
        res.redirect('/adotante/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao editar adotante')
      }
    }

    // excluir adotante
    this.delete = async (req, res) => {
      try {
        await Adotante.findByIdAndDelete(req.params.id)
        res.redirect('/adotante/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir adotante')
      }
    }
  }
}
