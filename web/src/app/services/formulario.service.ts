import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'http://localhost:3000/enviar-email'; // Substitua com a URL da sua API de envio de e-mails

  constructor(private http: HttpClient) { }

  enviarEmail(dadosFormulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosFormulario);
  }

}
