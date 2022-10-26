const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, maxlenght: 80, required: true },
    email: { type: String, maxlenght: 80, required: true },
    password: { type: String, maxlenght: 80, required: true },
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

//responsavel por fazer a hash da senha antes de salvar o modelo user
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//gera uma authenticacao auth para o user
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    "secret",
    { expiresIn: Math.floor(Date.now() / 1000) - 30 }
  );
  console.log(user.email);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findbyCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Login não encontrado!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("senha invalida!");
  }

  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
