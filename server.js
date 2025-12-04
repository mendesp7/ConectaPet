// api/server.js
import express from "express";
import session from "express-session";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import routes from "./routes/routes.js";

const app = express();

// 🔹 Permite receber dados de formulários
app.use(express.urlencoded({ extended: true }));

// 🔹 Configura EJS como engine de visualização
app.set("view engine", "ejs");

// 🔹 Resolve caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🔹 Serve a pasta "public" corretamente
app.use(express.static(join(__dirname, "../public")));

// 🔹 Define a pasta das views
app.set("views", join(__dirname, "../views"));

// 🔹 Configura sessão do usuário
app.use(
  session({
    secret: "escamboif-super-secreto", // troque se quiser
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

// 🔹 Middleware global para disponibilizar o usuário logado nas views
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  next();
});

// 🔹 Rotas principais
app.use(routes);

// 🔹 Rota raiz → redireciona para login se não autenticado
app.get("/", (req, res) => {
  if (req.session.usuario) {
    res.render("index", { sucesso: `Bem-vindo, ${req.session.usuario.nome}!`, erro: null });
  } else {
    res.redirect("/login");
  }
});

// 🔹 Sobe o servidor
app.listen(3001, () => console.log("✅ Servidor rodando em http://localhost:3001"));
