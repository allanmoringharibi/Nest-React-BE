import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UsersService } from '../users/users.service';

@Injectable()
export class UpdateInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const id = parseInt(context.switchToHttp().getRequest().params.id);

    try {
      const userBeforeUpdate = await this.usersService.findById(id);
      if (!userBeforeUpdate) {
        throw new HttpException(
          `User with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return next.handle().pipe(
        tap(async () => {
          const userAfterUpdate = await this.usersService.findById(id);

          if (userAfterUpdate) {
            const { fullName } = userBeforeUpdate;
            const { fullName: updatedFullName } = userAfterUpdate;

            const previousValue = fullName;
            const newValue = updatedFullName;
            const timestamp = new Date();
            await this.usersService.updateUserFields(id, {
              previousValue,
              newValue,
              timestamp,
            });
          }
        }),
        catchError(() => {
          // Handle any errors that occur during the interception process
          return new Observable((observer) => {
            observer.error(
              new HttpException(
                'Interception process failed',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
            );
          });
        }),
      );
    } catch (error) {
      // Handle errors from findById method
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
