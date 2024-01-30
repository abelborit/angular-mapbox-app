import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  /* hacer una referencia a un elemento HTML que usa referencia local */
  /* también se puede colocar como @ViewChild('map') divMap?: ElementRef; */
  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    // console.log(this.divMap);

    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    /* en lugar de que tenga una constante se creó una propiedad nueva llamada map de tipo Map y luego se le igualó a este valor para poder interactuar con este objeto */
    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.mapListeners();
  }

  /* como se están usando listeners de mapbox entonces hay que limpiarlos cuando el componente se destruya para evitar fugas de memoria */
  ngOnDestroy(): void {
    /* FORMA 1: eliminar listener de forma individual lo que se tendría que colocar una función que tenga la misma referencia de la función que tenemos al momento de crear el listener, es decir, al momento de crear el listener se tendría que colocar en un método como por ejemplo this.zoomListener y luego al eliminar ese listener entonces se llamada a ese método y se elimina pero es muy tedioso hacerlo por cada uno */
    // this.map?.off('zoom', () => {});
    // this.map?.off('zoomend', () => {});
    // this.map?.off('move', () => {});

    /* FORMA 2: remover todo el mapa lo que elimina también todos los listeners */
    this.map?.remove();
  }

  /* hay que agregar listeners para que escuchen lo que sucede, en este caso escucharán cuando cambie el zoom del mapa */
  mapListeners() {
    /* aquí no se necesita ninguna referencia adicional ya que el objeto que se utilizará será la variable map del this.map */
    if (!this.map) throw 'Mapa no inicializado';

    /* aquí con el .on("") tenemos varios listeners, en este caso será el zoom y cuando cambie este zoom entonces se va a disparar su callback */
    this.map.on('zoom', (event) => {
      // console.log({ event });
      /* aquí se coloca con el ! ya que en este punto nosotros ya tenemos el mapa pero por alguna razón TypeScript no lo identifica o reconoce como tal */
      this.currentZoom = this.map!.getZoom();
    });

    /* aquí es cuando se termina de hacer el zoom */
    this.map.on('zoomend', (event) => {
      // console.log({ event });

      /* si es menor de 18 que no haga nada pero cuando sea mayor entonces lo regresará al zoom de 18 */
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);

      this.currentZoom = this.map!.getZoom();
    });

    /* aquí es para las coordenadas. Se puede usar el move o moveend o movestart. Con el move será más ruidoso ya que se disparará cada vez que se mueva el mapa. El moveend cada vez que se termine de mover. El movestart cuando se empieza a mover */
    this.map.on('move', (event) => {
      // console.log({ event });

      this.currentLngLat = this.map!.getCenter();
      // console.log(this.currentLngLat);

      // const { lng, lat } = this.currentLngLat;
      // console.log({ lng, lat });
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  /* esto es para que cuando se use la barra del rango de zoom entonces se haga el zoom al mapa. El zoomInputValue es de tipo string ya que lo que nos da el zoomInput.value es de tipo string porque es una caja de texto, es decir, es un input */
  zoomChanged(zoomInputValue: string) {
    this.currentZoom = Number(zoomInputValue);
    this.map?.zoomTo(this.currentZoom);
  }
}
