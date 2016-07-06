'use strict';

var CONST = require('./constants');
var cssSelectorsDictionary = require('./cssSelectorsDictionary');

var body = document.querySelector(cssSelectorsDictionary.body);
var picturesContainer = document.querySelector(cssSelectorsDictionary.picturesContainerClassName);

var GAP = CONST.gap;
var templateError = document.querySelector(cssSelectorsDictionary.templateErrorId);

var errorElement = templateError.content.querySelector(cssSelectorsDictionary.errorWrapperClassName);

module.exports = {

  isBottomReached: function() {
    var picturesPosition = picturesContainer.getBoundingClientRect();
    return picturesPosition.bottom - window.innerHeight - GAP <= 0;
  },
  isNextPageAvailable: function(picturesArr, page, pageSize) {
    return page < Math.ceil(picturesArr.length / pageSize);
  },
  showError: function() {

    errorElement = errorElement.cloneNode(true);
    body.appendChild(errorElement);
    var errorClose = document.querySelector(cssSelectorsDictionary.errorCloseClassName);
    errorClose.addEventListener('click', function(evt) {
      evt.preventDefault();
      body.removeChild(errorElement);
    });
  }
};
