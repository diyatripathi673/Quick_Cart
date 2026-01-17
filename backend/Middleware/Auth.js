// Middleware/Auth.js
import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Please login first" });

  const token = authHeader.split(" ")[1]; // Bearer token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email }; // attach user
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default ensureAuthenticated;

// import jwt from "jsonwebtoken";

// const ensureAuthenticated = (req, res, next) => {
//   const auth = req.headers.authorization;

//   if (!auth) {
//     return res.status(403).json({
//       message: "Unauthorized, JWT token missing",
//     });
//   }

//   try {
//     const token = auth.split(" ")[1]; // Bearer TOKEN

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default ensureAuthenticated;

// import jwt from "jsonwebtoken";

// const ensureAuthenticated = (req, res, next) => {
//   const auth = req.headers.authorization;
//   if (!auth) {
//     return res.status(403).json({ message: "Unauthorized , JWT token" });
//   }
//   try {
//     const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

// export default ensureAuthenticated;
