import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  generateSuccessResponse(statusCode: number, message: string, data: object) {
    return {
      statusCode,
      message,
      data,
    };
  }

  generateErrorResponse(statusCode: number, message: string, data?: object) {
    return {
      statusCode,
      message,
      data,
    };
  }
}
