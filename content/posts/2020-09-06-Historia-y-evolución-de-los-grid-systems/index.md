---
title: Crea tu propio grid system
author: Jose Jesus Ochoa Torres
date: 2020-09-06T00:00:00.000Z
excerpt: '¿Qué es un grid system?, ¿Por qué surgieron?, ¿Cómo se construyen?'
hero: images/historia-y-evolución-de-los-grid-systems-hero.jpg
---
# Construye tu propio grid system

Posiblemente si estás leyendo este artículo ya sabes lo que es un grid system o por lo menos has trabajado con algún framework que tenga uno como, Bootstrap, Bulma, Tailwind, etc.

Aun así, si no sabes lo que es, te lo explico brevemente.

___

## ¿Qué es un grid system?

La traducción del idioma inglés al español sería, *“Sistema de columnas”*, pero ¿qué significa esto realmente?

> “In basic terms, a grid system is a structure that allows for content to be stacked both vertically and horizontally in a consistent and easily manageable fashion” -[Sitepoint](https://www.sitepoint.com/understanding-css-grid-systems/)

Como menciona el artículo de Sitepoint, un grid system no es otra cosa más que una simple estructura, que nos permite apilar o posicionar nuestro contenido, tanto de manera horizontal como vertical consistentemente.

Esta es una definición muy sencilla, pero carece de sentido si no se ha trabajado anteriormente con ellos, así que iniciemos a construir uno.

---

## Preparativos antes de iniciar

Antes de continuar, intenta replicar esta estructura de folders y ficheros.

```
ProjectName
    build
    src
        grid
            _grid.scss
            _mixins.scss
            _variables.scss
        normalize
            _my-normalize.scss
            _normalize.scss
        index.scss
    index.html
    package.json
```

Notarás que estoy usando SASS *(scss)*,  una de las muchas ventajas que tiene, es poder estructurar tu proyecto en múltiples archivos y después importar todo dentro de uno solo para posteriormente minificarlo, esto me permite tener más organizado mi proyecto y encontrar fácilmente lo que necesito.

Nuestro archivo de SASS principal es `index.scss` y luce más o menos asi:

```scss
@import './normalize/normalize';
@import './normalize/my-normalize';

@import './grid/variables';
@import './grid/mixins';
@import './grid/grid';
```

En él, como puedes ver, estoy importando todos mis otros archivos.

En nuestro archivo `package.json` podrás ver dos scripts:

```js
"scripts":{
    "sass-dev":"sass --watch src/scss/index.scss:build/css/index.css",
    "sass-prod":"sass src/scss/index.scss:build/css/index.min.css --style compressed"
},
````

Estos scripts pueden ser ejecutados desde nuestra línea de comandos / terminal de la siguiente manera:

```js
$ npm run sass-dev
$ npm run sass-prod
```

El primero, *sass-dev*, estará a la escucha de cambios dentro de todos nuestros archivos `.scss` que anteriormente fuera importados dentro de `index.scss`, posteriormente todo nuestro código será transpilando y copiado dentro del folder de `build` en un nuevo archivo llamado `index.css`.

Por otro lado el segundo comando, *sass-prod*, correrá una sola vez, este script tomará todos nuestros archivos `.scss` _(importados en index.scss)_ y los moverá de la misma manera dentro del folder de `build` pero ahora en un archivo `index.min.css`. La diferencia es que este archivo está completamente minificado, esto quiere decir que será poco legible al ojo humano *(removiendo todos los espacios o tabulaciones)* pero totalmente comprensible para el browser y por lo mismo pesará mucho menos que un archivo que no ha sido minificado.

Si observas el archivo `index.html` estamos usando el archivo `index.css`, en este archivo puedes experimentar con el código que estemos preparando durante este artículo, pero asegurate de usar en producción el archivo `index.min.css`

También he creado un folder con dos archivos, `normalice` y `my-normalize`. El propósito de estos es aplicar ciertas reglas de CSS base, con el objetivo de evitar que cada browser aplique diferentes estilos por defecto, si estas interesado en leer mas al respecto puedes ver la página oficial de [normalize](https://necolas.github.io/normalize.css/) o este [artículo](https://www.kodetop.com/diferencias-entre-reset-css-y-normalize-css/) explicando las diferencias entre normalize, reset y otras opciones.

Una vez explicado esto vamos a iniciar.

---

## Anatomía de un grid system

Cada grid system tiene terminologías distintas, así que podrás notar cómo cambian de grid system a grid system, no es realmente importante el nombre de las clases si no el concepto que hay detrás de cada una así como la cantidad de elementos que se involucran.

### 1.- Contenedor principal

Este contenedor principal no lo he visto en todos los grid systems pero si por lo menos en los más populares.

__Función:__

* Envuelve toda o una sección de la página
* Fija una anchura máxima
* Agrega márgenes y/o relleno *(margin y/o padding)*

Dentro de nuestro directorio o folder `grid` estoy creando un archivo llamado `_variables`, estaremos usando este archivo como un archivo de configuración para el funcionamiento de nuestro grid.

Como mencionamos anteriormente este contenedor le fijara un tamaño maximo, asi que definamos una variable para guardar este valor.

```scss
$container-max-width: 84rem;
```

Como puedes apreciar estoy usando rem en lugar de px, siéntete libre de trabajar con las unidades de medida con las que te sientas más cómodo. Yo estaré usando `rem` por que si por algún motivo me gustaría incrementar o decrementar uniformemente el tamaño bastará con actualizar solo el `font-size` de mi body y todos los lugares donde estoy usando `rem` se verán reflejados.

Ahora dentro de nuestro `_grid.scss` crearemos una clase container, fijaremos la anchura máxima y centraremos este contenedor con márgenes automáticos.

```scss
.container {
    max-width: $container-max-width;
    padding: 0 ($gutter / 2);
    margin: 0 auto;
}
```

### 2.- Fila *(Row)*

Las filas son elementos indispensables cuando se está trabajando con grid systems; estas son los contenedores de las columnas que explicaremos más adelante.

```scss
.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 (($gutter / 2) * -1);
}
```

Estoy declarando una clase `.row` en la cual usamos `display: flex` para flotar todos los elementos en su interior _(Children elements en el DOM)_ uno al lado del otro, con `flex-wrap: wrap` lo que hacemos es empujar un elemento que ya no cabe en el viewport debajo del primero _(parte inferior izquierda)_ ya que nuestros elementos se estarán ordenando de izquierda a derecha de arriba a bajo. Por último la parte más confusa para la mayoría es el uso de los valores negativos en el margin, `margin: 0 (($gutter / 2) * -1);`, esta propiedad no es indispensable pero lo usan la mayoría de los grid systems para contrarrestar el padding interno que tendrán nuestras clases `.col` _(columns/columnas)_.

### 3.- Columnas *(Column)*

Las columnas son los contenedores en los cuales colocaremos nuestro contenido; hay dos tipos de columnas:

#### 3.1.- Tamaño definido automáticamente:

Estas tomarán una anchura automáticamente dependiendo del número de columnas _(sibling columns)_ definidas en la misma fila.

```scss
.col {
    flex-shrink: 1;
    flex-basis: 0;
    flex-grow: 1;
}
```

En pocas palabras estamos usando estas tres propiedades para que nuestra/s columnas puedan aumentar o reducir su tamaño uniformemente dependiendo el numero de columnas; si te interesa conocer un poco mas sobre estas tres propiedades en este [articulo](https://www.paradigmadigital.com/dev/diferencia-flex-basis-width/) escrito por Gema de Rus lo explica muy bien.

#### 3.2.- Tamaño definido manualmente

En este tipo de columnas es necesario definir su tamaño y como se comportara en diferentes resoluciones _(Breakpoints)_.
Antes de iniciar con el comportamiento de nuestras columnas en diferentes resoluciones veamos primero cual es la lógica para definir su tamaño.

Suponiendo que tenemos las siguientes clase y que nuestro grid estará usando 12 columnas:

```scss
.col-12 {
    width: 100%;
}
```

A simple vista podemos observar o intuir que si nuestro grid es de 12 columnas la anchura máxima será de 100%, si queremos ocupar tan solo la mitad definimos algo así:

```scss
.col-6 {
    width: 50%;
}
```

¿Pero cuáles son las matemáticas detrás de estos tamaños?
Es simple, para definir los demás tamaños usaremos una regla de tres.

```
12 = 100
11 = ?
-------------
(11 * 100) / 12 = 91.666%
```

Entonces nuestras clases quedarían de la siguiente manera:

```scss
.col-12 {
    width: 100%
}

