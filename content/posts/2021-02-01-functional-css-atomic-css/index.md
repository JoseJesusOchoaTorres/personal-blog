---
title: Functional CSS
author: Jose Jesus Ochoa Torres
date: 2021-01-29
excerpt: What the Functional CSS is and how you can use it to build CSS Frameworks
hero: images/pankaj-patel-6jvlsdgmace-unsplash.jpg
---
# Functional CSS / Atomic CSS

A while ago, I published an article explaining how grid systems work and how you can create one from scratch. I'll like to complement that article by talking about functional CSS _(Atomic CSS)_; you can find this approach with both names, but be careful "Atomic CSS" is not the same as Atomic design.


## What the functional CSS is?

This approach consists of creating reusable and small CSS classes with only one purpose. We can create a class to change the background color, text color, paddings, etc. These are just examples; you can use your imagination to create the CSS classes appropriate for your project.

Let me show you more examples to try to reinforce my definition above.

**Updating text color:**

```css
.text-color-red {
    color: red;
}

.text-color-yellow {
    color: yellow;
}

...
```

**Updating padding:**

```css
.padding-1 {
    padding: 1rem;
}

.padding-top-1 {
    padding-top: 1rem;
}

.padding-bottom-1 {
    padding-bottom: 1rem;
}

...
```

**Updating padding and margin**

```css
.no-spacing {
    padding: 0;
    margin: 0;
}
```

As you can see, it's a regular pattern to use, one class by one CSS property, but this is not a rule. Pay attention to my last example where I'm removing the padding, and margin in the same class, so we can say that we have a one purpose CSS class.


## When you can use this approach?

To try to answer this, let's talk about my first IBM role. The official name of that role was "Web Builder" or the equivalent outside of IBM, Web Designer.

The Web builder's goal is to create IBM web pages following standards, good practices, accessibility, security, improving performance, responsive design, and content available all time.

What do I mean by the "content available all time"?

Well, it's Important to show content appropriately without breaking the layout in different breakpoints or resolutions.

If you look at this from the business side, you want to build web pages quickly, saving time _(money money money)_ while following high standards, and also making sure your content is available at all times, so it makes sense to create a CSS framework limiting the development options and minimizing the error range.

As web builders, we used this CSS framework without coding a single CSS line. Maybe at this point, you are thinking then how do you add styles to the IBM pages? Easy, this CSS framework uses a lot of functional CSS combined with prefabricated elements; these elements are styled following the BEM methodology, let me use more examples to clarify this approach.

If you inspect an IBM web page with your dev tools you will find something like this:

```html
<div class="ibm-card ibm-card--noborder">
    <div class="ibm-card__heading ibm-nospacing">
        <p class="ibm-padding-bottom-1">...</p>
    </div>
    
    <div class="ibm-card__image ibm-padding-bottom-1">
        <img class="ibm-resize ibm-flex" src="...">
    </div>
    
    <div class="ibm-card__content ibm-nospacing">
        <p>...</p>
    </div>
    
    <div class="ibm-card__bottom ibm-nospacing">
        <p class="ibm-padding-bottom-0">
            <span class="ibm-textcolor-systems-blue-5">...</span>
        </p>
    </div>
</div>
```

Do you recognize it? In that example, IBM uses the BEM methodology to create the element's structure with a couple of base styles and overwriting or complementing them with Functional CSS.

- ibm-nospacing
- ibm-padding-bottom-0
- ibm-padding-bottom-1
- ibm-textcolor-systems-blue-5


The functional CSS is not used only by IBM in their internal framework, you can find more examples in popular CSS frameworks:


