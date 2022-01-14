---
title: Crea tu propio CSS Grid system
author: Jose Jesus Ochoa Torres
date: 2020-10-18
excerpt: ¿Qué es un grid system y cómo se construyen?
hero: images/historia-y-evolución-de-los-grid-systems-hero.jpg
---
# Grid systems

Posiblemente si estás leyendo este artículo ya sabes lo que es un grid system o por lo menos has trabajado con algún framework que tenga uno como, Bootstrap, Bulma, Tailwind, etc.

Aun así, si no sabes lo que es, te lo explico brevemente.

- - -

## ¿Qué es un grid system?

La traducción del idioma inglés al español sería, *“Sistema de columnas”*, pero ¿qué significa esto realmente?

> “In basic terms, a grid system is a structure that allows for content to be stacked both vertically and horizontally in a consistent and easily manageable fashion” -[Sitepoint](https://www.sitepoint.com/understanding-css-grid-systems/)

Como menciona el artículo de Sitepoint, un grid system no es otra cosa más que una simple estructura, que nos permite apilar o posicionar nuestro contenido, tanto de manera horizontal como vertical consistentemente.

Esta es una definición muy sencilla, pero carece de sentido si no se ha trabajado anteriormente con ellos, así que iniciemos a construir uno.

- - -

## Preparativos

Antes de continuar, tienes dos opciones:

1. Intenta replicar esta estructura de folders y archivos, e ir agregando el código que se muestre a lo largo del artículo.

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
2. Clonar el proyecto demo desde [Github](https://github.com/JoseJesusOchoaTorres/grid-system-example)

Si decidiste seguir la segunda opción notarás que estoy usando SASS *(scss)*, una de las muchas ventajas que tiene, es poder estructurar tu proyecto en múltiples archivos y después importar todo dentro de uno solo para posteriormente minificarlo, esto me permite tener más organizado mi proyecto y encontrar fácilmente lo que necesito.

Nuestro archivo de SASS principal es `index.scss` y luce más o menos asi:

```scss
@import './normalize/normalize';
@import './normalize/my-normalize';

@import './grid/variables';
@import './grid/mixins';
@import './grid/grid';
```

En él, como puedes ver, estoy importando todos mis otros archivos.

En nuestro archivo `package.json` encontrarás dos NPM scripts:

```js
"scripts":{
    "sass-dev":"sass --watch src/scss/index.scss:build/css/index.css",
    "sass-prod":"sass src/scss/index.scss:build/css/index.min.css --style compressed"
},
```

Estos pueden ser ejecutados desde nuestra línea de comandos / terminal de la siguiente manera:

```js
$ npm istall
```

```js
$ npm run sass-dev
$ npm run sass-prod
```

El primero, *sass-dev*, estará a la escucha de cambios dentro de todos nuestros archivos `.scss` que anteriormente fueran importados dentro de `index.scss`, posteriormente todo nuestro código será transpilando y copiado dentro del folder de `build` en un nuevo archivo llamado `index.css`.

Por otro lado el segundo comando, *sass-prod*, correrá una sola vez, este script tomará todos nuestros archivos `.scss` *(importados en index.scss)* y los moverá de la misma manera dentro del folder de `build` pero ahora en un archivo `index.min.css`. La diferencia es que este archivo está completamente minificado, esto quiere decir que será poco legible al ojo humano *(removiendo todos los espacios o tabulaciones)* pero totalmente comprensible para el browser *(navegador web)* y por lo mismo pesará mucho menos que un archivo que no ha sido minificado.

Si observas el archivo `index.html` estamos usando el archivo `index.css`, en este archivo puedes experimentar con el código que estemos preparando durante este artículo, pero asegurate de usar en producción el archivo `index.min.css`

También he creado un folder con dos archivos, `normalice` y `my-normalize`. El propósito de estos es aplicar ciertas reglas de CSS base, con el objetivo de evitar que cada browser aplique diferentes estilos por defecto, si estas interesado en leer mas al respecto puedes ver la página oficial de [normalize](https://necolas.github.io/normalize.css/) o este [artículo](https://www.kodetop.com/diferencias-entre-reset-css-y-normalize-css/) explicando las diferencias entre normalize, reset y otras opciones.

Una vez explicado esto vamos a iniciar.

- - -

## Anatomía de un grid system

Cada grid system tiene terminologías distintas, así que podrás notar cómo cambian de grid system a grid system, no es realmente importante el nombre de las clases si no el concepto que hay detrás de cada una así como la cantidad de elementos que se involucran.

### 1.- Contenedor principal

Este contenedor principal no lo he visto en todos los grid systems pero si por lo menos en los más populares.

**Función:**

* Envuelve toda o una sección de la página
* Fija una anchura máxima
* Agrega márgenes y/o relleno *(margin y/o padding)*

Dentro de nuestro directorio o folder `grid`, estoy creando un archivo llamado `_variables.scss`, estaremos usando este archivo como un archivo de configuración para el funcionamiento de nuestro grid.

Como mencionamos anteriormente este contenedor le fijara un tamaño maximo, asi que definamos una variable para guardar este valor.

```scss
$container-max-width: 84rem;
```

Como puedes apreciar estoy usando rem en lugar de px, siéntete libre de trabajar con las unidades de medida con las que te sientas más cómodo. Yo estaré usando `rem` por que si por algún motivo me gustaría incrementar o decrementar uniformemente el tamaño bastará con actualizar solo el `font-size` de mi body y todos los lugares donde estoy usando `rem` se verán actualizados.

Ahora dentro de nuestro `_grid.scss` crearemos una clase container, fijaremos la anchura máxima y centraremos este contenedor con márgenes automáticos.

```scss
.container {
    max-width: $container-max-width;
    margin: 0 auto;
}
```

### 2.- Fila *(Row)*

Las filas son elementos indispensables cuando se está trabajando con grid systems; estas son los contenedores de las columnas que explicaremos más adelante.

```scss
.row {
    display: flex;
    flex-wrap: wrap;
}
```

Estoy declarando una clase `.row` en la cual usamos `display: flex` para flotar todos los elementos en su interior *(Children elements en el DOM)* uno al lado del otro, con `flex-wrap: wrap` lo que hacemos es empujar un elemento que ya no cabe en el viewport debajo del primero *(parte inferior izquierda)* ya que nuestros elementos se están ordenando de izquierda a derecha de arriba a bajo.

### 3.- Columnas *(Column)*

Las columnas son los contenedores en los cuales colocaremos nuestro contenido.
Al espacio que existe entre el contenido *(Box model content)* de una columna y el contenido de otra se le conoce como `gutter`, en otras palabras el gutter es el padding interno que tendrán nuestras columnas.

Hay dos tipos de columnas:

#### 3.1.- Tamaño definido automáticamente:

Estas tomarán una anchura automáticamente dependiendo del número de columnas *(sibling columns)* definidas en la misma fila. 

```scss
.col {
    flex-shrink: 1;
    flex-basis: 0;
    flex-grow: 1;
}
```

En pocas palabras estamos usando estas tres propiedades para que nuestra/s columnas puedan aumentar o reducir su tamaño uniformemente dependiendo el numero de columnas; si te interesa conocer un poco mas sobre estas tres propiedades en este [articulo](https://www.paradigmadigital.com/dev/diferencia-flex-basis-width/) escrito por Gema de Rus lo explica muy bien.

En la definición de columna *(Punto 3.)* te hable de los `gutters`, pero en nuestra clase `.col` notaras que no estoy usando la propiedad de `padding` aun, esto se debe a que en el siguiente subtema definiremos un tipo de columna diferente y me gustaría que tanto las columnas definidas en el punto *3.1* y *3.2* tengan el mismo `padding`.

Dentro de nuestro archivo de variables `_variables.scss` agreguemos una nueva:

```scss
$container-max-width: 84rem;
$gutter: 1rem;
```

En nuestro archivo `_grid.scss` fijemos nuestra gutter rule:

```scss
[class*=col] {
    padding: ($gutter / 2);
}
```

De esta manera todas las clases que inicien con `.col` tomarán nuestro gutter padding; estamos dividiendo nuestro valor entre dos por que tenemos que considerar que agregaremos padding tanto del lado izquierdo como del derecho en cada columna, la suma de estos dos lados daría el total de espacio deseado entre el contenido de nuestras columnas.

Puede que por algún motivo no necesites el gutter en todas las columnas de una fila, así que puedes crear una clase para removerlo.

```scss
.row.no-gutter [class*=col] {
    padding: 0;
}
```

O si prefieres algo mas especifico que pueda funcionar en una sola columna *(esta clase se aplicaría directamente a la columna y no a la fila)*:

```scss
[class*=col].no-gutter {
    padding: 0;
}
```

Ahora bien, prosigamos con un tipo de columna un poco más compleja.

#### 3.2.- Tamaño definido manualmente

En este tipo de columnas es necesario definir su tamaño y como se comportara en diferentes resoluciones *(Breakpoints)*.
Antes de iniciar con el comportamiento de nuestras columnas en diferentes resoluciones veamos primero cual es la lógica para definir su tamaño.

Suponiendo que tenemos las siguientes clase y que nuestro grid estará usando 12 columnas:

```scss
.col-12 {
    width: 100%;
}
```

A simple vista podemos observar o intuir que si nuestro grid es de 12 columnas la anchura máxima será de 100%, si queremos ocupar tan solo la mitad, definimos algo así:

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

Y como resultado tendríamos 3 columnas perfectamente balanceadas tomando el equivalente a 4 columnas cada una *(33.333%)* y sumando un total de 12 *(100%)*.

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

*SCSS*    

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

*CSS*

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

Ahora bien, ¿cómo termina de encajar todo esto con nuestro grid system?

```html
<div class="container">
    <div class="row">
        <div class="col-4">Elemento 1</div>
        <div class="col-4">Elemento 2</div>
        <div class="col-4">Elemento 3</div>
    </div>
</div>
```

Tomando como referencia el código de ejemplo mostrado anteriormente, podremos observar como estamos renderizando 3 elementos en la misma fila, abarcando el 100% del espacio disponible ya que suman un total de 12 columnas donde 12 es el 100% *(col-4, 4*3=12)*.

Actualmente contamos con la habilidad de asignar a nuestras columnas un tamaño fijo y este se mantendrá sin importar la resolucion, estoy bastante seguro de que no siempre nos gustara mantener la misma distribución y preferimos indicarle a nuestras columnas como se tienen que comportar en diferentes resoluciones o breakpoints, y para esto usamos clases como las siguientes:

```html
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">Elemento 1</div>
        <div class="col-xs-12 col-sm-6 col-md-4">Elemento 2</div>
        <div class="col-xs-12 col-sm-12 col-md-4">Elemento 3</div>
    </div>
</div>
```

Estamos pasando de usar tamaños fijos a variables especificando cuánto tiene que abarcar cada columna dependiendo del breakpoint. Para conseguir este resultado simplemente se necesita definir estas clases dentro de su respectivo breakpoint/mixin como lo muestro a continuación:

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

Para cada breakpoint/mixin usaremos la misma cantidad de clases y porcentajes, lo único que nos ayuda a diferenciar qué clases serán aplicadas son sus breakpoint sizes *(xs, sm, md y lg)* que concatenamos en la clase *(.col-\[breakpoint-size]-\[column])*.

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

Una vez terminado esto tendrás un grid system funcional, pero recordemos uno de los principios de desarrollo de software llamado *[DRY](https://www.wikiwand.com/es/No_te_repitas)* *(Don't Repeat Yourself)*.
Este principio promueve la reducción de duplicación, y como pudiste notar el hecho de repetir 12 clases de CSS por cada uno de nuestros breakpoints nos daría un total de por lo menos 48 clases; puede que no le veas problema alguno, pero confía en mí, a la larga el mantenimiento de tantas líneas puede volverse un poco tedioso y fácilmente podemos cometer errores si decidimos hacer un cambio.

Una manera de mejorar esto sería hacer uso de los mixins una vez más, así que declaremos una variable donde guardaremos el número de columnas que usará nuestro grid system. 

```scss
$columns-number: 12;
```

`_variables.scss`

```scss
/*------------------------------------*\
* CONTAINER
\*------------------------------------*/
$container-max-width: 84rem;

/*------------------------------------*\
* COLUMNS
\*------------------------------------*/
$columns-number: 12;
$gutter: 1rem;
```

Dentro de nuestro archivo `_mixins.scss` crearemos uno nuevo `gridGenerator`:

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

Retomando el tema, en nuestro nuevo mixin estamos recibiendo un `$breakpoint` el cual tendrá que ser una cadena de texto, por ejemplo *xs, sm, md, lg*. Tambien podras observar un `@for` el cual iterara desde el *1* hasta nuestro número definido de columnas, en este caso *12*. *(Estamos sumando 1 al número de columnas por que las iterariamos parten del 0)*

Este mixin estará creando automáticamente todas las clases del grid, incluso calculará cada porcentaje usando la regla de tres. *(Estoy usando width para ilustrar todo de una manera más sencilla pero se puede usar `flex-basis` y el método `percentage` como se muestra en la línea comentada)*

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

### 4.- Offset a column

Por defecto nuestras columnas siempre inician a posicionarse de izquierda a derecha, quizá te estés preguntando, ¿Cómo puedo centrar un elemento?, ¿Como puedo inciar a posicionar contenido a partir de la mitad de mi fila en adelante? o alguna pregunta por el estilo; una alternativa para lograr estos resultados sería con el uso de columnas vacías, como por ejemplo:

*Alinear a la izquierda (Por defecto)*

```html
<div class="container">
    <div class="row">
        <div class="col-xs-4">Elemento 1</div>
    </div>
</div>
```

*Centrar (Agregando columnas vacías)*

```html
<div class="container">
    <div class="row">
        <div class="col-xs-4"></div>
        <div class="col-xs-4">Elemento 1</div>
        <!-- Puede o no estar esta última columna -->
        <div class="col-xs-4"></div>
    </div>
</div>
```

*Alinear a la derecha (Agregando una columna vacía)*

```html
<div class="container">
    <div class="row">
        <div class="col-xs-8"></div>
        <div class="col-xs-4">Elemento 1</div>
    </div>
</div>
```

*(Nota: En estos ejemplos estamos considerando que nuestro grid system es de 12 columnas)*

En los dos últimos ejemplos estamos haciendo uso de columnas vacías de X tamaño para forzar o mover las columnas que nos interesan a la derecha; yo en lo personal, no estoy muy a favor de este enfoque así que analicemos otra alternativa.

Las clases offset son muy similares a las clases que usamos para definir el tamaño de nuestras columnas y como se tienen que comportar dependiendo de la resolución; la única diferencia es que en lugar de fijar la anchura de la columna, estas clases agregaran un margin left que desplazará a la columna.

*Alinear a la derecha (Agregando una columna vacía)*

```html
<div class="container">
    <div class="row">
        <div class="col-xs-8"></div>
        <div class="col-xs-4">Elemento 1</div>
    </div>
</div>
```

*Alinear a la derecha (Usando offset classes)*

```html
<div class="container">
    <div class="row">
        <div class="col-xs-4 col-xs-offset-8">
            Elemento 1
        </div>
    </div>
</div>
```

Creo que los dos coincidiremos en que la segunda alternativa usando offset classes es más legible ya que no tenemos que crear nuevos elementos en nuestro DOM *(Etiquetas nuevas sin contenido)*. Te mencioné solo unas cuantas líneas arriba que estas clases offset son similares a las clases que usamos para fijar el tamaño de las columnas, así que extendamos esa funcionalidad en el mixin que genera nuestras "column classes".

Dentro del archivo `_mixins.scss` en el `gridGenerator` mixin, agreguemos un nuevo parámetro llamado *offset* y tendrá un valor por defecto de `false`.

```scss
@mixin gridGenerator($breakpoint, $offset: false) {
    /*------------------------------------*\
    # COLUMNS
    \*------------------------------------*/
    @for $column from 1 to $columns-number+1 {
        .col-#{$breakpoint}-#{$column} {
            // flex-basis: percentage($column / $columns-number);
            width: (100% * $column) / $columns-number;
        }
    }

    /*------------------------------------*\
    # OFFSET COLUMNS
    \*------------------------------------*/
    @if $offset {
        @for $column from 1 to $columns-number+1 {
            .col-#{$breakpoint}-offset-#{$column} {
                margin-left: (100% * $column) / $columns-number;
            }
        }
    }
}
```

Estamos usando el nuevo parámetro como una bandera en la cual indicamos si queremos o no generar estas clases; usamos la misma regla de tres para calcular el espacio en blanco que se generará con la única diferencia de que ahora usamos `margin-left` y no `width`. La llamada de nuestros mixins dentro del archivo `_grid.scss` ahora lucirá así:

```scss
/**
* EXTRA SMALL (XS)
*/
@include gridGenerator($breakpoint: 'xs', $offset: true);

/**
* SMALL (SM), MEDIUM (MD), LARGE (LG)
*/
@include sm {
    @include gridGenerator($breakpoint: 'sm', $offset: true);
}

@include md {
    @include gridGenerator($breakpoint: 'md', $offset: true);
}

@include lg {
    @include gridGenerator($breakpoint: 'lg', $offset: true);
}
```

En caso de que tu decidas no generar estas clases offset simplemente cambia el valor a `false` *`($offset: false)`* o borra por completo el parámetro `$offset`.

- - -

## Cierre

Después de haber explicado cada uno de los elementos que conforman a un grid system, hemos logrado construir algo básico, pero realmente funcional *(Grid system de una dimensión)*. Durante este artículo me esforcé más por redactar algo que te ayude a comprender exactamente cómo funciona un grid system, en lugar de intentar construir algo que pudiera llegar a competir con los más populares ya antes mencionados.

Se que muchos afirman que el uso de grid systems va en declive, y esto me parece una verdad a medias; definitivamente muchas personas dejaron de usar CSS frameworks y grid systems con el surgimiento de `display: grid`, esto es totalmente comprensible ya que en muchas ocasiones queremos maquetar algo rapido, sin agregar tiempos de carga *(por código de terceros)*, y mas sabiendo que `grid` es la manera nativa de generar filas y columnas para trabajar con dos dimensiones. Por otro lado, tenemos compañías grandes como IBM, Oracle, Github, etc., en las cuales se requiere cumplir con ciertos estándares de calidad, accesibilidad y conseguir el mismo “Look and feel” que le pertenece a cada una. Entonces tiene más sentido construir un "Grid system" e incorporarlo dentro de un "Design system" para asegurar el cumplimiento de lo ya antes mencionado. Estos no son los únicos casos de uso, y valdría la pena evaluar antes de cada proyecto si es necesario o no usar un grid system.

El verdadero motivo detrás de este artículo es despertar la curiosidad que hay en ti para intentar comprender cómo funcionan esas herramientas que usamos día a día, estoy seguro que más de alguno de los lectores que están leyendo este artículo ha trabajado con un grid system pero no se habían detenido a analizar cómo es que funcionan.

No hay mejor manera de aprender, que analizar proyectos open source para después intentar contribuir en ellos; quizá la primera vez que vemos el código fuente no lograremos entender cómo funciona, cómo está organizado, o cual es el propósito de cada elemento, pero te aseguro que con el paso del tiempo y en cada iteración que des, te iniciara a lucir más sencillo, incluso familiar, después de un tiempo serás capaz de contribuir, ya sea en documentación, solucionando issues o incorporando nuevas funcionalidades. 

Así que la próxima vez que estés trabajando con alguna librería o framework pregúntate:

***¿Cómo es que esto fue construido?***

- - -

## Extra

* **[Código Fuente](https://github.com/JoseJesusOchoaTorres/grid-system-example)**
* **[Live Demo](https://josejesusochoatorres.github.io/grid-system-example/index.html)**