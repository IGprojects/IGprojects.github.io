import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { SeoService } from './services/seo.service';
import { NgIf, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, UpperCasePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  themeService = inject(ThemeService);
  langService = inject(LanguageService);
  seoService = inject(SeoService);

  constructor() {
    this.seoService.updateTags();
  }

  get isDark() {
    return this.themeService.isDarkMode();
  }
}
