import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/formulario.service';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  contatoForm: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    nomeEmpresa: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormService
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
          console.log('deu certo');
        },
        error: (err) => {
          alert('There was an error in retrieving data from the server');
        },
      });
    }
  }
}
