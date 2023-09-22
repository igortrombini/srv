import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async createUser(request, response) {
    const { name, email, password } = request.body;
    try {
      // Verifique se o usuário já existe pelo email
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        return response.status(400).json({ message: "Usuário já existe" });
      }

      // Crie um novo usuário usando prisma.user.create
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      return response.status(201).json(newUser);
    } catch (error) {
      // Retorne o erro real para diagnóstico
      return response.status(500).json({ message: error.message });
    } finally {
      // Certifique-se de fechar a conexão do Prisma
      await prisma.$disconnect();
    }
  },
};
