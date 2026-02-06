import { Component, NgModule } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BrowserStorageService } from '../storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-main-page',
  imports: [RouterLink, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})

export class MainPageComponent {
// procesos para subir datos al localStorage
  value: string | null = null;

  constructor(private storage: BrowserStorageService) {}

  guardar(){
    if(!this.disable_boton){

      this.storage.set('jugadores', JSON.stringify(this.jugadores))
      this.storage.set('categorias', JSON.stringify(this.categorias))
      console.log('guardado exitosamente')
    }
    console.log('no se puede guardar, debe seleccionar al menos una categoria')

  }

  leer() {
    this.value = this.storage.get('mensaje')
  }
  
  eliminar(){
    this.storage.remove('mensaje')
    console.log('eliminado con exito')
  }
  ngOnInit(){
  }
  //logica para agregar integrantes o eliminar

  nuevo_jugador= "";

  jugadores: {id: number, name: string}[]= [{id: 1, name: 'jugador 1'}, {id: 2, name: 'jugador 2'}, {id: 3, name: 'jugador 3'} ];

  
  agregar() {
    if (!this.nuevo_jugador.trim()) return;
    
    this.jugadores.push({id: this.jugadores.length + 1, name: this.nuevo_jugador})
    this.nuevo_jugador = "";
  }

  eliminar_jugador(id: number){
    if (this.jugadores.length === 3) return;
    
    this.jugadores = this.jugadores.filter(j => j.id != id)
  }
  
  cambiar_nombre(id: number, nuevo_nombre: string){
    if(!nuevo_nombre.trim()) return console.log('nombre vacio, no se cambia');
    this.jugadores = this.jugadores.map(j => j.id == id ? {...j, name: nuevo_nombre} : j)
    console.log('ya se cambio el nombre', this.jugadores)
  }

  //controlar y que no se reinicie el cargar el array
  trackById(index: number, jugador: any){
    return jugador.id
    
  }
  
  //logica para categorias
  
  categorias : {checked: boolean, categoria: string}[] = [{checked: true, categoria: 'objetos cotidianos'},{checked: false, categoria: 'logos'},{checked: false, categoria: 'comidas y bebidas'},{checked: false, categoria: 'personas famosas'} ]
  disable_boton = false;

  tema_escogido(categoria: string) {
    this.categorias = this.categorias.map(c => c.categoria == categoria ? {...c, checked: !c.checked} : c)
    if(this.categorias.every(c => !c.checked)) {
    window.alert('debe seleccionar al menos una categoria para continuar');
    this.disable_boton = true;
    }else {
      this.disable_boton = false;
    }
    console.log(this.categorias)
  }

  trackByCat(_: number, cat: { categoria: string }) {
    return cat.categoria;
  }


}
