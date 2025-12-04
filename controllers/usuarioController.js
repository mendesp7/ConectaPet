// controllers/usuarioController.js
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export default class UsuarioController {
  // Renderizar tela de cadastro
  static async cadastroForm(req, res) {
    res.render("cadastro", { erro: null });
  }

  // Cadastrar novo usuário
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const existente = await Usuario.findOne({ email });

      if (existente) {
        return res.render("cadastro", { erro: "E-mail já cadastrado!" });
      }

      const hash = await bcrypt.hash(senha, 10);
      const novo = new Usuario({ nome, email, senha: hash });
      await novo.save();

      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.render("cadastro", { erro: "Erro ao cadastrar usuário." });
    }
  }

  // Renderizar tela de login
  static async loginForm(req, res) {
    res.render("login", { erro: null });
  }

  // Login do usuário
  static async login(req, res) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ email });

      if (!usuario) {
        return res.render("login", { erro: "Usuário não encontrado!" });
      }

      const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

      if (!senhaCorreta) {
        return res.render("login", { erro: "Senha incorreta!" });
      }

      req.session.usuario = usuario;
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.render("login", { erro: "Erro ao fazer login." });
    }
  }

  static async logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}
