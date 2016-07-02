'use strict';

var getPictureElement = require('./render-image');

var Photo = function(data, container, array) {
  var self = this;

  this.data = data;
  this.element = getPictureElement(this.data, container, array);
  this.index = array.indexOf(data);

  this.remove = function() {
    self.element.removeEventListener('click', this.onPictureClick);
    self.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onPictureClick);
  container.appendChild(this.element);
};

module.exports = Photo;
