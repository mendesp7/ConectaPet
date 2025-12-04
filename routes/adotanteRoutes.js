import express from 'express'
const router = express.Router()

import AdotanteController from '../controllers/adotanteController.js'
const adotanteCtrl = new AdotanteController()

// Rotas CRUD de Adotante
router.get('/add', adotanteCtrl.openAdd)
router.post('/add', adotanteCtrl.add)
router.get('/lst', adotanteCtrl.list)
router.get('/edit/:id', adotanteCtrl.openEdit)
router.post('/edit/:id', adotanteCtrl.edit)
router.get('/delete/:id', adotanteCtrl.delete)

export default router
