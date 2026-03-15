import { Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule } from '@angular/common';

export interface Certification {
  title: string;
  issuer: string;
  link: string | null;
}

@Component({
  selector: 'app-certifications',
  imports: [CommonModule],
  templateUrl: './certifications.html',
  styles: ``
})
export class Certifications {
  langService = inject(LanguageService);

  // Ordered by importance: Oficials, Ciberseguridad, Frontend, Backend, Infra.
  allCertifications = signal<Certification[]>([
    // Oficials & Idiomes
    { title: "First Certificate - B2", issuer: "Cambridge", link: null },
    { title: "Preliminary English Test - B1", issuer: "Cambridge", link: null },
    { title: "Actic - Nivel Básico", issuer: "Generalitat", link: null },

    // Ciberseguretat
    { title: "Curso OSINT: Técnicas de investigación", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/hw07" },
    { title: "Hacking Tools & Forensic: Red Team", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/NiMZ" },
    { title: "Hacking Tools: Blue Team", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/O9HA" },
    { title: "Curso de Hacking web", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/YLiN" },
    { title: "Espionaje y Cibervigilancia", issuer: "INCIBE", link: null },

    // Frontend & JavaScript
    { title: "Master en JavaScript (Angular, NodeJS)", issuer: "Udemy", link: "https://ude.my/UC-aef5c6d0-ab96-4d83-8d3f-124d143f6942" },
    { title: "Angular 11 para principiantes", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/qqBj" },
    { title: "TypeScript", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/5aKR" },
    { title: "ECMAScript 6", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/jG4B" },
    { title: "JavaScript Avanzado", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/NMNwr" },
    { title: "JavaScript Prototypes", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/3HFz?r" },
    { title: "Promises en JavaScript", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/Q4IF" },
    { title: "HTML5 y CSS3", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/R3AmE" },
    { title: "jQuery", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/3HaW?r=df9916b2f&t=1676415090" },

    // Backend & Programació
    { title: "Llenguatge C++ de CERO a EXPERTO", issuer: "Udemy", link: "https://www.udemy.com/certificate/UC-5f6f3ba5-cb63-4b10-96b2-e4111c2064b4/" },
    { title: "Python: Aprende a programar", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/86QwQ" },
    { title: "Java 8 desde cero", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/7K7aE" },
    { title: "C# Intermedio", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/bRQF" },
    { title: "PHP: Ampliando conceptos", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/vNrW" },
    { title: "SQL desde Cero", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/YZQpJ" },

    // Eines & Infraestructura
    { title: "Docker para Desarrolladores", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/lEaPA" },
    { title: "Git", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/WzeD9" },
    { title: "MongoDB: NoSQL", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/lQa8" },
    { title: "Odoo", issuer: "OpenWebinars", link: "https://openwebinars.net/cert/b9lY3" },
    { title: "Routing and Switching: Introduction", issuer: "Cisco", link: null }
  ]);

  searchQuery = signal<string>('');

  // Computed signal that filters certifications based on the search query
  filteredCerts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) {
      return this.allCertifications();
    }
    return this.allCertifications().filter(cert => 
      cert.title.toLowerCase().includes(query) || 
      cert.issuer.toLowerCase().includes(query)
    );
  });

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}

