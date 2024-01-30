import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
/* se coloca el "implements AfterViewInit" porque en el full-screen-page.component.html se necesita un espacio para colocar el mapa entonces nuestra primera idea sería colocarlo en el ngOnInit implementando el OnInit pero en este caso necesito esperarme a que el elemento y todos los elementos HTML estén creados y para eso se usará el AfterViewInit para usar su ngAfterViewInit y nos dice que después que la vista ha sido inicializada y ya tenemos el HTML ahí es donde mandamos a llamar al mapa */
export class FullScreenPageComponent implements AfterViewInit {
  /* hacer una referencia a un elemento HTML que usa referencia local */
  @ViewChild('map')
  /* se coloca con ? ya que en algún punto en el tiempo este divMap aún no está inicializado ya que técnicamente se inicializa bajo referencia del @ViewChild pero al momento que se crea el componente FullScreenPageComponent este divMap aún no está inicializado */
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    // console.log(this.divMap);

    /* hacer una validación ya que si el this.divMap?.nativeElement es null entonces va a haber errores y ni si quiera va a compilar nuestra aplicación. Al hacer esta validación entonces ya podemos quitar el ? y dejarlo con this.divMap.nativeElement */
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      /* no es correcto hacerlo con id ya que si tenemos muchos mapas entonces no vamos a poder hacer referencia por el id ya que ese id estará duplicado y para solucionarlo entonces tomaremos la referencia directamente al elemento HTML que queremos y al hacerlo por referencia local entonces tendrá una referencia por cada elemento HTML que la tenga */
      // container: 'map', // container ID // FORMA INCORRECTA
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}

/* ******************************************************************************************************************* */
/* Si al usar el ViewChild aparece un warning como el siguiente "........ CommonJS or AMD dependencies can cause optimization bailouts. For more info see: https://angular.io/guide/build#configuring-commonjs-dependencies" */
/*
Cuando se usa una dependencia que está empaquetada con CommonJS, puede resultar en aplicaciones más grandes y lentas. A partir de la versión 10, Angular ahora le advierte cuando su compilación incorpora uno de estos paquetes.

Algunas soluciones en este post:
  - https://bobbyhadz.com/blog/angular-commonjs-or-amd-dependencies-can-cause-optimization-bailouts
*/

/* ******************************************************************************************************************* */
/* ¿Por qué cambiamos el id por la referencia local en el HTML y por qué no trabajamos con el id? Hemos cambiado el id="map" por un #map (referencia local) pero se supone que el ViewChild buscará el primer elemento del DOM que se llame map y lo cogerá para lo que le hayamos dicho en el código. Entonces si tenemos varios mapas ¿De qué nos sirve todo este cambio? Porque al final, si tenemos varios mapas en una misma pantalla, y todos se llaman #map por la referencia local ¿No van a chocar igual que cuando teníamos el id? */
/*
El caso es que puede que tengamos este componente repetido, o que simplemente haya otro elemento del DOM que tenga tambien ese mismo ID.

Como con Angular trabajamos con componentes y modulos independientes, que podriamos reutilizar, si dejamos el id como tal, y otro componente tiene ese mismo id (ya sea porque reutilizamos el componente, o porque otra persona que este desarrollando en el mismo proyecto a puesto el mismo id a otro elemento del componente en el que él este trabajando), lo que va a pasar es que no se va a saber a cual de los identificadores (id) se esta señalando, porque estaria repetido.

Por eso, al usar el ViewChild, Angular ya se encarga de internamente identificar que ese elemento tiene ese identificador dentro del componente internamente, pero en el momento de desplegarlo, Angular le va a poner un identificador global distinto al resto pero haciendo por si mismo la referencia.
*/