.col-11 {
    width: 91.666%
}

.col-10 {
    width: 83.333%
}

.col-9 {
    width: 75%
}

.col-8 {
    width: 66.666%
}

.col-7 {
    width: 58.333%
}

.col-6 {
    width: 50%
}

.col-5 {
    width: 41.666%
}

.col-4 {
    width: 33.333%
}

.col-3 {
    width: 25%
}

.col-2 {
    width: 16.666%
}

.col-1 {
    width: 8.333%
}
```

Estas clases las pudiéramos usar de la siguiente manera:

```html
<div class="container">
    <div class="row">
        <div class="col-4">Elemento 1</div>
        <div class="col-4">Elemento 2</div>
        <div class="col-4">Elemento 3</div>
    </div>
</div>
```

Y como resultado tendríamos 3 columnas perfectamente balanceadas tomando el equivalente a 4 columnas cada una _(33.333%)_ y sumando un total de 12 _(100%)_.

La teoría detrás de un grid system es muy simple pero no hemos terminado aún; recordemos mencione anteriormente que en este tipo de columnas nosotros definimos cuanto tienen que medir en diferentes resoluciones, y eso será lo siguiente con lo que estaremos trabajando.

**Punto de ruptura / Breakpoint**

Los breakpoints son un punto de cambio para nuestro layout, y usamos estos para modificar la distribución del contenido dependiendo la anchura de cada dispositivo, ya que definitivamente no queremos mostrar de la misma manera el contenido en un smartphone, tablet o un monitor con resoluciones superiores.

No hay un estandar para definir los breakpoints, incluso tu podras notar en la documentación de [Bulma](https://bulma.io/documentation/overview/responsiveness/#breakpoints), [Bootstrap](https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints), Carbon, etc, como cada uno tiene definidas sus propias resoluciones.

En nuestro proyecto usaremos las siguientes:

```scss
// Small devices (landscape phones, etc)
$screen-xs-max: 768px;

