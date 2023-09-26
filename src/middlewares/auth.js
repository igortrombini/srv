import jwt from "jsonwebtoken"; // Corrected import

export default function auth(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(401).json({ message: "Não Autorizado" });
    }

    // Remove 'Bearer ' and trim spaces
    const token = authorization.replace('Bearer', '').trim();
    
    try {
        const data = jwt.verify(token, '698dc19d489c4e4db73e28a713eab07b');
        const { id } = data;
        request.userId = id;

        return next();

    } catch (error) {
        return response.status(401).json({ message: "Não Autorizado" });
    }
}
