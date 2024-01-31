import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  /* FORMA 1 */
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  /* FORMA 2 */
  // @Input()
  // public lngLat?: [number, number];

  // @ViewChild('map')
  // public divMap?: ElementRef;

  ngAfterViewInit() {
    if (!this.divMap?.nativeElement) throw 'Map Div not found';
    if (!this.lngLat) throw "LngLat can't be null";

    /* instanciar el mapa */
    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
      interactive: false, // activity disabled
    });

    /* instanciar el marcador */
    new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
