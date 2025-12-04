// config/conexao.js
import mongoose from 'mongoose'
const uri = 'mongodb+srv://joaomendesp7:mendes0208@mendes.ge0c6nx.mongodb.net/'
async function conectarMongo() {
  try {
    await mongoose.connect(uri)
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!')
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err)
  }
}

await conectarMongo()

export default mongoose
