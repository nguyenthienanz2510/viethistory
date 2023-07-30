import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';

@Controller('media')
export class MediaController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Set the destination folder where the files will be saved
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          const fileBaseName = basename(file.originalname, fileExtName);
          const timeStamp = Math.floor(Date.now() / 1000).toString();
          const fileName = `${fileBaseName}-${timeStamp}${fileExtName}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return file;
  }
}
