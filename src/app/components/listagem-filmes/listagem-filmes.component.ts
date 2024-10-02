import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem-filmes',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, RouterLink],
  templateUrl: './listagem-filmes.component.html',
  styleUrl: './listagem-filmes.component.scss'
})

export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];

  constructor(private filmeService: FilmeService) {
    this.filmes = [];
    this.pagina = 1;
  }

  ngOnInit(): void {
    this.buscarFilmesPopuares();
  }

  private pagina: number;

  public buscarFilmesPopuares(){
    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((f) => {
      const resultados = f.results as any[];

      const filmesMapeados = resultados.map(this.mepearListagemFilme)

      this.filmes.push(...filmesMapeados);

      this.pagina++;
    });
  }

  public mapearCorBorda(Nota : String){
    const numeroNota = Number(Nota)

    if (numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if (numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if (numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else if (numeroNota > 75) return 'app-borda-nota-alta';
    else return 'app-borda-nota-null';
  }

  private mepearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      Nota: (obj.vote_average * 10).toFixed(0)
    };
  }

}
