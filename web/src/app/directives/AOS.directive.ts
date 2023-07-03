import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[data-aos]'
})
export class AosDirective implements OnInit {
  @Input('data-aos') aosAnimation: string = 'fade-right';

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.setAttribute('data-aos', this.aosAnimation);
  }
}
