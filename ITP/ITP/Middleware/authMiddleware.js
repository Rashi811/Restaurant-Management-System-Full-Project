// const jwt = require('jsonwebtoken');

// const authMiddleware = (allowedRoles) => {
//     return (req, res, next) => {
//         const token = req.headers['authorization'];

//         if (!token) {
//             return res.status(403).json({ message: "Access denied" });
//         }

//         try {
//             const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
//             if (!allowedRoles.includes(decoded.role)) {
//                 return res.status(403).json({ message: "You do not have permission to access this route" });
//             }
//             req.user = decoded; // You can attach user information to req
//             next();
//         } catch (err) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//     };
// };

// module.exports = authMiddleware;
