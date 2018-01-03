# wrapper-path

## ¿Que hace?

> Este proyecto nace de la necesidad de poder hacer un "require" con una "ruta" mas comprensible.

Es un paquete, para poder realizar **require** de manera más práctica, sin tener que agregar **.** o **../** a las rutas de los módulos o paquetes que se desean incluir y que pueda hacer desde cualquier lugar del proyecto de la misma manera.

Tomando una ruta base '/' como se hace en los sistemas operativos. Esta puede ser la ruta al directorio del proyecto o a cualquier otro punto dentro del sistema desde donde se desee.

## Uso

### Instalación

Instalar utilizando npm:

~~~bash
yarn add wrapper-path
# npm i --save wrapper-path
~~~

### Configuración

Pensemos en la siguiente estructura de archivos:

~~~
/home
    /personal
        /proyecto
            app.js
            /carpeta1
                index.js
                module1.js
                /modulo2
                    index.js
                    script.js
            /carpeta2
                script.js
~~~

### Path

##### constructor

Este método es el que se llama cuando se realiza el siguiente código:

```javascript
const Path = require('wrapper-path');
let path = new Path(param);
```

**Argumentos**:

- param \(*String*\) **required**: ruta que queremos tener como base de nuestro proyecto

**Retorna**:

\(*Path*\): Retorna la instancia de la clase **Path**

#### get

Este método permite obtener la ruta completa a el archivo o directorio que solicitemos por parámetro.

```javascript
const Path = require('wrapper-path');
let path = new Path('/home/personal/proyecto');

path.get('/app.js'); // /home/personal/proyecto/app.js
```

**Argumentos**:

- param \(*String*\) **required**: ruta que queremos obtener.

**Retorna**:

\(*String*\): retorna la ruta completa.

#### require

Este método permite hacer el **require** como si fuera nativo pero tomando la ruta base con la cual se instancia nuestro objeto path.

```javascript
const Path = require('wrapper-path');
let path = new Path('/home/personal/proyecto');
let app = path.require('/app.js');
let carpeta1 = path.require('/carpeta1');
```

**Argumentos**:

- param \(*String*\) **required**: ruta que queremos cargar.

**Retorna**:

\(*File/Folder*\): retorna la carga del archivo o carpeta.

#### recursive(files,folders)

Esta funcionalidad **recursive**, es para obtener un listado recursivamente de todos los archivos o carpetas de un directorio en especifico.

```javascript
const Path = require('wrapper-path');
let path = new Path('/home/personal/proyecto');
let files = path.recursive.files(param, opts);
let folders = path.recursive.folders(param, opts);
```

**Argumentos**:

- param \(*String*\) **required**: ruta de la carpeta que queremos obtener los archivos o carpetas.
- opts \(*Object*\):
    - match \(*RegExp*\): expresión regular para determinar que rutas conservar
    - exclude \(*RegExp*\): expresión regular para determinar que rutas excluir del resultado
    - maxDepth \(*Number*\): profundidad con la que se desea obtener el listado de archivos

> NOTA: tener en consideracion el uso de la bandera de busqueda **g** en las [RegExp][RegExp], ya que a puede entregar resultados erroneos, mas información [aquí][RexExp-g-wrong-results]

**Retorna**:

\(*Array*\): retorna un arreglo de con las rutas de los archivos o carpetas.

#### remove(file,files,folder,folders)

Esta funcionalidad **remove**, es para borrar un archivo, archivos de una carpeta, una carpeta, o las carpetas de una carpeta.

```javascript
const Path = require('wrapper-path');
let path = new Path('/home/personal/proyecto');
path.remove.file(param);
path.remove.files(param, opts);
path.remove.folder(param);
path.remove.folders(param, opts);
```

**Argumentos**:

- param \(*String*\) **required**: ruta de la carpeta o archivo que queremos eliminar.
- opts \(*Object*\):
    - match \(*RegExp*\): expresión regular para determinar que rutas conservar
    - exclude \(*RegExp*\): expresión regular para determinar que rutas excluir del resultado

**Retorna**:

\(*Array*\): retorna un arreglo de con las rutas de los archivos o carpetas.

## Pruebas funcionales (Unit Testing)

Se llevaron a cabo 12 pruebas funcionales las cuales evalúan todos los casos de éxito y fallo de cada una de las funcionalidades antes nombradas, para ver el resultado:

```bash
$ yarn test-spec
# yarn test
```

## Pruebas de rendimiento (benchmark)

Con el objetivo de que sea optimo el código se realizaron 2 pruebas de rendimiento, de las cuales se determino que:

- utilizar ***startsWith** es mucho mas optimo que hacer un **RegExp**, cuando uno quiere validar si una cadena contiene un texto al inicio. Para correr la prueba:

    ```bash
    $ yarn benchmark benchmarck/regex-startsWith.js
    ```

- Utilizar **slice** o **substr** es muy similar en rendimiento. Para correr la prueba:

    ```bash
    $ yarn benchmark benchmarck/slice-substr.js
    ```

[RegExp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
[RexExp-g-wrong-results]: https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results

# Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

## [Unreleased]

## [2.1.2] - 2018-01-03
### Changed
- Se modifica mensaje de error cuando no se encuentra el archivo/carpeta, con el objetivo de tener conocimiento de a que esta intentando acceder

## [2.1.1] - 2018-01-03
### Changed
- Corrección de documentación de **remove** y detalles ortográficos

## [2.1.0] - 2017-11-20
### Added
- Función **recursive** tiene como opción de profundidad máxima (maxDepth) con la que se desea obtener el listado de archivos/carpetas

## [2.0.2] - 2017-11-20
### Removed
- CHANGELOG.md se elimina el archivo y se incluye al final de README.md

### Fixed
- Resultados de la funcionalidad **recursive.files**

## [2.0.1] - 2017-11-17
### Changed
- Se mejora el rendimiento de las funcionalidades, utilizando **for** en vez de **forEach**

## [2.0.0] - 2017-09-25
### Changed
- Se crea una clase en vez de funcionalidades separadas

### Added
- Obtener listado de archivos o carpetas de un directorio o poder filtrar las rutas por expresiones regulares
- Poder eliminar los archivos de una carpeta o la carpeta o poder filtrar que eliminar por expresiones regulares

### Removed
- Se elimina la funcionalidad para agregar a **global** de node, ya que esto está fuera del objetivo principal del modulo que es simplificar el uso del require del path y tener algunas funciones extras que son comunes en el uso de archivos y carpetas

### Fixed
- Se elimina el uso de lodash, para mejorar el rendimiento del modulo

## [1.0.1] - 2016-11-04
### Added
- Obtener ruta completa en segun la base que instancia el wrapper
- Utilizar **require** del wrapper como el require nativo de node
- Permite agregar al objeto **global** de node según un prefijo