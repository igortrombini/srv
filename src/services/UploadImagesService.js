const S3storage = require('../utils/S3storage');

class UploadImagesService {
    async execute(file) {
        const s3storage = new S3storage();

        await s3storage.saveFile(file.filename);
    }
}

module.exports = UploadImagesService;
