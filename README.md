# Angular & TypeScript - Angular Mapbox App

---

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Los temas que se verán:

- Manejo de librerías escritas en JavaScript en TypeScript
- Uso de Mapas basados en Mapbox (el API es similar a la de Google Maps)
- Marcadores
- Eventos
- FlyTo
- Coordenadas geográficas
- Componentes para re-utilización de mapas
- Mantener objetos de forma persistente
- @types
- Zoom
- Range

Aunque el uso de mapas no es algo directamente relacionado con Angular, ya que todo se realiza mediante un objeto de una librería de terceros como en este caso con Mapbox, es interesante comprender cómo funcionan esas librerías dentro de Angular y cómo poder tener control de los objetos como si fueran propiedades de nuestras clases.

### \* PASOS A REALIZAR:

1. Para usar Mapbox ir al círculo del perfil -> Documentation -> Mapbox GL JS (está abajo) -> GUIDES / Installation -> bajar un poco y hay dos formas de hacerlo: (si no usar este link https://docs.mapbox.com/mapbox-gl-js/guides/install/)

   - Mapbox CDN: Instalarlo de forma global con un CDN
   - Module bundler: Que es lo que tenemos en Angular ya que tenemos un empaquetador
     - `npm install --save mapbox-gl` (si vamos a https://www.npmjs.com/package/mapbox-gl nos daremos cuenta que tiene el símbolo de DT que son los archivos de definición de TypeScript lo que quiere decir que no está escrito en TypeScript como tal. Entonces los paquetes de terceros que no estén escritos en TypeScript pero que tengan estos archivos de definición de TypeScript entonces nos permite usar estos paquetes en proyectos que usen TypeScript y nos permite tener su tipado estricto pero mediante sus Types)

2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Bootstrap (CDN): https://getbootstrap.com/

  ```html
  <!-- Bootstrap CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
  ```

- dotenv: https://www.npmjs.com/package/dotenv

  - `npm i -D dotenv`

- Mapbox Styles: https://docs.mapbox.com/mapbox-gl-js/guides/install/

  ```html
  <!-- Mapbox Styles -->
  <link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet" />
  ```

### \* NOTAS:

- Variables de entorno en Angular

  - Angular maneja las variables de entorno con una carpeta `src/environments/environments.ts` donde se pueden crear diferentes archivos como `environments.ts` o `environments.prod.ts` o `environments.dev.ts` o etc. Al trabajarlo de esa forma se tendría que ir al archivo `angular.json` y configurar cuando estemos en producción y cuando estemos en desarrollo, etc.
  - Angular por defecto no trabaja o no hace uso de `.env` aunque hay formas o paquetes de terceros para poder usar el `.env` de forma directa en donde se necesitaría esa variable de entorno. En este caso al hacerlo de una forma personalizada, es decir, creando el `.env` y al colocarlo en el `.gitignore` para que no se suban esos archivos al repositorio (`.env` y `src/environments/environments.ts`), entonces se creará un nuevo script para que apartir de las varaibles del `.env` se cree un archivo `environments.ts` para poder utilizarlo en el proyecto.

    - Se creó `scripts/set-env.js` donde está el código de node que vamos a utilizar para crear la carpeta y archivo.
    - Se creó el script en package.json `"create-env": "node ./scripts/set-env.js",` para leer ese archivo creado el cual se correrá en al terminal como `npm run create-env`
    - Se actualizarán algunos scripts para no hacerlo de forma manual sino de forma automática:

      ### - Antes

      ```json
        "scripts": {
          "create-env": "node ./scripts/set-env.js",
          "start": "ng serve -o",
          "build": "ng build",
        },
      ```

      ### - Ahora

      ```json
        "scripts": {
          "create-env": "node ./scripts/set-env.js",
          "start": "npm run create-env & ng serve -o", // para desarrollo
          "build": "npm run create-env & ng build", // para producción
        },
      ```

- Al colocar `import { Map } from 'mapbox-gl';` nos pedirá que instalemos los archivos de definición de TypeScript `npm i --save-dev @types/mapbox-gl`

- Si hay problemas al hacer build como por ejemplo: `Error: bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 200.74 kB with a total of 1.20 MB.` se puede revisar este link https://stackoverflow.com/questions/53995948/warning-in-budgets-maximum-exceeded-for-initial

---

# AngularMapboxApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
