import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MissingLetterInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data && data.name) {
          const missingLetter = this.getMissingLetter(data.name);
          return { ...data, missingLetter };
        }
        return data;
      }),
    );
  }

  private getMissingLetter(name: string): string {
    const normalized = name.toLowerCase();
    const letters = new Set(normalized.match(/[a-z]/g));
    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(97 + i); // 'a' to 'z'
      if (!letters.has(letter)) {
        return letter;
      }
    }
    return '_';
  }
}
