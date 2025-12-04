// index.js
import express from 'express'
import session from 'express-session'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 🔹 Conexão com o banco de dados MongoDB
import './config/conexao.js'

// 🔹 Importa as rotas principais e os módulos CRUD
import routes from './routes/routes.js'
import animalRoutes from './routes/animalRoutes.js'
import abrigoRoutes from './routes/abrigoRoutes.js'
import adotanteRoutes from './routes/adotanteRoutes.js'
import adocaoRoutes from './routes/adocaoRoutes.js'
import authRoutes from './routes/authRoutes.js' // ← rotas de login/cadastro

// 🔹 Cria o app Express
const app = express()

// 🔹 Middleware para lidar com formulários e JSON
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// 🔹 Sessão de usuário (para login persistente)
app.use(session({
  secret: 'conectapet-superseguro', // troque por algo mais forte em produção
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2 // sessão expira em 2h
  }
}))

// 🔹 Deixa o usuário logado acessível nas views EJS
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null
  next()
})

// 🔹 Configurações de diretórios
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', join(__dirname, '/views'))
app.use(express.static(join(__dirname, '/public')))

// 🔹 Rotas principais
app.use('/', routes)

// 🔹 Rotas dos módulos CRUD
app.use('/animal', animalRoutes)
app.use('/abrigo', abrigoRoutes)
app.use('/adotante', adotanteRoutes)
app.use('/adocao', adocaoRoutes)

// 🔹 Rotas de autenticação
app.use('/auth', authRoutes)

// 🔹 Página 404 para rotas inexistentes
app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página não encontrada' })
})

// 🔹 Inicia o servidor local
app.listen(3001, () => {
  console.log('🐾 Servidor rodando em: http://localhost:3001')
})

// 🔹 Exporta para ambientes externos (ex: Vercel)
export default app
