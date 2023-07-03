import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent implements OnInit {
  serviceInfos: any= [];
  showMore: { [key: number]: boolean } = {};


  constructor(private breakpointObserver: BreakpointObserver){

  }

  ngOnInit(): void {
    this.serviceInfos = ServicesInfo;

  }

  toggleMore(cardId: number): void {
    this.showMore[cardId] = !this.showMore[cardId];
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }
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

export const ServicesInfo = [
  {
    id: 1,
    fade: 'fade-right',
    icon: 'display_settings',
    title: 'Operações',
    subtitle: 'Estratégias assertivas que entregam mais rapidamente o resultado desejado pela sua empresa.',
    text: 'A Techman acompanha todas as etapas e métricas do processo Dev, Sec e Ops, prevendo falhas operacionais e realizando mudanças frequentes no código, dependendo da necessidade da empresa.'
  },
  {
    id: 2,
    fade: 'fade-down',
    icon: 'attach_money',
    title: 'Otimização de Custos',
    subtitle: 'Maximize investimento em tecnologia e reduza os custos de desenvolvimento e entrega de software',
    text: 'Automatização, uso da nuvem, monitoramento e análise de custos, escalabilidade, integração e colaboração são práticas que permitem que a sua empresa maximize o valor do investimento em tecnologia e entregue software de alta qualidade a um custo reduzido.'
  },
  {
    id: 3,
    fade: 'fade-left',
    icon: 'settings_suggest',
    title: 'Automação',
    subtitle: 'Eliminação de tarefas repetitivas dos processos tradicionais. Precisa uma frase aqui também.',
    text: 'Com a implementação do modelo Pipeline CI/CD sua empresa tem análise constante de testes necessários e recuperação mais ágil de falhas.'
  },
  {
    id: 4,
    fade: 'fade-right',

    icon: 'analytics',
    title: 'Desempenho',
    subtitle: 'Aumento da taxa de sucesso através de métricas de qualidade e eficiência na entrega do software.',
    text: 'Ao medir e monitorar regularmente essas métricas, as equipes de DevOps podem identificar áreas de melhoria e tomar medidas para melhorar o desempenho e a eficiência no desenvolvimento e entrega de software, utilizando o Architecture Servless.'
  },
  {
    id: 5,
    fade: 'fade-up',

    icon: 'cloud_upload',
    title: 'Segurança',
    subtitle: 'Implementação de toda a segurança necessária para a proteção de dados na nuvem.',
    text: 'Através do DevOps, a Techman automatiza as práticas de segurança, através da proteção de dados na nuvem. Dessa forma, é possível prever e evitar a ocorrência de acidentes, identificar vulnerabilidades e monitorar e proteger dados sensíveis.'
  },
  {
    id: 6,
    fade: 'fade-left',
    icon: 'park',
    title: 'Sustentabilidade',
    subtitle: 'O impacto ambiental, social e econômico de todo o ciclo de vida do software é respeitado.',
    text: 'Com DevOps sua empresa pode contribuir para a construção de um mundo mais sustentável e responsável, através da redução no consumo de energia e redução de ruídos, além de obter benefícios em termos de eficiência, custo e reputação.'
  },
]
