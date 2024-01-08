import { Slider } from "./slider.js";

document.addEventListener('DOMContentLoaded', function () {
  // Your slider initialization code here
  const config = {
    containerClass: ".slider__container",
    slideClass: ".slider__slide",
    slidesPerView: 3,
    slideSpacing: 16,
  };

  const slider = new Slider(config);
  console.log(slider)
});



// const sliderContainer = document.querySelector('.slider__container');
// const slideEl = document.querySelector('.slider__slide');
// sliderContainer.style.transform = "translate3D(0,0,0)";

// sliderContainer.addEventListener("mousedown", handleMouseDown)

// // get the value of transofrmX of slider__container
// const current = window.getComputedStyle(sliderContainer).getPropertyValue("transform");
// const matrix = new DOMMatrixReadOnly(current)
// const transformX = matrix.m41
// // get slide width
// const slideWidth = Math.floor(slideEl.getBoundingClientRect().width)

// let startPoint = 0
// let endPoint = 0
// let distance = 0
// let dragDirection = -1 // which side user drags, default: to the left
// let initialTransformX = transformX
// let slidesPerView = 1
// let slideSpacing = 16

// // turn off default browser drag method
// sliderContainer.ondragstart = function () {
//   return false
// }

// function handleMouseDown(event) {
//   console.log("preserved tranform: ", initialTransformX)
//   startPoint = event.clientX
//   document.addEventListener("mouseup", handleMouseUp)
//   document.addEventListener("mousemove", handleMouseMove)
// }

// function handleMouseMove(event) {
//   endPoint = event.clientX
//   distance = endPoint - startPoint
//   console.log("preserved transform: ", initialTransformX)
//   dragDirection = distance > 0 ? 1 : -1
//   console.log("side: ", dragDirection)
//   const newTransform = dragDirection * (dragDirection * initialTransformX + dragDirection * distance)
//   sliderContainer.style.transform = `translate3D(${newTransform + "px"}, 0, 0)`
// }

// // if distance is more than slide width then we add transform translate3D(current+slideWidth)

// function handleMouseUp(event) {
//   const slides = sliderContainer.children.length

//   // position when we release the mouse
//   endPoint = event.clientX
//   // distance between start and end points
//   distance = endPoint - startPoint;

//   console.log("start point > ", startPoint)
//   console.log("end point > ", endPoint)
//   console.log("slide width > ", slideWidth)

//   // which side user drags
//   dragDirection = distance > 0 ? 1 : -1

//   console.log(slideWidth)
//   console.log("distance > ", distance)
//   console.log("side > ", dragDirection)

//   if (distance * dragDirection > slideWidth / 2
//     && ((dragDirection === 1 && initialTransformX * -1 > 0)
//       || (dragDirection === -1 && initialTransformX * -1 < slideWidth * (slides - slidesPerView)))) {
//     // add slide width to the current value of tranformX
//     const newTransform = dragDirection * (initialTransformX * dragDirection + slideWidth + slideSpacing)
//     sliderContainer.style.transform = `translate3D(${newTransform + "px"}, 0, 0)`
//     initialTransformX = newTransform
//   } else {
//     sliderContainer.style.transform = `translate3D(${initialTransformX + "px"}, 0, 0)`
//   }

//   document.removeEventListener('mousemove', handleMouseMove)
//   document.removeEventListener('mouseup', handleMouseUp)
// }
