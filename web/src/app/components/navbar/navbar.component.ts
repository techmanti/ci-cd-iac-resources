import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
declare var $: any; // Importe o jQuery, se necessário

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {

  lang = this. translocoService.getActiveLang();
  constructor(private translocoService: TranslocoService) {}
  
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = -100; // Define a quantidade de pixels que deseja parar antes da âncora
      const topPos = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos + offset,
        behavior: 'smooth'
      });
    }
  }

  }