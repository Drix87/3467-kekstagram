'use strict';

var cssSelectorsDictionary = require('./cssSelectorsDictionary');

var galleryOverlay = document.querySelector(cssSelectorsDictionary.galleryOverlayClassName);
var galleryWrapper = document.querySelector(cssSelectorsDictionary.galleryWrapperClassName);
var galleryLikes = galleryWrapper.querySelector(cssSelectorsDictionary.galleryLikesClassName);
var galleryComments = galleryWrapper.querySelector(cssSelectorsDictionary.galleryCommentsClassName);
var galleryImg = document.querySelector(cssSelectorsDictionary.galleryImgClassName);
var galleryClose = document.querySelector(cssSelectorsDictionary.galleryCloseClassName);

var galleryPictures = [];

// Создайте функцию показа фотографии по ее индексу в массиве, который был сохранен функцией показа галереи.
// Эта функция должна показывать фотографию в полноэкранном режиме и подставлять в разметку количество лайков
// и комментариев к этой фотографии
var showPicture = function(picture) {
  galleryImg.src = picture.url;
  galleryLikes.innerHTML = picture.likes;
  galleryComments.innerHTML = picture.comments;
};

// Используйте эту функцию в функции показа галереи и обработчике переключения

// Создайте функцию, которая скрывает галерею. Вызывайте эту функцию или по клику на черный оверлей вокруг
// фотографии или по нажатию на Esc. После скрытия галереи эта же функция, должна удалять добавленные обработчики событий
var hideGallery = function() {
  galleryOverlay.classList.add('invisible');

  // Удаляем обработчики
  galleryImg.removeEventListener('click', _onPhotoClick);
  document.removeEventListener('keydown', _onDocumentKeyDown);
};

// Экспортируйте из модуля функцию показа галереи и функцию сохранения списка фотографий.
// Остальные функции и переменные должны остаться инкапсулированными
module.exports = {

  // Создайте функцию показа галереи. Эта функция должна показывать уже существующий в разметке блок .gallery-overlay,
  // убирая у него класс invisible. Функция должна принимать на вход номер фотографии в галерее, с которой нужно начать показ
  showGallery: function(picture) {
    galleryOverlay.classList.remove('invisible');


    showPicture(picture);

    // После показа, добавьте обработчики событий на блок галереи:
    galleryImg.addEventListener('click', _onPhotoClick);
    document.addEventListener('keydown', _onDocumentKeyDown);

    // Закрыть галлерею по клику на Х
    galleryClose.addEventListener('click', function() {
      hideGallery();
    });
  },

  // Создайте функцию. Она будет принимать на вход массив объектов,
  // описывающих фотографии, и сохранять их
  savedPictures: function(pictures) {
    galleryPictures = pictures;
  }
};

// Обработчик события клика по фотографии _onPhotoClick, который будет показывать следующую фотографию.
var _onPhotoClick = function() {
  console.log('Показать след. фото по клику');

  showPicture();
};

// Обработчик клавиатурных событий _onDocumentKeyDown, который вызывает закрытие галереи по нажатию Esc.
var _onDocumentKeyDown = function(evt) {
  if ((galleryOverlay.classList.contains('invisible') === false) && evt.keyCode === 27) {
    hideGallery();
  }
};
