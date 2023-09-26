import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"; // Corrected import
const prisma = new PrismaClient();

export default {
    async createSession(request, response) {
        try {
            const { email, password } = request.body;
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return response.json({ message: "usuário ou senha incorretos" });
            }

            const checkPassword = await compare(password, user.password);
            if (!checkPassword) {
                return response.json({ message: "usuário ou senha incorretos" });
            }

            const token = sign({ id: user.id }, "698dc19d489c4e4db73e28a713eab07b", {
                expiresIn: '1d'
            });

            delete user.password;

            return response.json({ user, token });
        } catch (error) {
            return response.json({ message: error.message });
        }
    }
}