// Medium devices (tablets, 768px and up)
$screen-sm-min: 768px;

// Large devices (desktops, 992px and up)
$screen-md-min: 992px;

// Extra large devices (large desktops, 1200px and up)
$screen-lg-min: 1200px;
```

Como podrás notar, estas son variables, las cuales agregaremos dentro de nuestro archivo de `_variables.scss`; serán usadas en más de un lugar y por eso mismo vale la pena definirlas como variables, evitando tener que reemplazar su valor en todos los lugares donde se requiera, de esta manera si el dia de mañana tenemos o queremos cambiar la resolución de un breakpoint simplemente bastará con reemplazar el valor de la variable.

**Media query**

Para definir los breakpoints en nuestro grid system necesitamos hacer uso de los media queries. Los media queries son unas estructuras específicas en las cuales tu indicas cuándo y qué reglas de CSS se van a aplicar. Para más información consulta la página de la [w3schools](https://www.w3schools.com/css/css3_mediaqueries.asp).

La estructura de un media query es la siguiente.

```scss
@media not|only mediatype and (expressions) {
    CSS-Code;
}
```

Antes de continuar con la definición de nuestros mediaqueries/breakpoints tenemos que considerar un tema más.

**SASS Mixins**

Un mixin es algo muy similar a lo que conocemos como funciones en lenguajes de programación, en ellos podemos declarar N cantidad reglas de CSS y utilizarlas en más de un lugar, incluso podemos pasar parámetros para tener un mixin aún más flexible. Se que dentro de SASS podemos encontrar también funciones / `@function` como tal pero la principal diferencia entre un mixin y una función dentro de SASS radica en que la función devuelve un valor mientras que los mixins se usan para generar N cantidad de CSS rules, así que un mixin encaja a la perfección para lo que queremos solucionar más adelante.

El ejemplo practico que la misma [documentacion](https://sass-lang.com/guide#topic-6) nos muestra sobre un mixin es el siguiente:

_SCSS_    

```scss
@mixin transform($property) {
    -webkit-transform: $property;
    -ms-transform: $property;
    transform: $property;
}

