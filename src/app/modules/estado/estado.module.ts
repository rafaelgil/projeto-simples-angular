import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadoComponent } from "./estado.component";
import { FormsModule } from "@angular/forms";
import { EstadoService } from "./estado.service";

const appRoutesEstados: Routes = [
  { path: 'list', component: EstadoComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutesEstados),
    FormsModule
  ],
  declarations: [EstadoComponent],
  providers:[EstadoService]

})
export class EstadoModule { }
