import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav'; // Importe MatSidenav
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isScrolled: boolean = false;
  lang: string;

  constructor(private route: ActivatedRoute) {
    this.lang = 'br'; 
    this.route.params.subscribe(params => {
      this.lang = params['lang'] || 'br';
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }

  closeSidenav(secaoId: string) {
    this.sidenav.close();
    const element = document.getElementById(secaoId);
    if (element) {
      const offset = -80
      const topPos = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos + offset,
        behavior: 'smooth'
      });
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }
}
