'use strict';

var getPictureElement = require('./render-image');

var Photo = function(data, container, array) {

  this.data = data;
  this.element = getPictureElement(this.data, container, array);
  this.index = array.indexOf(data);
  container.appendChild(this.element);
};

Photo.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

module.exports = Photo;
