# Mercantil Andina

Este proyecto consiste en el challenge técnico de Mercantil Andina donde la consigna era la siguiente:

`Realizar una aplicación en Angular (6+) que contenga un componente formulario “wizard” representando el alta de un asegurado`.

### Dependencias de 3ros

A continuación se detallan las librerías de 3ros utlizadas:

- [ng-zorro-antd](https://ng.ant.design/docs/introduce/en): Libreria de componentes visuales basados en Ant Design.
- [date-fns](https://github.com/date-fns/date-fns#readme): Libreria liviana para el manejo de fechas tanto en el calendario como en archivo de utilidades.
- [ngx-pipes](https://github.com/danrevah/ngx-pipes#readme): Libreria de Pipes para Angular con diferentes pipes de uso común (orderBy, filterBy, ...).
- [ngx-phone-validators](https://github.com/Nightapes/ngx-phone-validators):
- [check-password-strength](https://github.com/deanilvincent/check-password-strength#readme): Librería que permite verificar la seguridad de una contraseña indicando su nivel de complejidad.

### Estructura de proyecto

La organización de carpetas y archivos elegida se basa en módulos funcionales, donde cada módulo encapsula la lógica propia de ese módulo.

A medida que el proyecto crece y es posible identificar mas módulos funcionales, es necesario reagrupar funcionalidades y componentes en común, moviendolos a las carpetas correspondientes.

Las carpetas `core` y `shared` representan funcionalidades compartidas por los diferentes modulos siendo `core` un modulo que se instancia una unica vez y el cual no debe contener componentes visuales. Y `shared` un modulo donde si van los componentes visuales y demas estructuras compartidas el resto de los módulos.

## Requisitos para el desarrollo

Instalar las siguientes dependencias

- Node v14.17.6 (https://github.com/nvm-sh/nvm)
- Npm v6.14.15 (https://github.com/nvm-sh/nvm)
- Angular CLI: `npm i -g @angular/cli`

## Instalación de dependencias

Dentro de la carpeta del projecto ejecutar el siguiente comando para instalar las dependencias del proyecto:

`npm i`

## Servidor de desarrollo.

Ejecutar `ng serve` para levantar el servidor de desarrollo. En un browser navegar a `http://localhost:4200/`.

## Contrucción

Ejecutar `ng build` para construir el proyecto. Los artefactos del proyectos se crean dentro del directio `dist/`.
