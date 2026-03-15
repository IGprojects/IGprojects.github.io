import { Injectable, signal, computed, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TRANSLATIONS, LangType, TranslationKeys } from './translations';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLang = signal<LangType>('en');
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('lang');
      if (stored === 'en' || stored === 'es') {
        this.currentLang.set(stored);
      } else {
        const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
        this.currentLang.set(browserLang);
      }
    }
  }

  toggleLanguage() {
    this.currentLang.update(lang => {
      const newLang = lang === 'en' ? 'es' : 'en';
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('lang', newLang);
      }
      return newLang;
    });
  }

  // Returns a computed signal for a specific key
  translate(key: TranslationKeys) {
    return computed(() => TRANSLATIONS[this.currentLang()][key] || key);
  }
}

