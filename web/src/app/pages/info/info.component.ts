import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoComponent {
  showForm(secaoId: string) {
    const element = document.getElementById(secaoId);
    if (element) {
      const offset = -80; // Define a quantidade de pixels que deseja parar antes da âncora
      const topPos = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos + offset,
        behavior: 'smooth'
      });
    }
  }
}
