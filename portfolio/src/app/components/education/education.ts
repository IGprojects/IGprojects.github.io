import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-education',
  imports: [],
  templateUrl: './education.html',
  styles: ``
})
export class Education {
  langService = inject(LanguageService);
}
