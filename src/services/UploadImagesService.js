import S3Storage from '../utils/S3storage'

class UploadImagesService {
    async execute(file) {
        const s3storage = new S3Storage();

        await s3storage.saveFile(file.filename);
    }
}

export default UploadImagesService;
