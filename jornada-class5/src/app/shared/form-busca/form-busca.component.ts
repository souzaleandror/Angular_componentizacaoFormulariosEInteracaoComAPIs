import { Component } from '@angular/core';
import { FormBuscaService } from 'src/app/core/services/form-busca.service';
import { UnidadeFederativaService } from 'src/app/core/services/unidade-federativa.service';

@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {
  constructor(public formBuscaService: FormBuscaService, public unidadeFedetativa: UnidadeFederativaService) { }

  buscar() {
    console.log(this.formBuscaService.formBusca.value);
  }

}
