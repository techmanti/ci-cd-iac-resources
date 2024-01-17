import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  serviceInfos: any = [];
  showMore: { [key: number]: boolean } = {};

  languages = [
    { value: 'br', flag: 'assets/images/br.png', label: 'Português', alt: 'Portuguese Flag' },
    { value: 'en', flag: 'assets/images/uk.png', label: 'English', alt: 'English Flag' },
  ];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private translocoService: TranslocoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.translocoService.langChanges$.subscribe(lang => {
      this.loadTranslations();
    });
    this.loadTranslations();
  }
  
  async loadTranslations(): Promise<void> {  
    const activeLang = this.translocoService.getActiveLang();
      const [enTranslation, ptBrTranslation] = await Promise.all([
      this.translocoService.load('en').toPromise(),
      this.translocoService.load('br').toPromise()
    ]);
  
    this.serviceInfos = ServicesInfo.map(service => ({
      ...service,
      title: this.translocoService.translate(`services.${service.id}.title`),
      subtitle: this.translocoService.translate(`services.${service.id}.subtitle`),
      text: this.translocoService.translate(`services.${service.id}.text`)
    }));
  
    if (activeLang !== this.translocoService.getActiveLang()) {
      await this.loadTranslations();
    }
  }

  changeLanguage(language: string): void {
    this.translocoService.setActiveLang(language);
  
    if (language === 'br') {
      this.router.navigate(['/br']);
    } else if (language === 'en') {
      this.router.navigate(['/en']);
    }
  }
  
  reloadPage(): void {
    location.reload();
  }

  toggleMore(cardId: number): void {
    this.showMore[cardId] = !this.showMore[cardId];
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  showForm(secaoId: string): void {
    const element = document.getElementById(secaoId);
    if (element) {
      const offset = -80;
      const topPos = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos + offset,
        behavior: 'smooth'
      });
    }
  }
}

export const ServicesInfo = [
  {
    id: 1,
    fade: 'fade-right',
    icon: 'display_settings',
    title: '',
    subtitle: '',
    text: ''
  },
  {
    id: 2,
    fade: 'fade-down',
    icon: 'attach_money',
    title: '',
    subtitle: '',
    text: ''
  },
  {
    id: 3,
    fade: 'fade-left',
    icon: 'settings_suggest',
    title: '',
    subtitle: '',
    text: ''
  },
  {
    id: 4,
    fade: 'fade-right',
    icon: 'analytics',
    title: '',
    subtitle: '',
    text: ''
  },
  {
    id: 5,
    fade: 'fade-up',
    icon: 'cloud_upload',
    title: '',
    subtitle: '',
    text: ''
  },
  {
    id: 6,
    fade: 'fade-left',
    icon: 'park',
    title: '',
    subtitle: '',
    text: ''
  },
];
