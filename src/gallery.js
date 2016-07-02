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
    self.openedFotoIndex = numberPhoto;

    // После показа, добавьте обработчики событий на блок галереи:
    self.galleryImg.addEventListener('click', self._onPhotoClick);
    document.addEventListener('keydown', self._onDocumentKeyDown);
    // Закрыть галлерею по клику на Х
    self.galleryClose.addEventListener('click', function() {
      self.hideGallery();
      self.openedFotoIndex = 1;
    });
  };
  self.showPicture = function(arrIndex, array) {
    self.galleryImg.src = array[arrIndex].url;
    self.galleryLikes.innerHTML = array[arrIndex].likes;
    self.galleryComments.innerHTML = array[arrIndex].comments;
  };

  self.hideGallery = function() {
    self.galleryOverlay.classList.add('invisible');

    // Удаляем обработчики
    self.galleryImg.removeEventListener('click', self._onPhotoClick);
    document.removeEventListener('keydown', self._onDocumentKeyDown);
  };

  self._onPhotoClick = function() {
    var nextFoto = self.openedFotoIndex += 1;
    self.showPicture(nextFoto, self.galleryPictures);
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

