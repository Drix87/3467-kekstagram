'use strict';

var cssSelectorsDictionary = require('./cssSelectorsDictionary');

var Gallery = function() {
  var self = this;

  self.galleryOverlay = document.querySelector(cssSelectorsDictionary.galleryOverlayClassName);
  self.galleryWrapper = document.querySelector(cssSelectorsDictionary.galleryWrapperClassName);
  self.galleryLikes = self.galleryWrapper.querySelector(cssSelectorsDictionary.galleryLikesClassName);
  self.galleryComments = self.galleryWrapper.querySelector(cssSelectorsDictionary.galleryCommentsClassName);
  self.galleryImg = document.querySelector(cssSelectorsDictionary.galleryImgClassName);
  self.galleryClose = document.querySelector(cssSelectorsDictionary.galleryCloseClassName);

  self.galleryPictures = [];
  self.openedFotoIndex = null;


  // Создайте функцию показа галереи. Эта функция должна показывать уже существующий в разметке блок .gallery-overlay,
  // убирая у него класс invisible. Функция должна принимать на вход номер фотографии в галерее, с которой нужно начать показ
  self.showGallery = function(numberPhoto) {
    self.galleryOverlay.classList.remove('invisible');
    self.showPicture(numberPhoto, self.galleryPictures);

    // После показа, добавьте обработчики событий на блок галереи:
    self.galleryImg.addEventListener('click', self._onPhotoClick);
    document.addEventListener('keydown', self._onDocumentKeyDown);
    // Закрыть галлерею по клику на Х
    self.galleryClose.addEventListener('click', function() {
      self.hideGallery();
      self.openedFotoIndex = 1;
    });

  };
  self.showPicture = function(photo, array) {
    if (typeof photo === 'string') {
      console.log('IT IS STRINGGGG');
      window.location.hash = photo;
      var findIndexOfArray = function(obj) {
        return '#photo/' + obj.url === photo;
      };
      var indexArray = array.findIndex(findIndexOfArray);
      self.openedFotoIndex = indexArray;
      self.galleryImg.src = array[indexArray].url;
      self.galleryLikes.innerHTML = array[indexArray].likes;
      self.galleryComments.innerHTML = array[indexArray].comments;
    } else if (typeof photo === 'number') {
      self.galleryImg.src = array[photo].url;
      self.galleryLikes.innerHTML = array[photo].likes;
      self.galleryComments.innerHTML = array[photo].comments;
    }
  };

  window.addEventListener('hashchange', function() {
    self.restoreFromHash();
  });

  self.restoreFromHash = function() {
    var arrHash = window.location.hash.match(/#photo\/(\S+)/);
    if (arrHash !== null) {
      self.showGallery(arrHash[0]);
    }
  };

  self.hideGallery = function() {
    self.galleryOverlay.classList.add('invisible');
    window.location.hash = '';

    // Удаляем обработчики
    self.galleryImg.removeEventListener('click', self._onPhotoClick);
    document.removeEventListener('keydown', self._onDocumentKeyDown);
  };

  self._onPhotoClick = function() {
    var nextFoto = self.openedFotoIndex += 1;
    window.location.hash = 'photo/' + self.galleryPictures[nextFoto].url;
  };
  self._onDocumentKeyDown = function(evt) {
    if ((self.galleryOverlay.classList.contains('invisible') === false) && evt.keyCode === 27) {
      self.hideGallery();
      self.openedFotoIndex = 1;
    }
  };
  // Создайте функцию. Она будет принимать на вход массив объектов,
  // описывающих фотографии, и сохранять их
  self.savedPictures = function(pictures) {
    self.galleryPictures = pictures;
  };
};



module.exports = Gallery;

