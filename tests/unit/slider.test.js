const { describe, beforeEach } = require('@jest/globals');
const { Slider } = require('../../slider.js');

describe('Slider', () => {
  let slider

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="slider">
    <div class="slider__viewport">
      <div class="slider__container">
        <div class="slider__slide red">
          <span class="text">
            1
          </span>
        </div>
        <div class="slider__slide blue">
          <span class="text">
            2
          </span>
        </div>
        <div class="slider__slide green">
          <span class="text">
            3
          </span>
        </div>
        <div class="slider__slide yellow">
          <span class="text">
            4
          </span>
        </div>
        <div class="slider__slide green">
          <span class="text">
            5
          </span>
        </div>
        <div class="slider__slide blue">
          <span class="text">
            6
          </span>
        </div>
        <div class="slider__slide blue">
          <span class="text">
            7
          </span>
        </div>
      </div>
    </div>
  </div>
  `
    const config = {
      containerClass: '.slider__container',
      slideClass: '.slider__slide',
      slidesPerView: 1,
      slideSpacing: 16,
      slideWidth: 450
    };

    slider = new Slider(config);
  })

  it('should set initial values correctly', () => {
    console.log(slider.initialTransformX)
    expect(slider.sliderContainerEl).toBeDefined()
    expect(slider.sliderContainerEl.style).toBeDefined()
    expect(slider.slideEl).toBeDefined()
    expect(slider.startPoint).toBe(0)
    expect(slider.endPoint).toBe(0)
    expect(slider.distance).toBe(0)
    expect(slider.dragDirection).toBe(-1)
    expect(slider.initialTransformX).toBe(0)
    expect(slider.slideWidth).toBeDefined()
    expect(slider.slideSpacing).toBe(16)
    expect(slider.slidesPerView).toBeDefined()
  })

  it('should slide', () => {
    /*
      Mouse click simulation
      The user clicks at 400 on the x-axis and releases the mouse at 150
    */
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 400 })
    slider.handleMouseDown(mouseDownEvent)

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150 })
    slider.handleMouseMove(mouseMoveEvent)

    const mouseUpEvent = new MouseEvent('mouseup', { clientX: 150 })
    slider.handleMouseUp(mouseUpEvent)

    expect(slider._canSlide()).toBe(true);
  });

  it('shouldn\'t slide', () => {
    const mouseDownEvent = new MouseEvent('mousedown', { clientX: 200 })
    slider.handleMouseDown(mouseDownEvent)

    const mouseMoveEvent = new MouseEvent('mousemove', { clientX: 150 })
    slider.handleMouseMove(mouseMoveEvent)

    const mouseUpEvent = new MouseEvent('mouseup', { clientX: 150 })
    slider.handleMouseUp(mouseUpEvent)

    expect(slider._canSlide()).toBe(false);
  })


  it('should slide to the left', () => {
    slider.dragDirection = 1
    slider.initialTransformX = -(slider.slideWidth) // The user sees second slide

    expect(slider._canSlideToTheLeft()).toBe(true)
  })

  it('shouldn\'t slide to the left', () => {
    slider.dragDirection = 1
    slider.initialTransformX = 0

    expect(slider._canSlideToTheLeft()).toBe(false)
  })

  it('should slide to the right', () => {
    slider.dragDirection = -1
    slider.initialTransformX = -(slider.slideWidth)

    expect(slider._canSlideToTheRight()).toBe(true)
  })

  it('should\'t slide to the right', () => {
    const containerWidth = 1800; // Set a specific container width for the test
    const slideWidth = containerWidth * (1 / slider.slides) // Set a slide width for the test
    slider.dragDireaction = -1 // Slider is dragging to the right
    /* Set the transform to a specific value like if the user is on the last slide of the slider */
    slider.initialTransformX = -(slideWidth * slider.slides)


    slider.sliderContainerEl.style.width = `${containerWidth}px`
    slider.slideWidth = slideWidth

    expect(slider._canSlideToTheRight()).toBe(false)
  })
})