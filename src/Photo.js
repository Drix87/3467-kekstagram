'use strict';

var gallery = require('./gallery');
var getPictureElement = require('./render-image');

var Photo = function(data, container, array) {
  this.data = data;
  this.element = getPictureElement(this.data, container, array);
  this.index = array.indexOf(data);

  //Вызывайте функцию показа галереи — в обработчике клика по блоку с фотографией
  this.onPictureClick = function() {
    gallery.showGallery(this.index);
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onPictureClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPictureClick);
};

module.exports = Photo;
