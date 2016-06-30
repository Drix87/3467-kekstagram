'use strict';

var CONST = require('./constants');
var cssSelectorsDictionary = require('./cssSelectorsDictionary');
var getPictureElement = require('./render-image');
var getFilteredPictures = require('./filter');
var utils = require('./utils');
var gallery = require('./gallery');

var picturesContainer = document.querySelector(cssSelectorsDictionary.picturesContainerClassName);
var ACTIVE_FILTER_CLASSNAME = cssSelectorsDictionary.activeFilterClassname;
var PAGE_SIZE = CONST.pageSize;
var PAGE_NUMBER = CONST.pageNumber;
var filters = document.querySelector(cssSelectorsDictionary.filtersClassName);
var pictures = [];
var filteredPictures = [];

// Прячет блок с фильтрами .filters, добавляя ему класс hidden.
filters.classList.add('hidden');

var getPictures = function(callback) {
  // Загрузите данные из файла //o0.github.io/assets/json/pictures.json по XMLHttpRequest.
  var xhr = new XMLHttpRequest();

  // Когда загрузка закончится, покажите список фотографий, как в предыдущем задании.
  xhr.onload = function(evt) {
    // console.log(evt.target)
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);

    // Не забудьте, что при любом исходе загрузки (успех, ошибка, таймаут),
    // нужно прятать прелоадер
    picturesContainer.classList.remove('pictures-loading');
    picturesContainer.classList.remove('pictures-failure');

    // Если загрузка закончится неудачно (ошибкой сервера или таймаутом),
    // покажите предупреждение об ошибке, добавив блоку .pictures класс pictures-failure.
    if (xhr.status !== 200) {
      picturesContainer.classList.add('pictures-failure');
    }
  };

  // Пока длится загрузка файла, покажите прелоадер, добавив класс .pictures-loading блоку .pictures.
  xhr.onprogress = function() {
    picturesContainer.classList.add('pictures-loading');
  };


  xhr.open('GET', CONST.picturesLoadUrl);
  xhr.send();
};

var THROTTLE_DELAY = 100;

var setScrollEnabled = function() {
  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {
      if (utils.isBottomReached()
         && utils.isNextPageAvailable(filteredPictures, PAGE_NUMBER, PAGE_SIZE)
        ) {
        PAGE_NUMBER++;
        renderPictures(filteredPictures, PAGE_NUMBER);
      }
      lastCall = Date.now();
    }
  });
};

var renderPictures = function(picturesArr, page, replace) {
  if (replace) {
    picturesContainer.innerHTML = '';
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  picturesArr.slice(from, to).forEach(function(picture) {
    getPictureElement(picture, picturesContainer, picturesArr);
  });
};

var setFilterEnabled = function(filter) {
  filteredPictures = getFilteredPictures(pictures, filter);
  PAGE_NUMBER = 0;
  renderPictures(filteredPictures, PAGE_NUMBER, true);

  var activeFilter = filters.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filter);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);

  // Вызывайте функцию сохранения списка фотографий после фильтрации списка
  gallery.savedPictures(filteredPictures);
};

// Напишите обработчики событий для фильтров, так, чтобы они
// сортировали загруженный список фотографий следующим образом:
var setFiltersEnabled = function() {
  filters.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('filters-radio')) {
      setFilterEnabled(evt.target.id);
    }
  });
};

getPictures(function(loadedPictures) {
  pictures = loadedPictures;
  filteredPictures = pictures.slice(0);
  renderPictures(filteredPictures, 0);
  setFiltersEnabled();
  setScrollEnabled();
});

// Отображает блок с фильтрами.
filters.classList.remove('hidden');
