import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
    async createImobi(request, response) {
        try {
            const { id, tipo, endereco, cidade, uf, valor, descricao } = request.body;

            const user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                return response.status(404).json({ message: "Usuário Não Encontrado!" });
            }

            const imobi = await prisma.imobi.create({
                data: {
                    tipo,
                    endereco,
                    cidade,
                    uf,
                    valor,
                    descricao,
                    userId: user.id
                }
            });

            return response.json(imobi);

        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Erro ao criar o Imóvel." });
        }
    }
}
