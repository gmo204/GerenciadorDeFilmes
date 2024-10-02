import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { NgClass, NgForOf } from '@angular/common';
import { DetalhesFilme } from '../../models/detalhes-filme.model';


@Component({
  selector: 'app-detalhes-filme',
  standalone: true,
  imports: [NgForOf, NgClass, RouterLink],
  templateUrl: './detalhes-filme.component.html',
  styleUrl: './detalhes-filme.component.scss'
})

export class DetalhesFilmeComponent implements OnInit {
  public detalhes?: DetalhesFilme;

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      throw new Error(
        'Não foi possível obter informações sobre o filme requisitado.'
      );
    }
  }
}
