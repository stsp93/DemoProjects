'use strict'
const imagesEl = document.querySelector('.images')

function createImage(imgPath) {
    return new Promise((resolve, reject) => {
        const imgEl = document.createElement('img');
        imgEl.src = imgPath;
        imgEl.addEventListener('load', function () {
            imagesEl.append(imgEl);
            resolve(imgEl)
        });
        imgEl.addEventListener('error', function () {
            reject(new Error('Image not Found'));
        })
    })
}
function wait(seconds) {
    return new Promise(resolve => {
        setTimeout(resolve, 1000 * seconds);
    })
}

let curImg;
createImage('img/img-1.jpg').then(img => {
    curImg = img;
    console.log('img loaded');
    return wait(2);
}).then(() => {
    curImg.style.display = 'none'
    return(createImage('img/img-2.jpg'))
}).then(img => {
    curImg = img;
    console.log('img loaded');
    return wait(2);
}).then(() => {
    curImg.style.display = 'none'
    return(createImage('img/img-3.jpg'))
})
    .catch(err => console.error(`Error: ${err}`));