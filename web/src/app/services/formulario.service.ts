import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = '${PRIVATE_API_URL}';

  constructor(private http: HttpClient) { }

  enviarEmail(dadosFormulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosFormulario);
  }

}