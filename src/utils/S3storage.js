import { S3 } from '@aws-sdk/client-s3'
import path from 'path';
import mime from 'mime';
import fs from 'fs';

const uploadConfig = require('../middlewares/upload');

class S3storage {
    constructor() {
        this.client = new S3({
            region: 'sa-east-1',
        });

    }

    async saveFile(filename) {
        const originalPath = path.resolve(uploadConfig.directory, filename);

        const ContentType = mime.getType(originalPath);

        if (!ContentType) {
            throw new Error("File not found");
        }

        const fileContent = await fs.readFile(originalPath);

        await this.client.putObject({
            Bucket: 'imobi-server',
            Key: filename,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
        }).promise();

        await fs.unlink(originalPath);
    }
}

module.exports = S3storage;