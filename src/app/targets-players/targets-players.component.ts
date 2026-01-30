import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PALABRAS_CODIFICADAS } from '../palabras';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-targets-players',
  imports: [CardModule, RouterLink],
  templateUrl: './targets-players.component.html',
  styleUrl: './targets-players.component.css'
})
export class TargetsPlayersComponent {

flipped = false;

  codigo = '';
  palabra = '';
  numero_impostor = 0;

  jugadores = [
    { nombre: 'Diego', palabra: '' },
    { nombre: 'Luz', palabra: '' },
    { nombre: 'Camilo', palabra: '' },
    { nombre: 'Camila', palabra: '' },
    { nombre: 'Alfredo', palabra: '' },
    { nombre: 'Carolina', palabra: '' }
  ];

  ejecutar() {
    this.codigo =
      PALABRAS_CODIFICADAS[
        Math.floor(Math.random() * PALABRAS_CODIFICADAS.length)
      ];

    this.palabra = decodeURIComponent(escape(atob(this.codigo)));

    this.numero_impostor = Math.floor(Math.random() * this.jugadores.length);
    this.jugadores[this.numero_impostor].palabra = 'impostor';

    for (let i = 0; i < this.jugadores.length; i++) {
      if (i !== this.numero_impostor) {
        this.jugadores[i].palabra = this.palabra;
      }
    }

    console.log(this.jugadores);
  }

  show() {
    console.log('La palabra es:', this.palabra);
    console.log('El impostor es:', this.jugadores[this.numero_impostor]);
  }
}
