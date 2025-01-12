import jwt from "jsonwebtoken";

const verify = async(req , res, next)=>{
    try {
        const token = req.headers.authorization;
        const jwtToken = token.split(" ");
        const decoded = jwt.verify(jwtToken[1],process.env.JWT_SECRET);

        req.user = decoded;

        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. No token provided.", status: 401 });
        }

        next()

    } catch (error) {
      return res.json({"message":error.message,status:500})
    }
}

export default verify;