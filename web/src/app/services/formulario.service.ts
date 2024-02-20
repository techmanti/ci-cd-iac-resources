import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'https://umcjbwhjfncx5p5zzsb5nf3xr40cibdp.lambda-url.us-east-1.on.aws/';

  constructor(private http: HttpClient) { }

  enviarEmail(dadosFormulario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, dadosFormulario);
  }

}