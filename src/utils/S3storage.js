import { S3 } from '@aws-sdk/client-s3';
import path from 'path';
import mime from 'mime';
import fs from 'fs/promises'; // Alterado para 'fs/promises'

import uploadConfig from '../middlewares/upload';

class S3storage {
  constructor() {
    this.client = new S3({
      region: 'sa-east-1',
    });
  }

  async saveFile(filename) {
    const originalPath = path.resolve(uploadConfig.directory, filename);

    // Verificar se o arquivo existe
    const fileExists = await fs.access(originalPath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      throw new Error("File not found");
    }

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error("Could not determine content type");
    }

    // Usar fs.promises.readFile para criar um buffer do arquivo
    const fileContent = await fs.readFile(originalPath);

    try {
      await this.client.putObject({
        Bucket: 'imobi-server',
        Key: filename,
        ACL: 'public-read',
        Body: fileContent, // Use o buffer diretamente
        ContentType,
      });

      // Excluir o arquivo local após o upload bem-sucedido
      await fs.unlink(originalPath);
    } catch (error) {
      console.error("Error during S3 upload:", error);
      throw new Error("Failed to upload file to S3");
    }
  }
}

export default S3storage;
