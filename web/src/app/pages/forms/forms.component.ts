import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/services/formulario.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormsComponent implements OnInit {
  contatoForm: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    nomeEmpresa: [''],
    telefone: ['', [this.validarTelefone]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormService,
    private _snackBar: MatSnackBar,
    private translocoService: TranslocoService
  ) {}

  ngOnInit(): void {}

  enviarFormulario(): void {
    if (this.contatoForm.invalid) {
      Object.keys(this.contatoForm.controls).forEach((key) => {
        const control = this.contatoForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
    } else {
      const dadosFormulario = this.contatoForm.value;
      this.formularioService.enviarEmail(dadosFormulario).subscribe({
        next: (response) => {
          this._snackBar.open('Email enviado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['blue-snackbar']
          });
        },
        error: (err) => {
          this._snackBar.open(
            'Erro ao enviar o email, por favor reenvie daqui alguns minutos',
            'Fechar',
            {
              panelClass: ['blue-snackbar']
            }
          );
        },
      });
    }
  }

  validarTelefone(control: any): { [key: string]: any } | null {
    const telefone = control.value.replace(/\D/g, '');
    const telefoneValido = /^\d{10,11}$/.test(telefone);
    return telefoneValido ? null : { 'telefoneInvalido': true };
  }

  formatarTelefone(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length === 11) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    } else if (value.length === 10) {
      formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6, 10)}`;
    } else {
      formattedValue = value;
    }

    this.contatoForm.patchValue({
      telefone: formattedValue
    });
  }
}
