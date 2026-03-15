import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styles: ``
})
export class Experience {
  langService = inject(LanguageService);
}
