import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarkerAndColor {
  marker: Marker;
  markerColor: string;
}

interface SimpleMarkerInfo {
  markerColor: string;
  lngLat: number[]; // también se podría colocar lngLat: [number, number];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit, AfterViewChecked {
  /* hacer una referencia a un elemento HTML que usa referencia local */
  /* también se puede colocar como @ViewChild('map') divMap?: ElementRef; */
  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom: number = 13;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);
  public currentMarkers: MarkerAndColor[] = [];

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

    this.readFromLocalStorage();

    /* forma de crear un marcador */
    // /* crear el HTML para el marcador (este ejemplo será super básico pero se puede hacer uno mucho más elaborado) */
    // const markerHTML = document.createElement('div');
    // markerHTML.innerHTML = 'Marcador prueba';

    // /* crear un nuevo marcador, luego setearle las coordenadas y finalmente añadirlo al mapa */
    // const marker = new Marker({
    //   /* color: 'red', */
    //   // element: markerHTML
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map);

    /* forma para crear un marcador al hacer click en cualquier parte del mapa (FALTA PROBAR SI FUNCIONA CORRECTAMENTE) */
    // this.map.on('click', (ev) => {
    //   const color = '#xxxxxx'.replace(/x/g, (y) =>
    //     ((Math.random() * 16) | 0).toString(16)
    //   );
    //   const marker = new Marker({ color: color })
    //     .setLngLat(ev.lngLat)
    //     .addTo(this.map!);
    //   this.currentMarkers.push({ markerColor: color, marker: marker });
    // });
  }

  /* para solucionar el problema de no hay necesidad de crear un nuevo evento o listener, solo hay que agregar el this.saveToLocalStorage() al ciclo de vida de Angular en el ngAfterViewChecked y funciona igual. Aquí actualiza las coordenadas de lat y Lng en el momento de mover el marker ya que esta parte del ciclo de vida es "después de que la vista ha sido revisada" */
  /* la diferencia de hacerlo aquí o con el listener del evento dragend radica en cuándo se dispara el evento y cuántas veces. El ngAfterViewChecked() se llama cada vez que Angular verifica las vistas, lo que puede ocurrir con frecuencia (por ejemplo al mover el marker o simplemente mover el mouse en el mapa se empieza a ejecutar este hook de ciclo de vida), mientras que el listener dragend se dispara solo cuando se realiza un arrastre del marcador. En términos de eficiencia, si mueves la llamada a saveToLocalStorage() al hook AfterViewChecked, entonces los cambios en la posición de los marcadores se guardarán cada vez que Angular detecte un cambio en la vista. Esto podría resultar en muchas más llamadas a saveToLocalStorage() que con el evento dragend, especialmente si hay otros cambios en la vista que no están relacionados con el arrastre de los marcadores. Por lo tanto, aunque técnicamente se podría hacer de esta forma, probablemente no sea la opción más eficiente desde el punto de vista del rendimiento. */
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked');
    // this.saveToLocalStorage(); // hay que descomentar esta línea ya que solo se comentó para probar la otra forma que es creando un nuevo listener en addMarker() con el evento dragend
  }

  /* método para crear un marcador con su información de coordenadas (lng y lat) y el color. Al crear un marcador y moverlo entonces el marcador sabrá sus coordenadas actuales */
  createMarkerInfo() {
    if (!this.map) return;

    /* generar un color hexadecimal de manera aleatoria. Se podría colocar también la opacidad como #xxxxxx80 o bajar la opacidad para que se pueda leer el nombre del marcador */
    const markerColor = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    /* obtener la longitud y latitud del mapa pero del el centro del mapa */
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, markerColor);
  }

  /* método para agregar un marcador con la información que le están pasando, en este caso se agregará un marcador en el centro del mapa */
  addMarker(lngLat: LngLat, markerColor: string) {
    if (!this.map) return;

    /* este marker que se está creando nos da todo lo referente al marcador (ubicación, coordenadas, etc) pero no nos da el color aunque esta es una propiedad privada que tiene el marker pero no se puede saber directamente el color asignado */
    const marker = new Marker({
      color: markerColor,
      draggable: true, // para decirle que se podrá mover el marcador
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.currentMarkers.push({
      marker: marker,
      markerColor: markerColor,
    });

    /* colocar aquí este método solo guardará en el localStorage cuando se agregue un marcador pero si el marcador se mueve de una coordenada o ubicación a otra entonces al refrescar la página seguirá en las mismas coordenadas que se guardó en el localStorage al momento de agregar el marcador */
    this.saveToLocalStorage();

    /* cada vez que se crea un marcador, adicionalmente quiero que ese marcador tenga un listener y con el evento dragend es cuando el marcador se termina de mover y ahí es donde se hará el guardado en el localStorage */
    marker.on('dragend', () => {
      // console.log(marker.getLngLat());
      this.saveToLocalStorage();
    });
  }

  /* aquí podemos recibir solo el index del marcador o sino todo el marcador, en este caso lo haremos solo con el index */
  removeMarker(index: number) {
    /* remover el marcador del mapa */
    this.currentMarkers[index].marker.remove();

    /* remover el marcador del arreglo de currentMarkers */
    this.currentMarkers.splice(index, 1);

    /* cuando se remueva el marcador entonces también se actualizará el localStorage */
    this.saveToLocalStorage();
  }

  /* al seleccionar el marcador que me lleve a esa ubicación. Aquí se pueden recibir directamente el índice del marcador o el todo marcador como tal "marker: Marker" */
  flyToMarker(marker: Marker /* index: number */) {
    /* con todo el marcador */
    this.map?.flyTo({ zoom: 14, center: marker.getLngLat() });

    /* con el índice del marcador */
    // this.map?.flyTo({ zoom: 14, center: this.currentMarkers[index].marker.getLngLat() });
  }

  saveToLocalStorage() {
    /* este arreglo de this.currentMarkers por cada marcador tienen una gran cantidad de propiedades lo cual solo necesitamos algunas como las coordenadas o el color, para eso solo grabaremos la información que nos interesa y para eso se creará una interface más pequeña sobre lo que nosotros necesitamos */
    // console.log(this.currentMarkers);

    const simpleMarkersInfo: SimpleMarkerInfo[] = this.currentMarkers.map(
      (marker) => {
        return {
          markerColor: marker.markerColor,
          lngLat: marker.marker.getLngLat().toArray(), // para obtener la lngLat pero con el método .toArray() me lo dará como un arreglo que es lo que necesito para que cumpla la interface de SimpleMarkerInfo
        };
      }
    );
    // console.log(simpleMarkersInfo);

    localStorage.setItem(
      'simpleMarkersInfo',
      JSON.stringify(simpleMarkersInfo)
    );
  }

  readFromLocalStorage() {
    const simpleMarkersInfo: SimpleMarkerInfo[] = JSON.parse(
      localStorage.getItem('simpleMarkersInfo') ?? '[]'
    );
    // console.log(simpleMarkersInfo);

    simpleMarkersInfo.forEach((marker) => {
      // console.log(marker);

      /* FORMA 1: tomando las posiciones 0 y 1 de lo que viene en marker.lngLat */
      // const coords = new LngLat(marker.lngLat[0], marker.lngLat[1]);

      /* FORMA 2: con desestructuración de arreglos */
      const [lng, lat] = marker.lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, marker.markerColor);
    });
  }

  cleanLocalStorage() {
    this.currentMarkers = [];
    localStorage.removeItem('simpleMarkersInfo');
  }
}

