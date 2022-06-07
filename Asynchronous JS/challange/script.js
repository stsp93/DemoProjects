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
// createImage('img/img-1.jpg').then(img => {
//     curImg = img;
//     console.log('img loaded');
//     return wait(2);
// }).then(() => {
//     curImg.style.display = 'none'
//     return(createImage('img/img-2.jpg'))
// }).then(img => {
//     curImg = img;
//     console.log('img loaded');
//     return wait(2);
// }).then(() => {
//     curImg.style.display = 'none'
//     return(createImage('img/img-3.jpg'))
// })
//     .catch(err => console.error(`Error: ${err}`));


// Using async await

// const loadNPause = async function() {
//     try{
//         let loadImg = await createImage('img/img-1.jpg');
//         console.log('Image 1 loaded');
//         const pause = await wait(2);
//         loadImg.style.display = 'none'
//         loadImg = await createImage('img/img-2.jpg');

//         console.log('Image 2 loaded');;
//         const pause2 = await wait(2);
//         loadImg.style.display = 'none'
//         loadImg = await createImage('img/img-3.jpg');
//         console.log('Image 3 loaded');;
//     } catch(err) {
//         console.error(`${err}`);
//     }
// }

// loadNPause();

const loadAll = async function(imgArr) {
    const imgs = imgArr.map(async img => await createImage(img))
    Promise.all(imgs).then(res => {
        res.forEach(img => img.classList.add('parallel'))
    }).catch(err => console.log(err))
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);