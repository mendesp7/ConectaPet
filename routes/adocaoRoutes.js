import express from 'express'
const router = express.Router()

import AdoacaoController from '../controllers/adocaoController.js'
const adocaoCtrl = new AdoacaoController()

// Rotas CRUD de Adoção
router.get('/add', adocaoCtrl.openAdd)
router.post('/add', adocaoCtrl.add)
router.get('/lst', adocaoCtrl.list)
router.get('/edit/:id', adocaoCtrl.openEdit)
router.post('/edit/:id', adocaoCtrl.edit)
router.get('/delete/:id', adocaoCtrl.delete)

export default router
