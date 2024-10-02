import { Routes } from '@angular/router';
import { ListagemFilmesComponent } from './components/listagem-filmes/listagem-filmes.component';

export const routes: Routes = [
  {path: '', redirectTo: 'filmes', pathMatch: 'full'},
  {path: 'filmes', component: ListagemFilmesComponent},
];