.box {
    @include transform(rotate(30deg));
}
```

_CSS_

```scss
.box {
    -webkit-transform: rotate(30deg);
    -ms-transform: rotate(30deg);
    transform: rotate(30deg);
}
```

El ejemplo está muy claro, simplemente estamos definiendo un mixin llamado `transform` el cual va a recibir como parámetro la propiedad de `rotate` y será llamado dentro de nuestra clase `.box`, como resultado final, nuestro mixin de transform agregara las propiedades con sus respectivos prefijos para Firefox y Chrome.

Una vez mencionado lo que son los breakpoints, media queries y mixins, procederemos a crear los mixins que usaremos para cada breakpoint.

Dentro del siguiente path `src/scss/_mixins.scss` definiremos los siguientes mixins:

```scss
@mixin xs {
    @media (max-width: #{$screen-xs-max}) {
        @content;
    }
}

@mixin sm {
    @media (min-width: #{$screen-sm-min}) {
        @content;
    }
}

@mixin md {
    @media (min-width: #{$screen-md-min}) {
        @content;
    }
}

@mixin lg {
    @media (min-width: #{$screen-lg-min}) {
        @content;
    }
}
```

Se que notaste el `@content`, esta directiva nos ayudará a inyectar todas las reglas de CSS dentro de nuestros media queries por ejemplo:

```scss
@include xs {
    h1 {
        color: red;
    }
}

@include sm {
    h1 {
        color: orange;
    }
}
```

A partir de 0px hasta los 768px todas las etiquetas `h1` se veran de color rojo, y de los 769px en adelante las mismas etiqueta ahora se veran de color naranja.

Ahora bien, ¿cómo terminan de encajar todo esto con nuestro grid system?

```html
<div class="container">
    <div class="row">
        <div class="col-4">Elemento 1</div>
        <div class="col-4">Elemento 2</div>
        <div class="col-4">Elemento 3</div>
    </div>
</div>
```

Tomando como referencia el código de ejemplo mostrado anteriormente, podremos observar como estamos renderizando 3 elementos en la misma fila, abarcando el 100% del espacio disponible ya que suman un total de 12 columnas donde 12 es el 100% _(col-4, 4*3=12)_.

Actualmente contamos con la habilidad de asignar a nuestras columnas un tamaño fijo y este se mantendrá sin importar la resolucion, estoy bastante seguro de que no siempre nos gustara mantener la misma distribución y preferiríamos indicarle a nuestras columnas como se tienen que comportar en diferentes resoluciones o breakpoints, y para esto usamos clases como las siguientes:


```html
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">Elemento 1</div>
        <div class="col-xs-12 col-sm-6 col-md-4">Elemento 2</div>
        <div class="col-xs-12 col-sm-12 col-md-4">Elemento 3</div>
    </div>
</div>
```

Estamos pasando de usar tamaños fijos a variables especificando cuánto tiene que abarcar cada columna dependiendo del breakpoint. Para conseguir este resultado simplemente se necesita definir estas clases dentro de su respectivo breakpoint mixin como lo muestro a continuación:


```scss
@include xs {
    .col-xs-12 {
        width: 100%
    }

    .col-xs-11 {
        width: 91.666%
    }

    .col-xs-10 {
        width: 83.333%
    }

    .col-xs-9 {
        width: 75%
    }

    .col-xs-8 {
        width: 66.666%
    }

    .col-xs-7 {
        width: 58.333%
    }

    .col-xs-6 {
        width: 50%
    }

    .col-xs-5 {
        width: 41.666%
    }

    .col-xs-4 {
        width: 33.333%
    }

    .col-xs-3 {
        width: 25%
    }

    .col-xs-2 {
        width: 16.666%
    }

    .col-xs-1 {
        width: 8.333%
    }
}
```

Para cada breakpoint mixin usaremos la misma cantidad de clases y porcentajes, lo único que nos ayuda a diferenciar qué clases serán aplicadas son sus breakpoint sizes _(xs, sm, md y lg)_ que concatenamos en la clase _(.col-[breakpoint-size]-[column])_.

```scss
@include sm {
    .col-sm-12 {
        width: 100%
    }

    ...

    .col-sm-6 {
        width: 50%
    }

    ...

    .col-sm-1 {
        width: 8.333%
    }
}

