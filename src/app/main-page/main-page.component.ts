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

      this.storage.set('jugadores', this.jugadores)
      this.storage.set('categorias', this.categorias_seleccionadas())
      console.log('guardado exitosamente')
    }else{
      console.log('no se puede guardar, debe seleccionar al menos una categoria')
    }

  }

  leer() {
    this.value = this.storage.get('mensaje')
  }

  eliminar(){
    this.storage.remove('mensaje')
    console.log('eliminado con exito')
  }
  ngOnInit(){
  const tipos_categorias = this.storage.get('categorias')
  if(tipos_categorias){
    this.categorias = this.categorias.map(c => tipos_categorias.includes(c.categoria) ? {...c, checked: true} : c )
    console.log(this.categorias)
  }else{
    this.categorias[0].checked = true
  }
  }
  //logica para agregar integrantes o eliminar

  nuevo_jugador= "";

  jugadores: {id: number, name: string, palabra: string}[]= [{id: 1, name: 'jugador 1', palabra: ''}, {id: 2, name: 'jugador 2', palabra: ''}, {id: 3, name: 'jugador 3', palabra: ''} ];


  agregar() {
    if (!this.nuevo_jugador.trim()) return;

    this.jugadores.push({id: this.jugadores.length + 1, name: this.nuevo_jugador, palabra: ''})
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

  categorias : {checked: boolean, categoria: string}[] = [{checked: false, categoria: 'Objetos Cotidianos'},{checked: false, categoria: 'Comidas y Bebidas'},{checked: false, categoria: 'Animales'},{checked: false, categoria: 'Paises'},{checked: false, categoria: 'Colores'},{checked: false, categoria: 'Pasatiempos'},{checked: false, categoria: 'Deportes'},{checked: false, categoria: 'Climas y Naturaleza'} ]
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
  //categorias seleccionadas
  categorias_seleccionadas(){
    return this.categorias.filter(c => c.checked).map(c => c.categoria);
  }

  // optimizar el ngFor de categorias
  trackByCat(_: number, cat: { categoria: string }) {
    return cat.categoria;
  }


}
