import { Component, inject, signal, computed, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { CommonModule, NgFor, NgClass, NgIf } from '@angular/common';
import { TranslationKeys } from '../../services/translations';

interface Project {
  nameKey: TranslationKeys;
  descKey: TranslationKeys;
  image: string;
  tags: string[];
  link: string;
  color: string;
  imageClass: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, NgFor, NgClass],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit, OnDestroy {
  langService = inject(LanguageService);

  currentIndex = signal(0);
  itemsPerPage = signal(this.calculateItemsPerPage());
  private autoPlayInterval: any;

  @HostListener('window:resize')
  onResize() {
    this.itemsPerPage.set(this.calculateItemsPerPage());
  }

  projects: Project[] = [
    {
      nameKey: 'PROJ_1_NAME',
      descKey: 'PROJ_1_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_ARSHOP-removebg-preview.png',
      tags: ['Unity', 'C#', 'PHP', 'MySQL', 'Vuforia', 'Augmented Reality'],
      link: 'https://github.com/IGprojects/AR-Shop',
      color: 'neon-cyan',
      imageClass: 'p-0'
    },
    {
      nameKey: 'PROJ_10_NAME',
      descKey: 'PROJ_10_DESC',
      image: 'assets/img/logo_fidelityrecordNobackground.png',
      tags: ['Angular', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vercel', 'Render'],
      link: 'https://fidelity-records-frontend.vercel.app/inicio',
      color: 'neon-purple',
      imageClass: 'p-2'
    },
    {
      nameKey: 'PROJ_2_NAME',
      descKey: 'PROJ_2_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_taxisimulator-removebg-preview.png',
      tags: ['Algoritmia', 'Java', 'JavaFX', 'Optimization'],
      link: 'https://github.com/IGprojects/Taxi-Simulator',
      color: 'neon-magenta',
      imageClass: 'p-4'
    },
    {
      nameKey: 'PROJ_3_NAME',
      descKey: 'PROJ_3_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_SPOTIFYBACKUP-removebg-preview (1).png',
      tags: ['API', 'Java', 'JavaFX', 'JSON'],
      link: 'https://github.com/IGprojects/Spotify-Backup-App',
      color: 'neon-purple',
      imageClass: 'p-4'
    },
    {
      nameKey: 'PROJ_4_NAME',
      descKey: 'PROJ_4_DESC',
      image: 'assets/img/LOGO_TABRUSH-removebg-preview (1).png',
      tags: ['React', 'Java', 'HTML5', 'CSS'],
      link: 'https://github.com/IGprojects/TabRush',
      color: 'neon-blue',
      imageClass: 'p-4'
    },
    {
      nameKey: 'PROJ_5_NAME',
      descKey: 'PROJ_5_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/LOGO_Linktube.png',
      tags: ['JavaScript', 'HTML', 'CSS', 'Extension', 'API'],
      link: 'https://github.com/IGprojects/spotifyLinkURL---LinkTube',
      color: 'neon-cyan',
      imageClass: 'p-6'
    },
    {
      nameKey: 'PROJ_6_NAME',
      descKey: 'PROJ_6_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_MATHSISLAND-removebg-preview (1).png',
      tags: ['Unity', 'C#', 'Education', '3D'],
      link: 'https://github.com/IGprojects/Maths-Island',
      color: 'neon-magenta',
      imageClass: 'p-0 scale-[1.5]'
    },
    {
      nameKey: 'PROJ_7_NAME',
      descKey: 'PROJ_7_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_TRANSPOTRAVEL-removebg-preview (1).png',
      tags: ['JAVA', 'JAVAFX', 'CSS', 'MYSQL', 'ECLIPSE IDE'],
      link: 'https://github.com/IGprojects/Agencia_de_Viajes-Transpotravel',
      color: 'neon-purple',
      imageClass: 'p-0 scale-[1.5]'
    },
    {
      nameKey: 'PROJ_8_NAME',
      descKey: 'PROJ_8_DESC',
      image: 'assets/img/LOGOS_NOGACKGROUND/logo_FOOTWAY-removebg-preview.png',
      tags: ['PHP', 'HTML', 'CSS', 'JS', 'MYSQL', 'VISUAL STUDIO'],
      link: 'https://github.com/IGprojects/Footway-Pagina-de-Apuestas',
      color: 'neon-blue',
      imageClass: 'p-2'
    },
    {
      nameKey: 'PROJ_9_NAME',
      descKey: 'PROJ_9_DESC',
      image: 'assets/img/logoporfoliov1NOBACKG.png',
      tags: ['HTML/CSS', 'JS', 'Angular', 'TypeScript'],
      link: 'https://github.com/IGprojects/Portfolio-V1',
      color: 'neon-cyan',
      imageClass: 'p-6'
    }
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  public startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 4000);
  }

  public stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private calculateItemsPerPage(): number {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  private getItemsPerPage(): number {
    return this.itemsPerPage();
  }

  next() {
    const perPage = this.getItemsPerPage();
    this.currentIndex.update(v => {
      const nextIdx = v + 1;
      // Si el siguiente índice dejaría huecos vacíos al final, volvemos al principio
      if (nextIdx > this.projects.length - perPage) {
        return 0;
      }
      return nextIdx;
    });
  }

  prev() {
    const perPage = this.getItemsPerPage();
    this.currentIndex.update(v => {
      if (v <= 0) {
        return this.projects.length - perPage;
      }
      return v - 1;
    });
  }

  goToSlide(index: number) {
    const perPage = this.getItemsPerPage();
    // Aseguramos que no podamos ir a un índice que deje huecos vacíos
    const safeIndex = Math.min(index, this.projects.length - perPage);
    this.currentIndex.set(safeIndex);
    this.startAutoPlay();
  }
}
