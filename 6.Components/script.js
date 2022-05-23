let slideIndex = 0;

const slides = document.querySelectorAll('.slide')
const btns = document.querySelectorAll('.btn');
const dots = document.querySelectorAll('.dot')
const img = document.querySelectorAll('.img')

console.log(slides[0]);

// BUTTONS LOGIC
for (let i = 0; i < 2; i++) {
    // CHANGE HOW YOU GET THE LEFT AND RIGHT BUTTON
    // GET THEM IN SEPARATED QUARYs

    btns[i].addEventListener('click', function () {
        if (i === 0) {
            slideIndex -= 1;
        } else {
            slideIndex += 1;
        }
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        else if (slideIndex > slides.length - 1) {
            slideIndex = 0;
        }

        for (let j = 0; j < slides.length; j++) {
            slides[j].classList.add('inactive');
            dots[j].classList.add('inactive');
            img[j].classList.add('hidden')
        }
        slides[slideIndex].classList.toggle('inactive')
        dots[slideIndex].classList.toggle('inactive');
        img[slideIndex].classList.toggle('hidden');
    })
}
// DOTS LOGIC
for (let i = 0; i < dots.length; i++){
    dots[i].addEventListener('click', function(){
        for (let j = 0; j < slides.length; j++) {
            slides[j].classList.add('inactive');
            dots[j].classList.add('inactive');
        }
        slideIndex = i;
        slides[i].classList.toggle('inactive')
        this.classList.toggle('inactive');
    })
} 



