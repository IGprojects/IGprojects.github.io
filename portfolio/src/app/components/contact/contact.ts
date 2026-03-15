import { Component, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  langService = inject(LanguageService);
  http = inject(HttpClient);

  isSubmitting = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  sendEmail(form: NgForm) {
    if (form.valid) {
      this.isSubmitting.set(true);
      this.errorMessage.set('');
      
      // NOTA: Usaremos un ID de formulario de Formspree. 
      const endpoint = 'https://formspree.io/f/meerlnzn'; // ID de Formspree del usuario

      this.http.post(endpoint, form.value).subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          this.isSuccess.set(true);
          form.resetForm();
          alert('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
          console.error('Formspree Error:', err);
          alert('Error al enviar. Por favor, asegúrate de que el formulario de Formspree esté activo.');
        }
      });
    }
  }
}

