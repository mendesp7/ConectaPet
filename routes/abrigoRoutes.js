import express from 'express'
const router = express.Router()

import AbrigoController from '../controllers/abrigoController.js'
const abrigoCtrl = new AbrigoController()

// Rotas CRUD de Abrigo
router.get('/add', abrigoCtrl.openAdd)
router.post('/add', abrigoCtrl.add)
router.get('/lst', abrigoCtrl.list)
router.get('/edit/:id', abrigoCtrl.openEdit)
router.post('/edit/:id', abrigoCtrl.edit)
router.get('/delete/:id', abrigoCtrl.delete)

export default router
