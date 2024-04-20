import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleError(error: Error): { status: number; message: string } {
    console.error('An error occurred:', error.message);
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (error instanceof HttpException) {
      status = error.getStatus();
      message = error.message;
    }

    return { status, message };
  }
}
