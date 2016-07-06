'use strict';

var cssSelectorsDictionary = require('./cssSelectorsDictionary');

var Gallery = function() {
  this.galleryOverlay = document.querySelector(cssSelectorsDictionary.galleryOverlayClassName);
  this.galleryWrapper = document.querySelector(cssSelectorsDictionary.galleryWrapperClassName);
  this.galleryLikes = this.galleryWrapper.querySelector(cssSelectorsDictionary.galleryLikesClassName);
  this.galleryComments = this.galleryWrapper.querySelector(cssSelectorsDictionary.galleryCommentsClassName);
  this.galleryImg = document.querySelector(cssSelectorsDictionary.galleryImgClassName);
  this.galleryClose = document.querySelector(cssSelectorsDictionary.galleryCloseClassName);

  this.galleryPictures = [];
  this.openedFotoIndex = null;

  this.restoreFromHash = this.restoreFromHash.bind(this);
  window.addEventListener('hashchange', this.restoreFromHash);

  this.hideGallery = this.hideGallery.bind(this);

};

Gallery.prototype.showGallery = function(numberPhoto) {
  this.galleryOverlay.classList.remove('invisible');
  this.showPicture(numberPhoto, this.galleryPictures);

  // После показа, добавьте обработчики событий на блок галереи:
  this._onPhotoClick = this._onPhotoClick.bind(this);
  this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
  this.galleryImg.addEventListener('click', this._onPhotoClick);
  document.addEventListener('keydown', this._onDocumentKeyDown);
  // Закрыть галлерею по клику на Х
  this.closeByX = function() {
    this.hideGallery();
    this.openedFotoIndex = 1;
  };
  this.closeByX = this.closeByX.bind(this);
  this.galleryClose.addEventListener('click', this.closeByX);
};

Gallery.prototype.showPicture = function(photo, array) {
  if (typeof photo === 'string') {
    window.location.hash = photo;
    var findIndexOfArray = function(obj) {
      return '#photo/' + obj.url === photo;
    };
    var indexArray = array.findIndex(findIndexOfArray);
    this.openedFotoIndex = indexArray;
    this.galleryImg.src = array[indexArray].url;
    this.galleryLikes.innerHTML = array[indexArray].likes;
    this.galleryComments.innerHTML = array[indexArray].comments;
  } else if (typeof photo === 'number') {
    this.galleryImg.src = array[photo].url;
    this.galleryLikes.innerHTML = array[photo].likes;
    this.galleryComments.innerHTML = array[photo].comments;
  }
};

Gallery.prototype._onPhotoClick = function() {
  var nextFoto = this.openedFotoIndex += 1;
  window.location.hash = 'photo/' + this.galleryPictures[nextFoto].url;
};

Gallery.prototype._onDocumentKeyDown = function(evt) {
  if ((this.galleryOverlay.classList.contains('invisible') === false) && evt.keyCode === 27) {
    this.hideGallery();
    this.openedFotoIndex = 1;
  }
};

Gallery.prototype.restoreFromHash = function() {
  var arrHash = window.location.hash.match(/#photo\/(\S+)/);
  if (arrHash !== null) {
    this.showGallery(arrHash[0]);
  }
};

Gallery.prototype.hideGallery = function() {
  this.galleryOverlay.classList.add('invisible');
  window.location.hash = '';

  // Удаляем обработчики
  this.galleryImg.removeEventListener('click', this._onPhotoClick);
  document.removeEventListener('keydown', this._onDocumentKeyDown);
};

// Создайте функцию. Она будет принимать на вход массив объектов,
// описывающих фотографии, и сохранять их
Gallery.prototype.savedPictures = function(pictures) {
  this.galleryPictures = pictures;
};


module.exports = Gallery;

