import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.module').then((module) => module.MapsModule),
  },
  /* al cargar un standalone component por lazyload se hace con loadComponent y se importa el componente/módulo a utilizar */
  {
    path: 'alone',
    loadComponent: () =>
      import('./standalone/pages/alone-page/alone-page.component').then(
        (module) => module.AlonePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'maps',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