/* ******************************************************************************************************************* */
/* ¿Cómo puedo cambiar el icono por defecto por una imagen o carrousel de imagenes? */
/*
  const nuevoMarcador = new mapboxgl.Marker({
    draggable: true,
    color
  })
    .setLngLat(this.center)
    .addTo(this.mapa);


    let el = nuevoMarcador.getElement();
    el.className = 'marker';
    el.style.backgroundImage = `url(https://placekitten.com/g/40/40/)`;
    el.style.width = `40px`;
    el.style.height = `40px`;
    el.style.backgroundSize = '100%';

No existe un método o propiedad que puedas cambiar rápidamente. Fuente: https://docs.mapbox.com/mapbox-gl-js/example/custom-marker-icons/
*/

/* ******************************************************************************************************************* */
/* ¿De qué manera podemos resolver el contraste en los colores? */
/* Basado en este link https://stackoverflow.com/questions/11867545/change-text-color-based-on-brightness-of-the-covered-background-area/72595895#72595895 se puede resolver de la siguiente forma:

1.- Agregar la propiedad colorText en la interface MarcadorColor:

interface MarcadorColor {
  color: string;
  colorText: string
  marker: Marker;
}

2.- En la funcion agregarMarcador() crear la funcion contrastColor para calcular el color del texto basado en el color calculado para el marcador(background):

agregarMarcador() {
  //genera un color aleatorio
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

  //funcion para calcular el color del texto
  const contrastColor = (c: string)=>["#000","#fff"][~~([.299,.587,.114].reduce((r,v,i)=>parseInt(c.substr(i*2+1,2),16)*v+r,0)<128)];

  //definir el color del texto basado en el color del marcador
  const colorText = contrastColor(color);

  const nuevoMarcador = new Marker({
      draggable: true,
      color: color
    })
    .setLngLat(this.center)
    .addTo(this.mapa);

  //agregar el color del texto al marcador
  this.marcadores.push({
    color,
    colorText,
    marker: nuevoMarcador
  });

}


3.- Finalmente en el html establecer el color del texto:

<a  *ngFor="let marker of marcadores; let i= index;"
    role="button"
    (click)="irMarcador()"
    [ngStyle]="{
        'color': marker.colorText,
        'background-color': marker.color
    }"
    class="list-group-item">
    Marker {{i + 1}}
</a>
*/

/* ******************************************************************************************************************* */
/* Otra forma de obtener el color del marker. Para obtener el color del marker simplemente obtener los elementos del "svg -> primer path" de la siguiente forma: */
/*
public addMarker(lngLat: LngLat, color: string): void {
  if (!this.map) throw 'Mapa no inicializado';

  const marker = new Marker({ color, draggable: true })
    .setLngLat(lngLat)
    .addTo(this.map);

  const getLngLat = marker.getLngLat();

  const getColor = marker
    .getElement()
    .getElementsByTagName('svg')
    .item(0)
    ?.getElementsByTagName('path')
    .item(0)
    ?.getAttribute('fill');

  console.log(getColor);
  console.log(getLngLat);
}
*/
