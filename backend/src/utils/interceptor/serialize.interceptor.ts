import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { apiResponse } from 'src/common/response/apiResponse';

interface ClassContructor {
  new (...args: any[]): object;
}

export function serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return apiResponse.send(
          plainToClass(this.dto, data, { excludeExtraneousValues: true }),
          null,
        );
      }),
    );
  }
}
