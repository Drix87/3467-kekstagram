'use strict';

var gallery = require('./gallery');
var getPictureElement = require('./render-image');

var Photo = function(data, container, array) {
  this.data = data;
  debugger;
  this.element = getPictureElement(this.data, container, array);
  this.index = array.indexOf(this.data);

  //Вызывайте функцию показа галереи — в обработчике клика по блоку с фотографией
  this.onPictureClick = function() {
    gallery.showGallery(this.index);
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onPictureClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPictureClick);
  container.appendChild(this.element);
};

module.exports = Photo;
