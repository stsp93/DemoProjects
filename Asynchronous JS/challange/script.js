'use strict'
const imagesEl = document.querySelector('.images')

function createImage(imgPath) {
    return new Promise((resolve, reject) => {
        const imgEl = document.createElement('img');
        imgEl.src = imgPath;
        imgEl.addEventListener('load', function(){
            imagesEl.append(imgEl);
            resolve(imgEl)
        });
        imgEl.addEventListener('error', function() {
            reject(new Error('Image not Found'));
        })
    })
}

createImage('img/img-3.jpg').then(img => console.log(img)).catch(err => console.error(`Error: ${err}`));