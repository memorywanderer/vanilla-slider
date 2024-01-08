class Slider {
  constructor(config) {
    this._initialize(config)
  }

  _initialize(config) {
    this._setInitialValues(config)
    this._setEventListeners()
  }

  _setInitialValues(config) {
    this.sliderContainerEl = document.querySelector(config.containerClass)
    if (!this.sliderContainerEl) {
      throw new Error(`The ${config.containerClass} is not found in the DOM`)
    }

    this.slideEl = document.querySelector(config.slideClass)
    if (!this.slideEl) {
      throw new Error(`The ${config.slideClass} is not found in the DOM`)
    }

    this.sliderContainerEl.style.transform = "translate3D(0,0,0)";

    this.startPoint = 0
    this.endPoint = 0
    this.distance = 0
    this.dragDirection = -1
    this.initialTransformX = 0
    this.slides = this.sliderContainerEl.children.length
    this.slideSpacing = config.slideSpacing ? config.slideSpacing : 16
    this.slidesPerView = config.slidesPerView ? config.slidesPerView : 1
    this.slideWidth = config.slideWidth ? config.slideWidth : Math.floor(this.slideEl.getBoundingClientRect().width)

    this.handleMouseDown = (event) => this._handleMouseDown(event)
    this.handleMouseUp = (event) => this._handleMouseUp(event)
    this.handleMouseMove = (event) => this._handleMouseMove(event)
    this.handleMouseLeave = (event) => this._handleMouseLeave(event)
    this.handleWindowResize = () => this._handleWindowResize()
  }

  _setEventListeners() {
    window.addEventListener('resize', this.handleWindowResize)
    document.addEventListener('mouseleave', this.handleMouseLeave)
    this.sliderContainerEl.addEventListener("mousedown", this.handleMouseDown)
    this.sliderContainerEl.ondragstart = function () {
      return false
    }
  }

  _handleMouseLeave() {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  /**
    * Make slider responsive
    * Adjust the slide width every time the browser window is resized
  */
  _handleWindowResize() {

    this.slideWidth = this._getSlideWidth()
    this._resetSlider()
  }

  /**
    * Listen for when the user clicks and set a 'startPoint' value
  */
  _handleMouseDown(event) {

    this.startPoint = event.clientX

    document.addEventListener("mouseup", this.handleMouseUp)
    document.addEventListener("mousemove", this.handleMouseMove)
  }

  /**
    * Listen for when the user moves the mouse and track an 'endPoint' value
    * The distance value is the difference between the 'endPoint' and the 'startPoint' values
  */
  _handleMouseMove(event) {

    this.endPoint = event.clientX
    this.distance = this.endPoint - this.startPoint
    this.dragDirection = this._getDragDirection()

    // We simulate slider movement adding di
    const newTransform = this._getNewTransform(event.type)
    this._setNewTransform(newTransform)
  }

  _handleMouseUp(event) {
    this.endPoint = event.clientX
    this.distance = this.endPoint - this.startPoint
    this.dragDirection = this._getDragDirection()

    this._changeSlide(event)

    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  _changeSlide(event) {
    if (this._canSlide() &&
      (this._canSlideLeft() || this._canSlideRight())) {
      const newTransform = this._getNewTransform(event.type)
      this._setNewTransform(newTransform)
      this.initialTransformX = newTransform
    } else {
      this.sliderContainerEl.style.transform = `translate3D(${this.initialTransformX + "px"}, 0, 0)`
    }
  }

  /**
   * If the distance is more than half of the slide width, we move to the next slide
   */
  _canSlide() {
    return (this.distance * this.dragDirection > this.slideWidth / 2)
  }

  /**
   * We can only move from left to right if the current slide is not the first
   * If we are on the first slide the initialTransform will be 0
   * If we are on the second slide, the initialTransform will be set to the width of the slide
   */
  _canSlideLeft() {
    return this.dragDirection === 1 && this.initialTransformX * -1 > 0
  }

  /**
   * We can only move from right to left if the current slide is not the last
   * If we are on the last slide, the initialTransform will be set 
   * to the width of the all previous slides, meaning that we can't move any further
   */
  _canSlideRight() {
    return (
      this.dragDirection === -1 &&
      this.initialTransformX * -1 < this.slideWidth * (this.slides - this.slidesPerView)
    );
  }

  _setNewTransform(newTransform) {
    this.sliderContainerEl.style.transform = `translate3D(${newTransform + "px"}, 0, 0)`
  }

  /**
    * If the eventType is 'mousemove', 
    * we simulate slider movement by 
    * adding the distance between the 'endPoint' and 
    * the 'startPoint' to the initialTransform and return the newTransform 
    * 
    * If the eventType is 'mouseup',
    * we add the width of the slide to the 'initialTranform'
    * and return the newTransform 
  */
  _getNewTransform(eventType) {
    if (eventType === 'mousemove') {
      return this.dragDirection * (this.dragDirection * this.initialTransformX + this.dragDirection * this.distance)
    } else {
      return this.dragDirection * (this.initialTransformX * this.dragDirection + this.slideWidth + this.slideSpacing)
    }
  }

  _getSlideWidth() {
    return this.slideEl.getBoundingClientRect().width
  }

  /**
   * If the difference between the 'endPoint' and 'startPoint' values is greater than 0, 
   * it means the user clicked on the right part of the browser window and 
   * released the mouse on the left part. Otherwise, 
   * the difference will be a negative value
  */
  _getDragDirection() {
    return this.distance > 0 ? 1 : -1
  }

  _resetSlider() {
    this.sliderContainerEl.style.transform = "translate3D(0,0,0)";
    this.initialTransformX = 0
  }
}

export {
  Slider
}
