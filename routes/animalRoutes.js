import express from 'express'
import upload from '../config/multerConfig.js'   // ✅ IMPORTANTE
import AnimalController from '../controllers/animalController.js'

const router = express.Router()
const animalCtrl = new AnimalController()

// Rotas CRUD de Animal
router.get('/add', animalCtrl.openAdd)
router.post('/add', upload.single('foto'), animalCtrl.add)   // ✅ Upload ativo aqui
router.get('/lst', animalCtrl.list)
router.get('/edit/:id', animalCtrl.openEdit)
router.post('/edit/:id', upload.single('foto'), animalCtrl.edit)   // ✅ E aqui também
router.get('/delete/:id', animalCtrl.delete)
router.get('/foto/:id', animalCtrl.getFoto)


export default router
