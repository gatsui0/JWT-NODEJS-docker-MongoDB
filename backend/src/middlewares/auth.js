const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    const decoded = jwt.verify(token, 'secret');
    req.userData = decoded;
    console.log(decoded);
    next();

  } catch (error) {
    return res.status(401).json({message: error.message});
  }
};
