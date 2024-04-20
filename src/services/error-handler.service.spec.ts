import { ErrorHandlerService } from './error-handler.service';
import { HttpException } from '@nestjs/common';

describe('ErrorHandlerService', () => {
  let errorHandlerService: ErrorHandlerService;

  beforeEach(() => {
    errorHandlerService = new ErrorHandlerService();
  });

  it('should handle error and return status code and message', () => {
    const error = new Error('Test error');
    const result = errorHandlerService.handleError(error);
    expect(result.status).toBe(500);
    expect(result.message).toBe('Internal server error');
  });

  it('should handle HttpException and return status code and message', () => {
    const httpException = new HttpException('Test message', 404);
    const result = errorHandlerService.handleError(httpException);
    expect(result.status).toBe(404);
    expect(result.message).toBe('Test message');
  });
});
