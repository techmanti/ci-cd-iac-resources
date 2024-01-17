import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ElementRef, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { TranslationService } from '../../translation.service';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute,
    private router: Router,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init();
    }

    this.route.paramMap.subscribe(params => {
      const lang = params.get('lang') || 'br';

      this.translationService.loadTranslations(lang).subscribe(() => {
      });
    });
  }
}
