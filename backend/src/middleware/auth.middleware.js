const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(`Middleware called for ${req.method} ${req.path}`);  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user", decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { protect };
