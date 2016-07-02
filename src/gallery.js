'use strict';

var cssSelectorsDictionary = require('./cssSelectorsDictionary');

var Gallery = function() {
  var self = this;

  this.galleryOverlay = document.querySelector(cssSelectorsDictionary.galleryOverlayClassName);
  this.galleryWrapper = document.querySelector(cssSelectorsDictionary.galleryWrapperClassName);
  this.galleryLikes = this.galleryWrapper.querySelector(cssSelectorsDictionary.galleryLikesClassName);
  this.galleryComments = this.galleryWrapper.querySelector(cssSelectorsDictionary.galleryCommentsClassName);
  this.galleryImg = document.querySelector(cssSelectorsDictionary.galleryImgClassName);
  this.galleryClose = document.querySelector(cssSelectorsDictionary.galleryCloseClassName);

  this.galleryPictures = [];
  this.openedFotoIndex = null;


  // Создайте функцию показа галереи. Эта функция должна показывать уже существующий в разметке блок .gallery-overlay,
  // убирая у него класс invisible. Функция должна принимать на вход номер фотографии в галерее, с которой нужно начать показ
  this.showGallery = function(numberPhoto) {
    self.galleryOverlay.classList.remove('invisible');
    self.showPicture(numberPhoto, self.galleryPictures);
    self.openedFotoIndex = numberPhoto;

    // После показа, добавьте обработчики событий на блок галереи:
    self.galleryImg.addEventListener('click', this._onPhotoClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
    // Закрыть галлерею по клику на Х
    self.galleryClose.addEventListener('click', function() {
      self.hideGallery();
      self.openedFotoIndex = 1;
    });
  };
  this.showPicture = function(arrIndex, array) {
    self.galleryImg.src = array[arrIndex].url;
    self.galleryLikes.innerHTML = array[arrIndex].likes;
    self.galleryComments.innerHTML = array[arrIndex].comments;
  };

  this.hideGallery = function() {
    self.galleryOverlay.classList.add('invisible');

    // Удаляем обработчики
    self.galleryImg.removeEventListener('click', this._onPhotoClick);
    document.removeEventListener('keydown', this._onDocumentKeyDown);
  };

  this._onPhotoClick = function() {
    var nextFoto = self.openedFotoIndex += 1;
    self.showPicture(nextFoto, self.galleryPictures);
  };
  this._onDocumentKeyDown = function(evt) {
    if ((self.galleryOverlay.classList.contains('invisible') === false) && evt.keyCode === 27) {
      self.hideGallery();
      self.openedFotoIndex = 1;
    }
  };
  // Создайте функцию. Она будет принимать на вход массив объектов,
  // описывающих фотографии, и сохранять их
  this.savedPictures = function(pictures) {
    self.galleryPictures = pictures;
  };
};



module.exports = Gallery;

