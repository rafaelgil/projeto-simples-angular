import { EstadoModule } from '../estado/estado.module';
import { CidadeService } from './cidade.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeComponent } from "./cidade.component";
import { EstadoService } from "../estado/estado.service";

const appRoutesCidades: Routes = [
  { path: 'list', component: CidadeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutesCidades),
    FormsModule
  ],
  declarations: [CidadeComponent],
  providers: [CidadeService, EstadoService]
})
export class CidadeModule { }
