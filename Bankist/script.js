'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabsContent = document.querySelectorAll('.operations__content');
const opTabs = document.querySelectorAll('.operations__tab');
const tabsBtnContainer = document.querySelector('.operations__tab-container');

const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const navlinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const scrollTo = document.querySelector('.btn--scroll-to');

const lazyImgs = document.querySelectorAll('img[data-src]');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookies Element Create

const html = `<div class="cookie-message">
We use cookies to sell your private info for 💲💲💲 <button class="btn btn--close-cookie">Got it!</button>
              </div>`;
header.insertAdjacentHTML('beforeend', html)
const message = document.querySelector('.cookie-message')
const btnClose = document.querySelector('.btn--close-cookie');
btnClose.addEventListener('click', function () {
  message.remove();
})

//Scrolling
//Learn more btn

scrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords.top);
  // console.log(document.documentElement.clientWidth);
  window.scrollTo({ left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset, behavior: 'smooth' })
})

//Navlinks Scrolling


navlinks.addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const coords = document.querySelector(e.target.getAttribute('href')).getBoundingClientRect();
    window.scrollTo({ top: coords.top + window.pageYOffset, behavior: "smooth" })
  };
})

// Operations Tabs

tabsBtnContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if (!clicked) return;
  //BTNS
  // Tabs remove non-active
  opTabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Active tab
  clicked.classList.add('operations__tab--active');

  //TEXT CONTENT
  //Remove non-active content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  //Active content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

const nav = document.querySelector('.nav');

function hoverHandle(e) {
  if (!e.target.classList.contains('nav__link')) return;
  const link = e.target;
  const siblings = [...nav.querySelectorAll('.nav__link'), nav.querySelector('img')];
  siblings.forEach(el => {
    if (el !== link) {
      el.style.opacity = this;
    }
  })

}
// Using bind(this) for cheat argument hoverHandle(e).bind(opacity)
nav.addEventListener('mouseover', hoverHandle.bind(0.5));
nav.addEventListener('mouseout', hoverHandle.bind(1));


// Sticky navbar
const navHeight = nav.getBoundingClientRect().height;

function navSticky(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');

}

const observer = new IntersectionObserver(navSticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

observer.observe(header);

// Sections Fade Animation 
function sectionFade(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(sectionFade, {
  root: null,
  threshold: 0.2,
})


sections.forEach(section => {
  section.classList.add('section--hidden')
  sectionObserver.observe(section);

});


// Lazy img loading 

const loadLazy = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  //replace img src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const lazyObserver = new IntersectionObserver(loadLazy, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

lazyImgs.forEach(img => lazyObserver.observe(img));

// Slider
function slider() {
  let currSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const lastSlide = slides.length - 1;

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dots = document.querySelector('.dots');
  // Functions


  // Slide animation
  const goToSlide = function (slide) {
    if (currSlide === 3) currSlide = 0;
    if (currSlide === -1) currSlide = 2;
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
  };

  // Dots creation
  const createDots = slides => slides.forEach((slide, i) =>
    dots.insertAdjacentHTML('beforeend',
      `<div class="dots__dot" data-slide ="${i}"></div>`)
  );
  // Previous Slide
  function prevSlide() {
    if (currSlide === 0) {
      currSlide = lastSlide;
    } else {
      currSlide--;
    }
    goToSlide(currSlide);
    init(currSlide);

  }
  //Next Slide
  function nextSlide() {
    if (currSlide === lastSlide) {
      currSlide = 0;
    } else {
      currSlide++;
    }
    goToSlide(currSlide);
    init(currSlide);
  }
  // Initialization of the slider
  createDots(slides);
  function init(slide) {
    goToSlide(slide);
    activatDot(slide);
  }

  function activatDot(slide) {
    dots.childNodes.forEach(dot => dot.classList.remove('dots__dot--active'));
    if (currSlide === 3) currSlide = 0;
    if (currSlide === -1) currSlide = 2;
    const active = dots.querySelector(`.dots__dot[data-slide="${slide}"]`);
    active.classList.add('dots__dot--active');
  }

  // Excecution logic
  init(0);
  btnLeft.addEventListener('click', prevSlide);
  btnRight.addEventListener('click', nextSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    };
  });

  dots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {

      const { slide } = e.target.dataset;
      currSlide = slide;
      goToSlide(slide);
      init(slide);
    }
  })
}
slider();
////////////////// MY CODE////////////////////

