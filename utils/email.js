import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

console.log("DEBUG EMAIL ENV:", process.env.EMAIL_USER, process.env.EMAIL_PASS ? "senha OK" : "sem senha")

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true para SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export async function enviarEmail(destinatario, assunto, mensagemHtml) {
  try {
    const info = await transporter.sendMail({
      from: `"Equipe ConectaPet" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: assunto,
      html: mensagemHtml
    })
    console.log('✅ E-mail enviado:', info.messageId)
    return true
  } catch (error) {
    console.error('❌ Erro ao enviar e-mail:', error)
    return false
  }
}
