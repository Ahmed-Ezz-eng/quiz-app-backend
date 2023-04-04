
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        
        const token = req.headers.authorization;
        const isCustomToken = token.length < 500;

        let decodedData;

        if (token && isCustomToken) {
            decodedData =  jwt.verify(token, process.env.SECRET_TOKEN);
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log("backend auth ", error);
    }
}

export default auth;