**[Bootstrap](https://getbootstrap.com/docs/5.0/utilities/text/#text-alignment)**

```html
<span class="d-block p-2 bg-primary text-white">d-block</span>
<span class="d-block p-2 bg-dark text-white">d-block</span>

<p class="text-start">Start aligned text on all viewport sizes.</p>
<p class="text-center">Center aligned text on all viewport sizes.</p>
<p class="text-end">End aligned text on all viewport sizes.</p>
```

**[Bulma](https://bulma.io/documentation/helpers/visibility-helpers/#show)**

```HTML
<div class="is-flex">...</div>
<div class="is-block">...</div>
<div class="is-inline">...</div>
<div class="inline-block">...</div>

<p class="mb-4">Margin bottom</p>
<p class="px-1">Horizontal padding</p>

<p class="mr-0 pt-3">
  Removes the margin on the right and adds 0.75rem padding at the top
</p>
```

**[Tailwind](https://getbootstrap.com/docs/5.0/utilities/text/#text-alignment)**

```HTML
<div class="border-4 border-light-blue-500 border-opacity-100"></div>
<div class="border-4 border-light-blue-500 border-opacity-75"></div>
<div class="border-4 border-light-blue-500 border-opacity-50"></div>
<div class="border-4 border-light-blue-500 border-opacity-25"></div>
<div class="border-4 border-light-blue-500 border-opacity-0"></div>
```

After this short introduction, you can understand why I wanted to complement my first [article (in Spanish)](https://josejesus.dev/crea-tu-propio-css-grid-system) with this one. If you read these articles, you will have a piece of basic knowledge to understand how the most popular CSS frameworks work.


## How do I implement my Functional CSS classes?

If you are only using CSS, you don't have another option, write your classes manually, but if you are using SASS or another CSS preprocessor, this will be more fun.

Using SASS, we can use mixings to auto-generate all classes taking the information from a map, where the stored keys and values are, to be used in the future building of CSS classes.

### Variables and map

Imagine we have the next SASS variables:

```css
/**
* BLACK AND WHITE
*/
$color-black: #000000;
$color-white: #FFFFFF;


/**
* BLACK AND WHITE ALPHA COLORS
*/
$color-black-a80: rgba(0, 0, 0, .8);
$color-white-a50: rgba(157, 157, 157, .5);


/**
* GRAY COLORS
*/
$color-gray-1: #F5F5F5;
$color-gray-2: #EFEFEF;
$color-gray-3: #D3D3D3;
```

Let's create a map with these variables:

```css
$colors: (
  black: $color-black,
  white: $color-white,
  black-a80: $color-black-a80,
  white-a50: $color-white-a50,
  gray-1: $color-gray-1,
  gray-2: $color-gray-2,
  gray-3: $color-gray-3,
);
```

I'm going to use the "key" as my class name and the "value" in the map like the real value of the property I select in my SASS mixin.


### Classes generator

```css
@mixin generator($map, $property, $prefix: '-', $sufix: '') {
    @each $key, $value in $map {
        &#{$prefix}#{$key} {
            #{$property}:#{$value}#{$sufix};
        }
    }
}
```

Well, let me explain:

**$map:** This parameter is the data collection with the class name and their property value.

**$property:** This parameter could be explained by itself. I can use X params like color, background-color, font-size, display, etc.

**$prefix:** The parameter used to concatenate the map's key and the class where the mixin is called.

**$sufix:** This is an optional parameter that I can use to set the measure type, px, rem, em, vh, etc. Or you can store the type inside the map and use this parameter to concatenate something else _(!important could be a good example in some specific cases)_.

As you know now, I'm iterating over each map element, using the key to generate the class name and the value like the property value, and of course the property as my rule property.

Let's see how to call the mixing:

```css
.text-color {
    @include generator($colors, 'color', $prefix: '-');
}
```

Pay attention I'm calling our mixing instance inside of a class, so I'm going to concatenate key values with this class, for example:

```css
.text-color-black { color: #000000; }
.text-color-white {...}
.text-color-black-a80 {...}
.text-color-white-a50 {...}
.text-color-gray-1 {...}
.text-color-gray-2 {...}
...
```

Another interesting thing to keep in mind is, that I'm using SASS variables in this example, and these are pre-compiled, so that means we can't update them after being compiled; if you are working with a color theme _(dark and light theme)_ I recommend using native CSS variables.


### What classes do I usually reuse?

- **Text alignment:**

    ```css
    .text {
        &-center {
            text-align: center;
        }

        &-right {
            text-align: right;
        }

        &-left {
            text-align: left;
        }
    }   
    ```
    _NOTE: In this case, I'm not using either map or the mixing, if you want you can add these rules inside a map and iterate them._

    Example of generated classes:
    ```css
    .text-center { text-align: center; }
    ...
    ```

- **Content alignment and distribution**

    ```css
    .flex {
        display: flex;
    }
    ```

    Nested map:
    ```css
    $contentAlignments: (
        justify-content: (
            left: flex-start,
            center: center,
            right: flex-end
        ),
        align-items: (
            top: flex-start,
            middle: center,
            bottom: flex-end
        ),
    );

    $contentDistribution: (
        justify-content: (
            around: space-around,
            between: space-between,
            evenly: space-evenly
        )
    );
    ```

    Mixing variation:
    ```css
    @mixin nestedGenerator($breakpoint, $content) {
        @each $property, $values in $content {
            @each $key, $value in $values {
                .#{$breakpoint}-#{$key} {
                    #{$property}: #{$value};
                }
            }
        }
    }
    ```

    Calling mixing
    ```css
    @include nestedGenerator($breakpoint: 'xs', $content: $contentAlignments);
    @include nestedGenerator($breakpoint: 'xs', $content: $contentDistribution);

     @include sm {
        @include nestedGenerator($breakpoint: 'sm', $content: $contentAlignments);
        @include nestedGenerator($breakpoint: 'sm', $content: $contentDistribution);
     }

     @include md {
        @include nestedGenerator($breakpoint: 'md', $content: $contentAlignments);
         ...
     }

     @include lg {
        @include nestedGenerator($breakpoint: 'lg', $content: $contentAlignments);
         ...
     }
    ```

    _NOTE: I'm using another breakpoint mixing to apply the same classes in different breakpoints. If you are not interested in working with different resolutions you can remove the $breakpoint parameter._

    Example of generated classes:
    ```css
    .sm-left { justify-content: flex-start; }
    .md-center { justify-content: center; }
    .lg-right { justify-content: flex-end; }
    ...
    ```

- **Colors:**

    ```css
    $colors: (
        black: $black,
        white: $white,
        gray-light-1: $gray-light-1,
        gray-light-2: $gray-light-2,
        gray-light-3: $gray-light-3,
        gray-1: $gray-1,
        gray-2: $gray-2,
        gray-3: $gray-3,
        gray-dark-1: $gray-dark-1,
        gray-dark-2: $gray-dark-2,
        gray-dark-3: $gray-dark-3,
    );
    ```

    ```css
    .text-color {
        @include generator($colors, 'color', $prefix: '__');
    }

    .background-color {
        @include generator($colors, 'background-color', $prefix: '__');
    }

    .border-color {
        @include generator($colors, 'border-color', $prefix: '__');
    }
    ```

    ```css
    .text-color__black { color: #000000; }
    .background-color__black { background-color: #000000; }
    .border-color__black { border-color: #000000; }
    ```

    _NOTE: I have updated the prefix value just to help you understand what their purpose is._

- **Text:**

    ```css
    .text-bold {
        font-weight: bold;
    }

    .text-regular {
        font-weight: normal;
    }

    .text-light {
        font-weight: lighter;
    }

    .text-uppercase {
        text-transform: uppercase;
    }

    .h1 {
        font-size: $text-xl;
    }

    .h2 {
        font-size: $text-lg;
    }

    .h3 {
        font-size: $text-md;
    }

    .h4 {
        font-size: $text-sm;
    }
    ```

- **Spacing padding/margin**

    ```css
    $spacings: (
        0: 0,
        1: 0.625,
        2: 1.25,
        3: 1.875,
        4: 2.5,
        5: 3.125
    );

    $responsiveSpacings: (
        r1: 2,
        r2: 5,
        r3: 10
    );

    $spacingSides: top, right, bottom, left;
    $properties: padding, margin;
    ```

    ```css
    @each $property in $properties {
         .#{$property} {
             @include generator($spacings, #{$property}, $sufix: 'rem');
             @include generator($responsiveSpacings, #{$property}, $sufix: 'vw');

             @each $side in $spacingSides {
                 &-#{$side} {
                     @include generator($spacings, #{$property}-#{$side}, $sufix: 'rem');
                     @include generator($responsiveSpacings, #{$property}-#{$side}, $sufix: 'vw');
                 }
             }
         }
    }
    ```

    _NOTE: Take a look at how I'm not setting a measure type in my `$spacings` and `$responsiveSpacings` map. I'm sending the measure type as a parameter in the mixing ("rem" and "vh")._

    Example of generated classes:
    ```css
    .padding-top-1 { padding-top: 0.625rem; }
    .margin-right-1 { margin-right: 0.625rem; }
    .padding-bottom-r1 { padding-bottom: 2vh; }
    .margin-1 { margin: 0.625rem; }
    ```

## Conclusion

The frontend development is changing quickly, and If you are using web components, then you might be encapsulating the CSS styles in them.

My suggestion is the next:

- You can create a reusable web component encapsulating the basic CSS styles inside it and have small variations applying Functional CSS classes.

- If you are not working with a grid system, it could be useful to generate a couple of Functional Classes like alignment, distribution, and padding/margin, to help you with your web component's position in particular places.

- You can easily create a layout if you have a suite of Functional CSS classes. It could help you deliver an MVP faster.

- You can combine other CSS methodologies with Functional CSS.
