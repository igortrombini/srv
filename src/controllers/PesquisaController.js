const { PrismaClient } = require("@prisma/client");
const unorm = require("unorm");

const prisma = new PrismaClient();

async function pesquisarImoveis(request, response) {
  try {
    const { cidade } = request.query;

    // Normaliza a entrada da cidade para ser insensível a acentos
    const cidadeNormalizada = unorm.nfkd(cidade).replace(/[\u0300-\u036f]/g, "");

    const resultadosDaBusca = await prisma.imobi.findMany({
      where: {
        cidade: {
          contains: cidadeNormalizada,
        },
      },
    });

    return response.json(resultadosDaBusca);
  } catch (error) {
    return response.json({ message: error.message });
  }
}

module.exports = pesquisarImoveis;