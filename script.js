import gallery from './gallery-items.js';
const jsGallery = document.querySelector('.js-gallery');
const jsLightbox = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const buttonClose = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

// === СОЗДАЁМ ГАЛЕРЕЮ ===
let countImg = 0;
const newGallery = gallery.map(({description, preview, original})=>{
  return `<li class="gallery__item"><a class="gallery__link" href=${original}><img class="gallery__image"
   src=${preview} data-source=${original} data-count=${countImg++} alt=${description}/></a></li>`;
}).join('');
jsGallery.innerHTML = newGallery;

// === СЛУШАТЕЛЬ ОТКРЫТИЯ МОДОЛКИ ===
jsGallery.addEventListener("click", openModal);

// === РАСПИСЫВАЕМ ФУНКЦИИ И ДОБАВЛЯЕМ & СНИМАЕМ СЛУШАТЕЛИ===
function openModal(event) {
    event.preventDefault();
    if (event.target.nodeName !== "IMG") {
return;
}
else {
    jsLightbox.classList.add('is-open');
    lightboxImage.src = event.target.dataset.source;
    window.addEventListener('keydown', pressESC);
    document.addEventListener('keydown', sliDer);
    buttonClose.addEventListener("click", closeModal);
    lightboxOverlay.addEventListener("click", closeModal);
}
};
function closeModal(event) {
    event.preventDefault();
    jsLightbox.classList.remove('is-open');
    lightboxImage.src = ""
    window.removeEventListener('keydown', pressESC);
    document.removeEventListener('keydown', sliDer);
    buttonClose.removeEventListener("click", closeModal);
    lightboxOverlay.removeEventListener("click", closeModal);
};
function pressESC(event) {
    if (event.code === 'Escape') {
        closeModal(event);
    }
};
// === ДЕЛАЕМ СЛАЙДЕР ===
function sliDer(event) {
    const indexImg = gallery.map(elem => elem.original).indexOf(lightboxImage.src)
    if (event.key === 'ArrowRight') {
        if (indexImg < gallery.length - 1) {
            return lightboxImage.src = gallery[indexImg + 1].original;
        }
        else {
            return lightboxImage.src = gallery[0].original;
        }
    }
    if (event.key === 'ArrowLeft') {
        if (indexImg > 0) {
        return lightboxImage.src = gallery[indexImg - 1].original;
        }
        else {
            return lightboxImage.src = gallery[gallery.length - 1].original;
        }
    }
    };
