import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private platformId = inject(PLATFORM_ID);

  private readonly siteName = 'IGPROJECTS | Ignasi Ferrés Iglesias';
  private readonly defaultDesc = 'Ignasi Ferrés Iglesias - Full Stack Developer / Computer Engineer based in Catalonia. Passionate about building scalable solutions and creative products.';
  private readonly baseUrl = 'https://igprojects.github.io';

  updateTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
  } = {}) {
    const finalTitle = config.title ? `${config.title} | ${this.siteName}` : this.siteName;
    const finalDesc = config.description || this.defaultDesc;
    const finalUrl = config.url || this.baseUrl;
    const finalImage = config.image || `${this.baseUrl}/assets/img/logo_ARSHOP.png`;
    const finalKeywords = config.keywords || 'Software Engineer, Full Stack Developer, Angular, Java, Node.js, Web Development, Portfolio, Ignasi Ferrés';

    this.title.setTitle(finalTitle);

    const tags = [
      { name: 'description', content: finalDesc },
      { name: 'keywords', content: finalKeywords },
      { name: 'author', content: 'Ignasi Ferrés Iglesias' },
      // Open Graph / Facebook
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: finalUrl },
      { property: 'og:title', content: finalTitle },
      { property: 'og:description', content: finalDesc },
      { property: 'og:image', content: finalImage },
      { property: 'og:site_name', content: this.siteName },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:url', content: finalUrl },
      { name: 'twitter:title', content: finalTitle },
      { name: 'twitter:description', content: finalDesc },
      { name: 'twitter:image', content: finalImage }
    ];

    tags.forEach(tag => {
      this.meta.updateTag(tag as any);
    });

    this.injectStructuredData();
  }

  private injectStructuredData() {
    if (!isPlatformBrowser(this.platformId)) return;

    const existingScript = document.getElementById('json-ld-seo');
    if (existingScript) {
      existingScript.remove();
    }

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': 'Ignasi Ferrés Iglesias',
      'jobTitle': 'Software Engineer & Full Stack Developer',
      'url': this.baseUrl,
      'sameAs': [
        'https://github.com/IGprojects',
        'https://www.linkedin.com/in/ignasiferres/'
      ],
      'knowsAbout': [
        'Angular', 'TypeScript', 'Java', 'Python', 'Node.js', 'Web Development', 'Software Architecture', 'Unity'
      ],
      'description': this.defaultDesc,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': 'Palafrugell',
        'addressRegion': 'Catalonia',
        'addressCountry': 'Spain'
      }
    };

    const script = document.createElement('script');
    script.id = 'json-ld-seo';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
