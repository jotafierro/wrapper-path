# Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

## [Unreleased]

## [2.1.3] - 2018-02-01
### Added
- Se agrega archivo CHANGELOG.md
- Se agrega travis.yml para utilizar badge
- Se [istanbul][nyc] para

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

## [v2.0.1] - 2017-11-17
### Changed
- Se mejora el rendimiento de las funcionalidades, utilizando **for** en vez de **forEach**

## [v2.0.0] - 2017-09-25
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


[nyc]: https://istanbul.js.org/