import { Injectable } from '@angular/core';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationSharedService {
  constructor(private translationService: TranslationService) {}

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  loadTranslations(lang: string): void {
    this.translationService.loadTranslations(lang).subscribe();
  }
}
