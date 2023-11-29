import { PrismaClient } from "@prisma/client";
import UploadImagesService from "../services/UploadImagesService";
const prisma = new PrismaClient();

export default {
  async createImobi(request, response) {
    try {
      const thumb = request.file.filename;
      //Upload na amazon
      const { file } = request;
      const uploadImagesService = new UploadImagesService();

      await uploadImagesService.execute(file);


      const { id, name, email, telefone, tipo, endereco, cidade, uf, valor, descricao } = request.body;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) {
        return response.json({ message: "Usuario inexistente" });
      }

      const slugify = str =>
        str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');

      const slug = slugify(tipo);

      // Concatenar AWS_BUCKET_URL com o nome do arquivo thumb
      const awsBucketUrl = process.env.AWS_BUCKET_URL;
      const thumbUrl = `${awsBucketUrl}/${thumb}`;

      const imobi = await prisma.imobi.create({
        data: {
          thumb: thumbUrl, // Usar a URL completa para o campo thumb
          tipo,
          endereco,
          cidade,
          uf,
          valor,
          descricao,
          name,
          email,
          telefone,
          slug,
          userId: user.id,
        }
      });

      return response.json({
        error: true,
        message: "Sucesso: Imóvel cadastrado com sucesso!",
        imobi
      });

    } catch (error) {
      return response.json({ message: error.message });
    }
  },
  async findAllImobi(request, response) {
    try {

      const imobi = await prisma.imobi.findMany({
        include: {
          author: true,
        }
      });

      return response.json(imobi);

    } catch (error) {
      return response.json({ message: error.message });
    }
  },
  async findImobi(request, response) {
    try {
      //slug deveria ser o id
      const { slug } = request.params;
      const imobi = await prisma.imobi.findUnique({
        where: {
          id: parseInt(slug, 10),
        }
      });

      if (!imobi) {
        return response.json({ message: "Não encontramos nenhum imóvel cadstrado!" })
      }

      return response.json(imobi);

    } catch (error) {
      return response.json({ message: error.message })
    }
  },
  async createMessage(request, response) {
    try {
      const { name, email, messagem, userId } = request.body;

      const message = await prisma.message.create({
        data: {
          name,
          email,
          messagem,
          userId
        }
      });

      return response.json(message);

    } catch (error) {
      return response.json({ message: error.message })
    }
  }
};