////////CREATING ELEMENT USING createElement

// const header = document.querySelector('.header')
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies to use your info <button class="btn btn--close-cookie">Got it!</button>';
// header.append(message);
// const btnClose = document.querySelector('.btn--close-cookie');
// btnClose.addEventListener('click', function(){
//   message.remove();
// })

// //////////// creating element by using insertAdjacentHTML

// const header = document.querySelector('.header')
// const html = `<div class="cookie-message">
// We use cookies to sell your private info for 💲💲💲 <button class="btn btn--close-cookie">Got it!</button>
//               </div>`;
// header.insertAdjacentHTML('beforeend', html)
// const message = document.querySelector('.cookie-message')
// const btnClose = document.querySelector('.btn--close-cookie');
// btnClose.addEventListener('click', function () {
//   message.remove();
// })

// //////////// Smooth Scrolling


// Modern Way
// const scrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');
// scrollTo.addEventListener('click', function (e) {
//   section1.scrollIntoView({behavior:'smooth'})
// })

// Oldschool Way
// scrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords.top);
//   // console.log(document.documentElement.clientWidth);
//   window.scrollTo({ left: s1coords.left + window.pageXOffset, top: s1coords.top + window.pageYOffset, behavior:'smooth'})
// })
// Event listeners

// const nav = document.querySelector('.nav');

// nav.addEventListener('mouseenter',() => {
//   nav.style.backgroundColor = 'rgb(0,0,0,0.1)'
// })
// nav.addEventListener('mouseleave',() => {
//   nav.style.backgroundColor = 'rgb(0, 0, 0,0)'
// })

// ////////EVENT DELEGATION
// const navlinks = document.querySelector('.nav__links');

// navlinks.addEventListener('click', function (e) {
//   e.preventDefault();
//   // Matching strategy
//   if (e.target.classList.contains('nav__link')) {
//     const coords = document.querySelector(e.target.getAttribute('href')).getBoundingClientRect();
//     window.scrollTo({ top: coords.top + window.pageYOffset, behavior: "smooth" })
//   };
// })

// //////////BUILDING TABBED COMPONENT

// const tabsBtnContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');
// const opTabs = document.querySelectorAll('.operations__tab')
// tabsBtnContainer.addEventListener('click', function(e){
//   const clicked = e.target.closest('.operations__tab');
//   console.log(clicked);
//   //Guard clause
//   if(!clicked) return;
//   //BTNS
//   // Tabs remove non-active
//   opTabs.forEach(t => t.classList.remove('operations__tab--active'));
//   // Active tab
//   clicked.classList.add('operations__tab--active');

//   //TEXT CONTENT
//   //Remove non-active content
//   tabsContent.forEach(t => t.classList.remove('operations__content--active'));
//   //Active content
//   document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
// })

//////// Nav Fade

// const nav = document.querySelector('.nav');

// function hoverHandle(e) {
//   if (!e.target.classList.contains('nav__link')) return;
//   const link = e.target;
//   const siblings = [...nav.querySelectorAll('.nav__link'), nav.querySelector('img')];
//   siblings.forEach(el => {
//     if (el !== link) {
//       el.style.opacity = this;
//     }
//   })

// }
// // Using bind(this) for cheat argument hoverHandle(e).bind(opacity)
// nav.addEventListener('mouseover', hoverHandle.bind(0.5))
// nav.addEventListener('mouseout', hoverHandle.bind(1))

