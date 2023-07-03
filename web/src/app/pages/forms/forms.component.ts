import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/services/formulario.service';
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
  });

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  enviarFormulario(): void {
    if (this.contatoForm.invalid) {
      // Percorre os controles do formulário
      Object.keys(this.contatoForm.controls).forEach((key) => {
        const control = this.contatoForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched(); // Marca o controle como "touched"
        }
      });
    } else {
      const dadosFormulario = this.contatoForm.value;
      this.formularioService.enviarEmail(dadosFormulario).subscribe({
        next: (response) => {
          this._snackBar.open('Email enviado com sucesso!', 'Fechar', {
            duration: 3000,
            panelClass: ['blue-snackbar']
          })
        },
        error: (err) => {
          this._snackBar.open('Erro ao enviar o email, por favor reenvie daqui alguns minutos', 'Fechar', {
            panelClass: ['blue-snackbar']

          })
        },
      });
    }
  }
}
