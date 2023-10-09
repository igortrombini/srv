// ImobiController.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  async craeteImobi(request, response) {
    // ... (código existente para criar um imóvel)

    return response.json({
      error: false,
      message: "Sucesso: Imóvel cadastrado com sucesso!",
      imobi,
    });
  },

  async findAllImobi(request, response) {
    // ... (código existente para buscar todos os imóveis)

    return response.json(imobi);
  },

  async findImobi(request, response) {
    // ... (código existente para buscar um imóvel por slug)

    return response.json(imobi);
  },

  async findImobiByCity(request, response) {
    try {
      const { cityName } = request.params;

      const imoveis = await prisma.imobi.findMany({
        where: {
          cidade: cityName,
        },
      });

      if (!imoveis || imoveis.length === 0) {
        return response.status(404).json({ message: "Não foram encontrados imóveis para esta cidade." });
      }

      return response.json({ imoveis });
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  },

  async createMessage(request, response) {
    // ... (código existente para criar uma mensagem)

    return response.json(message);
  },
};
