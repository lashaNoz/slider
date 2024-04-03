import elements from './persons.js'

const { slider, slides, progress } = elements
let interval
let timeOut
let progressint

progress.children[1].textContent = `- ${slider.children.length}`

const intervalFn = () => {
  interval = setInterval(() => {
    rightMove(false)
  }, 5000)
}

intervalFn()

const timeOutFn = (bool) => {
  if (bool) {
    clearInterval(interval)
    clearTimeout(timeOut)
    clearInterval(progressint)
    progressFn(10)
    timeOut = setTimeout(() => {
      intervalFn()
    }, 5000)
  }

  progress.firstElementChild.textContent = slider.children[2].dataset.index
}

const progressFn = (indexPlus) => {
  let i = 10

  progressint = setInterval(() => {
    progress.lastElementChild.style.width = `${(i += indexPlus)}%`

    if (i === 110) {
      i = 0
      clearInterval(progressint)
      progress.lastElementChild.style.width = i
    }
  }, 1000)
}

const rightMove = (boolVal = true) => {
  const firstSlide = slider.removeChild(slider.firstElementChild)
  slider.append(firstSlide)
  slider.children[4].classList.add('fade-in')
  slider.style.justifyContent = 'flex-end'
  timeOutFn(boolVal)
}

const leftMove = (boolVal = true) => {
  const lastSlide = slider.removeChild(slider.lastElementChild)
  slider.insertBefore(lastSlide, slider.firstChild)
  lastSlide.classList.add('fade-in')
  slider.style.justifyContent = 'flex-start'
  timeOutFn(boolVal)
}

slides.forEach((slide) => {
  slide.addEventListener('click', () => {
    const slideIndex = [...slider.children].indexOf(slide)
    console.log(slideIndex)

    switch (slideIndex) {
      case 0:
        leftMove()
        setTimeout(() => {
          leftMove()
        }, 500)
        break
      case 1:
        leftMove()
        break
      case 3:
        rightMove()
        break
      case 4:
        rightMove()
        setTimeout(() => {
          rightMove()
        }, 500)
        break
      default:
        break
    }
  })
})

const leftControl = document.querySelector('.left-control')
leftControl.addEventListener('click', leftMove)

const rightControl = document.querySelector('.right-control')
rightControl.addEventListener('click', rightMove)
