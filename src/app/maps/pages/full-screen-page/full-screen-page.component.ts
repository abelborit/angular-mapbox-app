import { AfterViewInit, Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

/* al colocar mapboxgl.accessToken nos aparece un error de que no se puede asignar accessToken porque es una propiedad de solo lectura "Cannot assign to 'accessToken' because it is a read-only property." entonces para solucionarlo se colocará (mapboxgl as any).accessToken */
(mapboxgl as any).accessToken = '<your access token here>';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
/* se coloca el "implements AfterViewInit" porque en el full-screen-page.component.html se necesita un espacio para colocar el mapa entonces nuestra primera idea sería colocarlo en el ngOnInit implementando el OnInit pero en este caso necesito esperarme a que el elemento y todos los elementos HTML estén creados y para eso se usará el AfterViewInit para usar su ngAfterViewInit y nos dice que después que la vista ha sido inicializada y ya tenemos el HTML ahí es donde mandamos a llamar al mapa */
export class FullScreenPageComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
