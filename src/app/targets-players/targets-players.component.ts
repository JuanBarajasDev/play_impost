import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PALABRAS_CODIFICADAS } from '../palabras';
import { RouterLink } from "@angular/router";
import { BrowserStorageService } from '../storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-targets-players',
  imports: [CardModule, RouterLink, CommonModule],
  templateUrl: './targets-players.component.html',
  styleUrl: './targets-players.component.css'
})
export class TargetsPlayersComponent {

flipped = false;
  // variables para el juego
  codigo = '';
  palabra = '';
  numero_impostor = 0;
  contador = 0;
  jugador = {id: 0, name: '', palabra: ''};
  jugadores: {id: number, name: string, palabra: string}[]= [];

  constructor(private storage: BrowserStorageService){}

  ngOnInit(){
    this.obtener_datos();
    this.juego_iniciado();
    this.jugador = this.jugadores[0];
    this.contador = 1;

  }
// logica para guardar datos en el localStorage
  obtener_datos(){
    let value = this.storage.get('jugadores');
    if(value){
      this.jugadores = JSON.parse(value);
    }
  }
 // logica para iniciar el juego, asignar palabras a los jugadores y elegir al impostor
  juego_iniciado() {
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


  // logica para mostrar el jugador actual y rotar entre ellos
  mostrar_jugadores() {
    this.jugador = this.jugadores[this.contador];
    if(this.jugadores.length === this.contador + 1){
      this.contador = 0;
    } else {
      this.contador++;
    }


  }
}
