// translation-shared.service.ts
import { Injectable, EventEmitter } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslationSharedService {
  translationUpdated = new EventEmitter<string>();

  constructor(private translocoService: TranslocoService) {}

  updateTranslation(translationKey: string) {
    const translation = this.translocoService.translate(translationKey);
    this.translationUpdated.emit(translation);
  }
}