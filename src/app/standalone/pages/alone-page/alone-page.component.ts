import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

/* al ser un standalone puede sobrevivir por sí mismo sin la necesidad de definirlo por ejemplo, sin importarlo en el app.module.ts entonces, es un archivo que está flotando en todo el proyecto de Angular. Se cargará aplicando lazyload aunque también se puede cargar de manera tradicional pero ahí sí es necesario importarlo en el app.module.ts */
/* este standalone component se podría ver también como un módulo pero que solo tiene este componente y se puede utilizar de la misma forma en como se vino utilizando */
@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [CommonModule, CounterAloneComponent, SideMenuComponent],
  templateUrl: './alone-page.component.html',
  styleUrls: ['./alone-page.component.css'],
})
export class AlonePageComponent {
  constructor() {}
}

/* ******************************************************************************************************************* */
/*
Los Standalone Components son componentes que tienen todo lo necesario para pararse ellos mismos, es decir, tomar ese componente y colocarlo en otro lado y que funcione correctamente pero también se puede definir como un componente/módulo, es decir, estos Standalone Components son los mismos componentes que creamos siempre pero en el decorador de @Component tiene la propiedad de standalone en true (los componentes por defecto tiene el standalone en false y por eso no se coloca de forma explícita en el código). Adicionalmente sabemos que nuestros componentes van a necesitar inyección de dependencias, sistema de rutas con RouterModule, directivas como NgIf o NgFor u otras directivas de Angular o pipes de Angular con el CommonModule, y al estar el standalone en true entonces el Standalone Component es un componente común y corriente pero tiene la opción y facilidad de colocarle los imports así como si fuera un módulo y eso nos permite colocar otros módulos, otros Standalone Components o incluso hacer la inyección de dependencias si es necesario
*/

/* ******************************************************************************************************************* */
/* ¿El componente padre que va incluir un componente con standalone component debe ser también standalone component o hay alguna forma de incluir un standalone component sin necesidad que el padre también lo sea? */
/*
En Angular, no es necesario que el componente padre sea un componente standalone para incluir componentes standalones (independientes). De hecho, es común que los componentes standalone se utilicen como "leaf" components, es decir, componentes que no tienen hijos.

Para incluir un componente standalone en un componente padre, puedes utilizar la directiva ng-container para indicar que el componente standalone debe ser renderizado en el template del componente padre.

La independencia de un componente generalmente se refiere a su capacidad para funcionar de manera aislada y reutilizable. Puedes estructurar tu aplicación de manera que tengas componentes standalone que se utilicen en diferentes lugares, ya sea en un componente padre standalone o en uno que no lo sea.
*/
