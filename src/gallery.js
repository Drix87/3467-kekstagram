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
    this.galleryOverlay.classList.remove('invisible');
    self.showPicture(numberPhoto, self.galleryPictures);
    this.openedFotoIndex = numberPhoto;

    // После показа, добавьте обработчики событий на блок галереи:
    this.galleryImg.addEventListener('click', this._onPhotoClick);
    document.addEventListener('keydown', this._onDocumentKeyDown);
    // Закрыть галлерею по клику на Х
    this.galleryClose.addEventListener('click', function() {
      self.hideGallery();
      self.openedFotoIndex = 1;
    });
  };
  this.showPicture = function(arrIndex, array) {
    this.galleryImg.src = array[arrIndex].url;
    this.galleryLikes.innerHTML = array[arrIndex].likes;
    this.galleryComments.innerHTML = array[arrIndex].comments;
  };

  this.hideGallery = function() {
    this.galleryOverlay.classList.add('invisible');

    // Удаляем обработчики
    this.galleryImg.removeEventListener('click', this._onPhotoClick);
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
    this.galleryPictures = pictures;
  };
};



module.exports = Gallery;

