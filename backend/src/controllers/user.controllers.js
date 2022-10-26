const User = require("../models/user.models");

exports.registerNewUser = async (req, res) => {
  try {
    //VERIFICANDO VALIDADE de nome, email e senha
    if (req.body.name == "" || req.body.name.lenght <= 4)
      return res.status(409).send({ message: "Nome inválido!" });

    const regex_email_valido =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!regex_email_valido.test(req.body.email)) {
      return res.status(409).json({ message: "Email Inválido!" });
    }

    const count = req.body.password.length;
    if (count < 6) {
      return res
        .status(409)
        .json({ message: "A senha deve ter no mínimo 6 caracteres." });
    }

    let isUser = await User.find({ email: req.body.email });
    console.log(isUser);

    if (isUser.length >= 1) {
      return res
        .status(409)
        .json({ message: "Atenção! Este e-mail já possui registro!" });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    const token = await newUser.generateAuthToken(); // ==> Aqui chamaremos o método que criamos no model
    return res
      .status(201)
      .json({ message: "Usuário(a) criado(a) com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

exports.loginUser = async (req, res) => {
  try {
    if (req.body.email == "" || req.body.password == "")
      return res.status(409).send({ message: "Campos inválidos!" });

    const email = req.body.email;
    const senha = req.body.password;

    const user = await User.findbyCredentials(email, senha);
    const token = await user.generateAuthToken();

    return res
      .status(201)
      .json({ message: "Usuário logado com sucesso!", user, token });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

exports.userProfile = async (req, res) => {
  await res.json(req.userData);
};
