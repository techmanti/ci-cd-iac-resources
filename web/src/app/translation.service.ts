import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: Record<string, any> = {};
  private currentLangSubject = new BehaviorSubject<string>('br');
  currentLang$ = this.currentLangSubject.asObservable();

  constructor(private translocoService: TranslocoService, private http: HttpClient) {}

  loadTranslations(lang: string) {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(
      tap((translations: Record<string, any>) => {
        this.translations[lang] = translations;
        const translationObject = this.createTranslationObject(lang, translations);
        this.translocoService.setTranslation(translationObject);
        this.translocoService.setActiveLang(lang);
      }),
      catchError((error) => {
        console.error(`Error loading translations for ${lang}:`, error);
        return throwError(error);
      })
    );
  }

  private createTranslationObject(lang: string, translations: Record<string, any>) {
    const translationObject: Record<string, any> = {};

    for (const key in translations) {
      if (translations.hasOwnProperty(key)) {
        translationObject[key] = translations[key];
      }
    }

    return { [lang]: translationObject };
  }

  getTranslation(lang: string) {
    return this.translations[lang] || {};
  }

  setLanguage(lang: string): void {
    this.currentLangSubject.next(lang);
  }
}