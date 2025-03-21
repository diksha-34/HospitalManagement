const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // Find the user associated with the token
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      // Attach the user to the request object
      req.user = user;

      // Proceed to the next middleware or route
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired. Please log in again." });
      }

      res.status(401).json({ message: "Not authorized, token verification failed." });
    }
  } else {
    console.error("No Authorization Header Provided.");
    res.status(401).json({ message: "Not authorized, no token provided." });
  }
};

module.exports = { protect };
