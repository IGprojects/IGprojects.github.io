import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkMode = signal<boolean>(true); // Default to dark mode for cyberpunk
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.initTheme();
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
    this.applyTheme();
  }

  private initTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('theme');
      if (stored) {
        this.isDarkMode.set(stored === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // We prefer dark for this cyberpunk theme by default
        this.isDarkMode.set(true); 
      }
    }
    this.applyTheme();
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode()) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }
}