@include md {
    .col-md-12 {
        width: 100%
    }

    ...

    .col-md-6 {
        width: 50%
    }

    ...

    .col-md-1 {
        width: 8.333%
    }
}

@include lg {
    .col-lg-12 {
        width: 100%
    }

    ...

    .col-lg-6 {
        width: 50%
    }

    ...

    .col-lg-1 {
        width: 8.333%
    }
}
```

Una vez terminado esto tendrás un grid system funcional, pero recordemos uno de los principios de desarrollo de software llamado [*DRY*](https://www.wikiwand.com/es/No_te_repitas) _(Don't Repeat Yourself)_.
Este principio promueve la reducción de duplicación, y como pudiste notar el hecho de repetir 12 clases de CSS por cada uno de nuestros breakpoints nos daría un total de por lo menos 48 clases; puede que no le veas problema alguno pero confía en mí, a la larga el mantenimiento de tantas líneas puede volverse un poco tedioso y fácilmente podemos cometer errores si decidimos hacer un cambio.

Una manera de mejorar esto sería hacer uso de los mixins una vez más. Dentro de nuestro archivo de `_mixins.scss` crearemos nuestro `gridGenerator` mixin:

```scss
@mixin gridGenerator($breakpoint) {
    @for $column from 1 to $columns-number+1 {
        .col-#{$breakpoint}-#{$column} {
            // flex-basis: percentage($column / $columns-number);
            width: (100% * $column) / $columns-number;
        }
    }
}
```

Para construir un grid system no es necesario usar un preprocesador, desde tiempo atrás podemos hacer uso de `calc()` para hacer operaciones o tener variables nativas, pero para mi una de las ventajas más grandes que tiene un preprocesador es la capacidad de implementar loops/ciclos o condicionales, esto es muy común en lenguajes de programación pero no es posible de manera nativa por ahora en CSS.

Retomando el tema, en nuestro nuevo mixin estamos recibiendo un `$breakpoint` el cual tendrá que ser una cadena de texto, por ejemplo _xs, sm, md, lg_. Tambien podras observar un `@for` el cual iterara desde el _1_ hasta nuestro número definido de columnas, en este caso _12_. _(Estamos sumando 1 al número de columnas por que las iterariamos parten del 0)_

Este mixin estará creando automáticamente todas las clases del grid, incluso calculará cada porcentaje usando la regla de tres. _(Estoy usando width para ilustrar todo de una manera más sencilla pero se puede usar flex-basis y el método de percentage como se muestra en la línea comentada)_

Dentro de nuestro archivo `_grid.scss` llamaremos nuestros mixins de la siguiente manera:

```scss
@include xs {
    @include gridGenerator($breakpoint: 'xs');
}

@include sm {
    @include gridGenerator($breakpoint: 'sm');
}

@include md {
    @include gridGenerator($breakpoint: 'md');
}

@include lg {
    @include gridGenerator($breakpoint: 'lg');
}
```

Y sin lugar a duda sería una versión más limpia, ordenada y mantenible. Esto tendría que seguir generando todas nuestras clases del grid system tal y como si las hubiéramos definido manualmente como lo hicimos anteriormente.

Espero ahora puedas ver todo el potencial que te brinda el uso de preprocesadores, no me gustaría extender aún más este artículo, así que hablaremos de [Functional CSS](https://critter.blog/2018/06/08/in-defense-of-functional-css/) y generadores de clases para _paddings, margins, colors, backgrounds, etc_ en otra ocasión.

