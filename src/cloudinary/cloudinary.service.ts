import { ForbiddenException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { basename, extname } from 'path';

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      const fileExtName = extname(file.originalname);
      const fileBaseName = basename(file.originalname, fileExtName);
      const timeStamp = Math.floor(Date.now() / 1000).toString();
      const fileName = `${fileBaseName}-${timeStamp}`;

      return new Promise((resolve, reject) => {
        v2.uploader
          .upload_stream(
            {
              resource_type: 'auto',
              public_id: fileName,
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          )
          .end(file.buffer);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new ForbiddenException('File upload failed');
    }
  }

  async uploadFiles(files: Express.Multer.File[]) {
    try {
      const results = await Promise.all(
        files.map(
          async (
            file: Express.Multer.File,
          ): Promise<UploadApiResponse | UploadApiErrorResponse> => {
            const result = await this.uploadFile(file);
            return result;
          },
        ),
      );
      return results;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw new ForbiddenException('File upload failed');
    }
  }

  async uploadFileFromUrl(
    url: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(url);
  }

  async uploadFilesFromUrl(urls: string[]) {
    return Promise.all(
      urls.map(async (url: string): Promise<string> => {
        const { secure_url } = await this.uploadFileFromUrl(url);
        return secure_url;
      }),
    );
  }

  async uploadFileFromBase64(
    data: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return v2.uploader.upload(data);
  }

  async uploadManyBase64(files: string[]) {
    const urls = await Promise.all(
      files.map(async (file): Promise<string> => {
        const { secure_url } = await this.uploadFileFromBase64(file);
        return secure_url;
      }),
    );
    return urls;
  }

  async deleteFile(public_id: string): Promise<any> {
    try {
      const result = await v2.uploader.destroy(public_id);
      return result;
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new ForbiddenException(error);
    }
  }
}
