const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function pesquisarImoveis(request, response) {
  try {
    const { cidade } = request.query;

    const resultadosDaBusca = await prisma.imobi.findMany({
      where: {
        cidade: {
          contains: cidade,
        },
      },
    });

    return response.json(resultadosDaBusca);
  } catch (error) {
    return response.json({ message: error.message });
  }
}

module.exports = pesquisarImoveis;