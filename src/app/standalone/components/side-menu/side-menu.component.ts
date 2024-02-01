import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/* este SideMenuComponent ahora será un standalone component para poder manejarlo como un componente independiente del resto de la lógica */
interface MenuItem {
  name: string;
  route: string;
}

@Component({
  selector: 'standalone-side-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { name: 'FullScreen', route: '/maps/fullscreen' },
    { name: 'ZoomRange', route: '/maps/zoom-range' },
    { name: 'Markers', route: '/maps/markers' },
    { name: 'Houses', route: '/maps/properties' },
    { name: 'Alone Page', route: '/alone' },
  ];
}

/* ******************************************************************************************************************* */
/* Con las nuevas versiones de Angular ¿Qué es lo recomendable y como buena práctica que se debe hacer, tener todo como standalone component o crear modulos? */
/*
En Angular, tanto los componentes independientes como los módulos tienen sus propios usos y beneficios. En general, se recomienda usar módulos para organizar el código de manera eficiente y promover la reutilización del código. Los módulos ayudan a agrupar componentes, directivas y servicios relacionados que están destinados a trabajar juntos.

Por otro lado, un componente independiente puede ser útil cuando tienes un componente que no depende de otros componentes o servicios, y no esperas reutilizarlo en otras partes de tu aplicación.

En este ejemplo, el componente standalone-side-menu es independiente porque no depende de otros componentes o servicios en la aplicación. Sin embargo, si se encuentra que se está reutilizando este componente en varios lugares, podría ser beneficioso convertirlo en un módulo para facilitar la reutilización y mantener la coherencia.

Si se está creando una aplicación desde cero, es una buena práctica comenzar con una estructura modular. A medida que la aplicación crece, se puede evaluar si ciertos componentes deben ser independientes basándose en sus dependencias y cómo se planea reutilizarlos.
*/
