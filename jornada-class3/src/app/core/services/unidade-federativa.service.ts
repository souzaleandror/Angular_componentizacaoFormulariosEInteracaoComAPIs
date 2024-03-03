import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Promocao, UnidadeFederativa } from '../types/types';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UnidadeFederativaService {

  unidadeFederativa: FormGroup;

  private apiUrl: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) {
    this.unidadeFederativa = new FormGroup({
      origem: new FormControl(''),
      destino: new FormControl('')
    });
  }

  listar(): Observable<UnidadeFederativa[]> {
    return this.httpClient.get<UnidadeFederativa[]>(`${this.apiUrl}/estados`);
  }
}
