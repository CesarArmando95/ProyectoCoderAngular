import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { FiltrarArregloPipe } from './pipes/filtrar-arreglo.pipe';
import { AumentoTamanoTextoDirective } from './directivas/aumento-tamano-texto.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [NombreCompletoPipe, AumentoTamanoTextoDirective, FiltrarArregloPipe],
  imports: [CommonModule],
  exports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatTableModule,
    NombreCompletoPipe,
    FiltrarArregloPipe,
    AumentoTamanoTextoDirective,
    MatProgressSpinnerModule
  ],
})
export class CompatidasModule {}