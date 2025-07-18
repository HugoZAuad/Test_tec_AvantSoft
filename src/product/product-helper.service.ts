import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductHelperService {
  getMissingLetter(name: string): string {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const nameLetters = new Set(name.toLowerCase().replace(/[^a-z]/g, ''));
    for (const letter of letters) {
      if (!nameLetters.has(letter)) {
        return letter;
      }
    }
    return '_';
  }
}
