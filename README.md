# Slider Class Documentation

The `Slider` class is a simple JavaScript class designed to create a basic slider component with mouse drag interaction.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Methods](#methods)
- [Events](#events)
- [Example](#example)

## Installation

To use the `Slider` class in your project, include the JavaScript file in your HTML:

```html
<script src="path/to/slider.js"></script>
```

## Usage

Create a new instance of the Slider class by providing a configuration object:

```js
const config = {
  containerClass: '.slider__container',
  slideClass: '.slider__slide',
  slidesPerView: 3,
  slideSpacing: 16,
};

const mySlider = new Slider(config);
```

## Configuration

The Slider class accepts a configuration object with the following properties:

- containerClass (string, required): The CSS class of the slider container element.
- slideClass (string, required): The CSS class of individual slide elements.
- slideSpacing (number, optional): Spacing between slides. Default is 16 pixels.
- slidesPerView (number, optional): Number of slides visible in the view. Default is 1.
- slideWidth (number, optional): Width of each slide. Default is the calculated width of the first slide.

## Methods

### _initialize(config)

Initialize the slider with the provided configuration.

### _setEventListeners()

Set up event listeners for slider interactions.

### _handleWindowResize()

Adjust the slider when the window is resized.

### _handleMouseDown(event)

Handle the mouse down event to initiate the drag.

### _handleMouseMove(event)

Handle the mouse move event to track the drag distance.

### _handleMouseUp(event)

Handle the mouse up event to complete the drag.

### _changeSlide(event)

Change the current slide based on the drag direction.

### _canSlideLeft()

Check if the slider can move to the left.

### _canSlideRight()

Check if the slider can move to the right.

### _setNewTransform(newTransform)

Set the new transform property for the slider container.

### _getNewTransform(eventType) 

Calculate the new transform property based on event type.

### _getSlideWidth()

Get the width of the slide.

### _getDragDirection()

Determine the drag direction based on the mouse movement.

### _resetSlider()

Reset the slider to its initial state.

## Events

- resize - triggered when the window is resized

## Example

```html
<div class="slider">
    <div class="slider__viewport">
      <div class="slider__container">
        <div class="slider__slide">
          <span class="text">
            1
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            2
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            3
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            4
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            5
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            6
          </span>
        </div>
        <div class="slider__slide">
          <span class="text">
            7
          </span>
        </div>
      </div>
    </div>
  </div>
```

```css
:root {
  --slide-spacing: 1rem;
  --slide-size: 33%;
  --slide-height: 19rem;
}

.slider {
  padding: 1.6rem;
}

.slider__viewport {
  overflow: hidden;
}

.slider__container {
  transition: transform 300ms;
  margin-left: calc(var(--slide-spacing) * -1);
  display: flex;
  backface-visibility: hidden;
}

.slider__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(46, 80, 218);
  flex: 0 0 var(--slide-size);
  min-width: 0;
  margin-left: var(--slide-spacing);
  position: relative;
  height: var(--slide-height);
}

.text {
  font-size: 5rem;
  color: white;
}
```
