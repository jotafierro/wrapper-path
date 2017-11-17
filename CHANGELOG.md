# Changelog

Todos los cambios importantes son escritos aquí. El Formato esta basado en [Keep a Changelog](http://keepachangelog.com/es-ES/1.0.0/)

## [Unreleased]

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
- Obtener ruta completa en segun la base que se instancio el wrapper
- Utilizar **require** del wrapper como el require nativo de node
- Permite agregar al objeto **global** de node segun un prefijo