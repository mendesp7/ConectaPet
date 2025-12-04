// config/multerConfig.js
import multer from 'multer'

const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    const tiposAceitos = ['image/jpeg', 'image/png']
    if (tiposAceitos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Apenas arquivos JPEG ou PNG são permitidos.'))
    }
  }
})

export default upload
