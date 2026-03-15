import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { Projects } from '../projects/projects';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { Footer } from '../footer/footer';
import { Experience } from '../experience/experience';
import { Education } from '../education/education';
import { Certifications } from '../certifications/certifications';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, About, Experience, Education, Certifications, Projects, Contact, Footer],
  template: `
    <app-hero></app-hero>
    <app-about></app-about>
    <app-experience></app-experience>
    <app-education></app-education>
    <app-certifications></app-certifications>
    <app-projects></app-projects>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
})
export class Home {}
