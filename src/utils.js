'use strict';

var CONST = require('./constants');

var body = document.querySelector(CONST.body);
var picturesContainer = document.querySelector(CONST.picturesContainer);
var picturesPosition = picturesContainer.getBoundingClientRect();
var GAP = CONST.GAP;
var templateError = document.querySelector(CONST.templateError);

var errorElement = templateError.content.querySelector(CONST.errorElement);

module.exports = {

  isBottomReached: function() {
    return picturesPosition.bottom - window.innerHeight - GAP <= 0;
  },
  isNextPageAvailable: function(picturesArr, page, pageSize) {
    return page < Math.ceil(picturesArr.length / pageSize);
  },
  showError: function() {

    errorElement = errorElement.cloneNode(true);
    body.appendChild(errorElement);
    var errorClose = document.querySelector(CONST.errorClose);
    errorClose.addEventListener('click', function(evt) {
      evt.preventDefault();
      body.removeChild(errorElement);
    });
  }
};
