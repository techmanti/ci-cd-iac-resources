import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarrouselComponent {
  @Input() slides = [
    '../../assets/images/amazon.png',
    '../../assets/images/azure.png',
    '../../assets/images/datadog.png',
    '../../assets/images/docker.png',
    '../../assets/images/google.png',
    '../../assets/images/grafana.png',
    '../../assets/images/kubernets.png',
    '../../assets/images/prometeus.png',
  ];
  @Input() temp: any;
  currentSlide = 0;
  visibleSlides = 4;
  duplicatedSlides: string[] = []; // Slides duplicados
  slideWidth = `calc(100% / ${this.visibleSlides})`; // Defina o valor desejado para a largura dos slides
  isMobile: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.duplicateSlides();
    this.isMobile = this.detectMobile();
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.visibleSlides = 1;
    }
  }

  currentSlideIndex = 0;

  duplicateSlides() {
    // Duplica os slides originais para criar o efeito de carrossel infinito
    this.duplicatedSlides = [...this.slides, ...this.slides, ...this.slides];
  }

  goToNextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  goToPreviousSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  detectMobile(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      return width <= 600; // Defina o valor de largura que você considera como um dispositivo móvel
    }
    return false; // Tratamento de fallback para o lado do servidor
  }

}
