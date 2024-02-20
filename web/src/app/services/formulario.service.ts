import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment} from './environment';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  enviarEmail(dadosFormulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosFormulario);
  }

}