// ///////////Sticky nav with scroll event !!!NOT EFFICENT!!!

// const initS1Coords = section1.getBoundingClientRect().top;

// window.addEventListener('scroll', function () {
//   if(window.scrollY > initS1Coords) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// })

// /////Using IntersectionObserver API
//Sticky nav adding

// const navHeight = nav.getBoundingClientRect().height;

// function navSticky(entries){
//   const [entry] = entries;
//   if(!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');

// }

// const observer = new IntersectionObserver(navSticky, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`
// })

// observer.observe(header)

// //////////Sections Fade in animation with intersection Observer

// function sectionFade(entries, observer) {
//   const [entry] = entries;
//   if(!entry.isIntersecting) return;
//   console.log(entry);
//   entry.target.classList.remove('section--hidden');
//   observer.unobserve(entry.target);
// }
// const sectionObserver = new IntersectionObserver(sectionFade, {
//   root: null,
//   threshold: 0.2,
// })


// sections.forEach(section => {
//   section.classList.add('section--hidden')
//   sectionObserver.observe(section);

// })

// ///////Lazy img loading



// const loadLazy = function(entries, observer){
//   const [entry] = entries;
//   if(!entry.isIntersecting) return;
//   //replace img src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener('load', function(){
//     entry.target.classList.remove('lazy-img');
//   })
//   console.log(entry);
//   observer.unobserve(entry.target);
// }

// const lazyObserver = new IntersectionObserver(loadLazy, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px'
// })

// lazyImgs.forEach(img => lazyObserver.observe(img));

// Slider

// const slides = document.querySelectorAll('.slide');
// const lastSlide = slides.length - 1;

// let currSlide = 0;
// const btnLeft = document.querySelector('.slider__btn--left');
// const btnRight = document.querySelector('.slider__btn--right');
// const dots = document.querySelector('.dots');
// // Functions


// // Slide animation
// const goToSlide = function (slide) {
//   if(currSlide === 3) currSlide = 0;
//   if(currSlide === -1) currSlide = 2;
//   slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`)
// };

// // Dots creation
// const createDots = slides => slides.forEach((slide, i) =>
//   dots.insertAdjacentHTML('beforeend',
//     `<div class="dots__dot" data-slide ="${i}"></div>`)
// );
// // Previous Slide
// function prevSlide() {
//   if (currSlide === 0) {
//     currSlide = lastSlide;
//   } else {
//     currSlide--;
//   }
//   goToSlide(currSlide);
//   init(currSlide);

// }
// //Next Slide
// function nextSlide() {
//   if (currSlide === lastSlide) {
//     currSlide = 0;
//   } else {
//     currSlide++;
//   }
//   goToSlide(currSlide);
//   init(currSlide);
// }
// // Initialization of the slider
// createDots(slides);
// function init(slide) {
//   goToSlide(slide);
//   activatDot(slide);
// }

// function activatDot(slide) {
//   dots.childNodes.forEach(dot => dot.classList.remove('dots__dot--active'));
//   if(currSlide === 3) currSlide = 0;
//   if(currSlide === -1) currSlide = 2;
//   const active = dots.querySelector(`.dots__dot[data-slide="${slide}"]`);
//   active.classList.add('dots__dot--active');
// }

// // Excecution logic
// init(0);
// btnLeft.addEventListener('click', prevSlide);
// btnRight.addEventListener('click', nextSlide);
// document.addEventListener('keydown', function (e) {
//   if (e.key === 'ArrowLeft') {
//     prevSlide()
//   } else if (e.key === 'ArrowRight') {
//     nextSlide()
//   };
// });

// dots.addEventListener('click', function (e) {
//   if (e.target.classList.contains('dots__dot')) {

//     const { slide } = e.target.dataset;
//     currSlide = slide;
//     goToSlide(slide);
//     init(slide);
//   }
// })
