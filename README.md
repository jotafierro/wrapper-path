# wrapper-path

## ¿Que hace?

> Este proyecto nace de la necesidad de poder hacer un "require" con una "ruta" mas comprensible.

Es un paquete, para poder realizar require de manera más práctica, sin tener que agregar . o ../ a las rutas de los módulos o paquetes que se desean incluir y que pueda hacer desde cualquier lugar del proyecto de la misma manera.

Tomando una ruta base '/' como se hace en los sistemas operativos. Esta puede ser la ruta al directorio del proyecto o a cualquier otro punto dentro del sistema desde donde se desee.

> Este paquete agrega una retorna las funcionalidades para incluir un archivo o modulo, si es que esta existe.

## Uso

### Instalación

Instalar  utilizando npm:

~~~
npm install wrapper-path
npm i --save wrapper-path // agregar directamente al package.json
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

en app.js para iniciar "wrapper-path" (existen 2 formas):

~~~
var path = require('wrapper-path').init({pathRoot: '/home/personal/proyecto'});
~~~

## .init(options)

crea el objeto "$Path" asociado a "global" de node, o lo retorna a una variable. Las opciones son las siguientes:

* **pathRoot:** ruta que se quiere como root '/'
* **inGlobal:** este agrega a "global" la función 'Path' si es seteado como true. (por defecto es false)
* **prefix:** este se agrega antes de 'Path' en el caso de definir inGlobal: true (por defecto $: global.$Path)

#### Ejemplo de uso

En node.js para cargar código de la "carpeta1" en el "script.js" de la "carpeta2", se hace lo siguiente:

~~~
var modulo1 = require('../carpeta1/modulo1.js');
~~~

Pero el objetivo de este paquete, es poder hacer lo mismo desde cualquier lugar del proyecto:

~~~
var modulo1 = path.require('/carpeta1/modulo1.js');
var modulo1 = path.require('/carpeta1', 'modulo1.js');
~~~

##### Otros ejemplo de uso:

cargar el "script.js" de la "carpeta2" en el "script.js" de la "modulo2"

~~~
// sin wrapper-path
var script = require('../../carpeta2/script.js');

// con wrapper-path
var script = path.require('/carpeta2/script.js');
var script = path.require('/carpeta2', 'script.js');
~~~

cargar el "index.js" de la carpeta "modulo2" en "index.js" de la carpeta "carpeta1"

~~~
// sin wrapper-path
var modulo2 = require('./modulo2'); // @nota: node.js por defecto en una carpeta carga el archivo index
var modulo2 = require('./modulo/index.js');

// con wrapper-path
var modulo2 = path.require('/carpeta1/modulo2');
var modulo2 = path.require('/carpeta1/modulo2/index.js');
var modulo2 = path.require('/carpeta1/modulo2', 'index.js');
~~~

# Tareas

* agregar clean/remove folder