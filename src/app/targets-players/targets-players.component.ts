import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PALABRAS_CODIFICADAS } from '../palabras';
import { RouterLink } from "@angular/router";
import { BrowserStorageService } from '../storage.service';
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

  jugadores: {id: number, name: string, palabra: string}[]= [];

  constructor(private storage: BrowserStorageService){}
  /**
   * Inicializa el componente leyendo la lista de jugadores desde el servicio de almacenamiento.
   *
   * Obtiene el valor crudo con this.storage.get('jugadores') — ese "value" es la cadena JSON almacenada
   * (o null/undefined si no existe). Si existe, se parsea con JSON.parse y se asigna a this.jugadores.
   * Finalmente se registra this.jugadores en la consola.
   *
   * @remarks
   * - En el código actual `value` se usa sin declaración; debe declararse explícitamente
   *   (por ejemplo `const value = this.storage.get('jugadores');`).
   * - Se recomienda encapsular JSON.parse en un try/catch para manejar datos corruptos y evitar excepciones.
   */
  ngOnInit(){
    let value = this.storage.get('jugadores');
    if(value){
      this.jugadores = JSON.parse(value);
    }
    console.log(this.jugadores);

  }

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
