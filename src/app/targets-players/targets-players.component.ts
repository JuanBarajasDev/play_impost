import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { NUEVAS_PALABRAS } from '../palabras';
import { RouterLink, Router } from "@angular/router";
import { BrowserStorageService } from '../storage.service';
import { CommonModule } from '@angular/common'
import Swal from 'sweetalert2'

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
  array_palabras: string[] = [];
  constructor(private storage: BrowserStorageService, private router: Router){};

  ngOnInit(){
    this.obtener_datos();
    this.unir_palabras_categoria();
    this.juego_iniciado();
    this.jugador = this.jugadores[0];
    this.contador = 1;

  }
  //organizar y unir palabras de las categorias elegidas para el juego
  unir_palabras_categoria(){
    let categorias_elegidas: string[] = JSON.parse(this.storage.get('categorias') || '[]');
    this.array_palabras = NUEVAS_PALABRAS
    .filter(p => categorias_elegidas.includes(p.tipo))
    .flatMap(p => p.palabras)
    console.log(this.array_palabras)
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
      this.array_palabras[
        Math.floor(Math.random() * this.array_palabras.length)
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
  finalizar_ronda(){
    let palabra = this.jugadores.find(p => p.palabra != 'impostor')?.palabra
    let jugador_impostor = this.jugadores.find(c => c.palabra === 'impostor')?.name
    let informacion = {palabra: palabra, impostor: jugador_impostor}
    return informacion
  }

  //MODALES DE INICIO DE PARTIDA Y OTRAS FUNCIONES
  iniciar_partida(){
    let info = this.finalizar_ronda()
    Swal.fire({
      width: '20em',
      imageUrl: 'assets/img/devil.gif',
      imageHeight: '100',
      imageWidth: '100',
      title: "Ronda Iniciada!!",
      text: "Recuerda finalizar la ronda para revelar al impostor!",
      showDenyButton: true,
      denyButtonText: "Salir",
      confirmButtonText: "Revelar",
      allowOutsideClick: false
}).then((result) => {
  if(result.isConfirmed){
    Swal.fire({
      width: '20em',
      imageUrl: 'assets/img/devil.gif',
      imageHeight: '100',
      imageWidth: '100',
      title: 'Ronda Finalizada!',
      html: `  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <p>El impostor era: <b>${info.impostor}</b></p>
      <p>La palabra fue: <b>${info.palabra}</b> </p>
      </div>`,
      showDenyButton: true,
      denyButtonText: 'Salir',
      confirmButtonText: 'Nueva Ronda'
    }).then((result) => {
      if(result.isConfirmed){
        this.juego_iniciado()
      }else if(result.isDenied){
        this.router.navigate(['/main-page'])
      }
    })
  }else if (result.isDenied){
      this.router.navigate(['/main-page'])
  }
})
  }
}
