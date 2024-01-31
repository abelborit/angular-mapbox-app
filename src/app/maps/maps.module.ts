import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* se puede pasar el código a este maps.module.ts ya que como está en este módulo entonces todo lo referido a este módulo lo podrá usar o pasará por aquí */
import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
/* al colocar mapboxgl.accessToken nos aparece un error de que no se puede asignar accessToken porque es una propiedad de solo lectura "Cannot assign to 'accessToken' because it is a read-only property." entonces para solucionarlo se colocará (mapboxgl as any).accessToken */
(mapboxgl as any).accessToken = '<your access token here>';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';

import { CounterAloneComponent } from '../standalone/components/counter-alone/counter-alone.component';

@NgModule({
  declarations: [
    MiniMapComponent,
    SideMenuComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
  ],
  imports: [
    /* Modules */
    CommonModule,
    MapsRoutingModule,

    /* Standalone Components */
    CounterAloneComponent,
  ],
})
export class MapsModule {}
