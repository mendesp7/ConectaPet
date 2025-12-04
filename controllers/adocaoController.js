// controllers/adocaoController.js
import Adoacao from '../models/adocao.js'
import Animal from '../models/animal.js'
import Adotante from '../models/adotante.js'
import { enviarEmail } from '../utils/email.js' // 🔹 importa o módulo de envio de e-mail

export default class AdoacaoController {
  constructor(caminhoBase = 'adocao/') {
    this.caminhoBase = caminhoBase

    // 🔹 Abrir formulário de cadastro
    this.openAdd = async (req, res) => {
      try {
        // Mostra apenas animais que ainda NÃO foram adotados
        const animais = await Animal.find({ adotado: false })
        const adotantes = await Adotante.find({})
        res.render(caminhoBase + 'add', { animais, adotantes })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao abrir formulário de adoção')
      }
    }

    // 🔹 Cadastrar adoção
    this.add = async (req, res) => {
      try {
        const { animal, adotante, dataAdocao, observacoes } = req.body

        // Cria o registro de adoção
        const novaAdocao = await Adoacao.create({
          animal,
          adotante,
          dataAdocao,
          observacoes
        })

        // Marca o animal como adotado
        await Animal.findByIdAndUpdate(animal, { adotado: true })

        // 🔹 Busca informações completas do adotante e animal para o e-mail
        const adotanteInfo = await Adotante.findById(adotante)
        const animalInfo = await Animal.findById(animal)

        if (adotanteInfo && animalInfo) {
          // 🔹 Envia e-mail de confirmação da adoção
await enviarEmail(
  adotanteInfo.email,
  '🐾 Confirmação de Adoção - ConectaPet',
  `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f8fdfb; padding: 25px; border-radius: 12px; color: #333;">
    <h2 style="color: #04BF8A;">Parabéns, ${adotanteInfo.nome}! 🎉</h2>

    <p style="font-size: 16px;">
      É com muita alegria que confirmamos sua adoção registrada no <strong>ConectaPet</strong>! 💚
    </p>

    <div style="background-color: #e6faf3; border-left: 5px solid #04BF8A; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px;">
        O pet <strong style="color: #025940;">${animalInfo.nome}</strong> agora faz parte da sua família! 🐕🐾<br>
        <strong>Data da adoção:</strong> ${new Date(dataAdocao).toLocaleDateString('pt-BR')}<br>
        ${observacoes ? `<strong>Observações:</strong> ${observacoes}` : ''}
      </p>
    </div>

    <p style="font-size: 16px;">
      Agradecemos por abrir seu coração e dar uma nova chance a um amigo peludo. 💖<br>
      Cada adoção é um passo para um mundo com mais amor, cuidado e esperança.
    </p>

    <p style="font-size: 16px;">
      Lembre-se: o <strong>ConectaPet</strong> está sempre aqui para acompanhar você nessa jornada.  
      Cuide com carinho, compartilhe fotos e inspire outras pessoas a adotarem também!
    </p>

    <hr style="border: none; border-top: 1px solid #ccc; margin: 25px 0;"/>

    <p style="font-size: 14px; color: #555; text-align: center;">
      💌 Com amor,<br>
      <strong>Equipe ConectaPet</strong><br>
      <small>Transformando lares, mudando vidas 🐶🐱</small>
    </p>
  </div>
  `
)}

        res.redirect('/adocao/lst')
      } catch (err) {
        console.error('❌ Erro ao registrar adoção:', err)
        res.status(500).send('Erro ao registrar adoção')
      }
    }

    // 🔹 Listar adoções
    this.list = async (req, res) => {
      try {
        const adocoes = await Adoacao.find({})
          .populate('animal')
          .populate('adotante')
        res.render(caminhoBase + 'lst', { adocoes })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao listar adoções')
      }
    }

    // 🔹 Abrir edição
    this.openEdit = async (req, res) => {
      try {
        const adocao = await Adoacao.findById(req.params.id)
        const animais = await Animal.find({})
        const adotantes = await Adotante.find({})
        if (!adocao) return res.status(404).send('Adoção não encontrada')
        res.render(caminhoBase + 'edit', { adocao, animais, adotantes })
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao abrir edição')
      }
    }

    // 🔹 Editar adoção
    this.edit = async (req, res) => {
      try {
        const { animal, adotante, dataAdocao, observacoes } = req.body

        const adocaoAntiga = await Adoacao.findById(req.params.id)

        // Se o animal foi trocado, libera o antigo e marca o novo
        if (adocaoAntiga.animal.toString() !== animal) {
          await Animal.findByIdAndUpdate(adocaoAntiga.animal, { adotado: false })
          await Animal.findByIdAndUpdate(animal, { adotado: true })
        }

        await Adoacao.findByIdAndUpdate(req.params.id, {
          animal,
          adotante,
          dataAdocao,
          observacoes
        })

        res.redirect('/adocao/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao editar adoção')
      }
    }

    // 🔹 Excluir adoção
    this.delete = async (req, res) => {
      try {
        const adocao = await Adoacao.findById(req.params.id)

        if (adocao && adocao.animal) {
          // Libera o animal para adoção novamente
          await Animal.findByIdAndUpdate(adocao.animal, { adotado: false })
        }

        await Adoacao.findByIdAndDelete(req.params.id)
        res.redirect('/adocao/lst')
      } catch (err) {
        console.error(err)
        res.status(500).send('Erro ao excluir adoção')
      }
    }
  }
}
