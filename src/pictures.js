'use strict';

var picturesContainer = document.querySelector('.pictures');
var templateElement = document.querySelector('template');
var elementToClone;

var PICTURES_LOAD_URL = 'https://o0.github.io/assets/json/pictures.json';

var ACTIVE_FILTER_CLASSNAME = 'picture-filter-active';

var PAGE_SIZE = 12;
var pageNumber = 0;

var pictures = [];

var filteredPictures = [];

var Filter = {
  'POPULAR': 'filter-popular',
  'NEW': 'filter-new',
  'DISCUSS': 'filter-discussed'
};

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

// Прячет блок с фильтрами .filters, добавляя ему класс hidden.
var filters = document.querySelector('.filters');
filters.classList.add('hidden');

// Создаёт для каждой записи массива pictures блок фотографии на основе
// шаблона #picture-template. Шаблон находится в build/index.html.
var getPictureElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.setAttribute('href', data.url);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;
  container.appendChild(element);

  // Выводит созданные элементы на страницу внутрь блока .pictures.
  var elementImage = new Image();

  // Обработчик загрузки: после загрузки изображения, укажите тегу <img />
  // в шаблоне src загруженного изображения и задайте ему размеры 182×182.
  elementImage.onload = function() {
    var imageH = 182;
    var imageW = 182;
    var image = element.querySelector('img');
    image.setAttribute('src', data.url);
    image.setAttribute('height', imageH);
    image.setAttribute('width', imageW);
  };

  // Обработчик ошибки: добавьте блоку фотографии .picture класс picture-load-failure.
  elementImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };

  elementImage.src = data.url;

  return element;
};

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


  xhr.open('GET', PICTURES_LOAD_URL);
  xhr.send();
};

var isBottomReached = function() {
  var GAP = 100;
  var picturesPosition = picturesContainer.getBoundingClientRect();
  return picturesPosition.bottom - window.innerHeight - GAP <= 0;
};

var isNextPageAvailable = function(picturesArr, page, pageSize) {
  return page < Math.ceil(picturesArr.length / pageSize);
};

var THROTTLE_DELAY = 100;

var setScrollEnabled = function() {
  var lastCall = Date.now();

  window.addEventListener('scroll', function() {
    if (Date.now() - lastCall >= THROTTLE_DELAY) {
      if (isBottomReached()
         && isNextPageAvailable(filteredPictures, pageNumber, PAGE_SIZE)
        ) {
        pageNumber++;
        renderPictures(filteredPictures, pageNumber);
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
    getPictureElement(picture, picturesContainer);
  });
};

var getFilteredPictures = function(picturesArr, filter) {
  var picturesToFilter = picturesArr.slice(0);

  switch (filter) {
    // Популярные — список фотографий, в том виде, в котором он был загружен
    case Filter.POPULAR:
      picturesToFilter.sort(function(a, b) {
        return b.likes - a.likes;
      });
      break;

    // Новые — список фотографий, сделанных за последние четыре дня,
    // отсортированные по убыванию даты (поле date).
    case Filter.NEW:
      var SECONDS = 1000;
      var MINUTES = SECONDS * 60;
      var HOURS = MINUTES * 60;
      var DAYS = HOURS * 24;

      var lastFourDays = 4 * DAYS;
      var today = new Date();
      var showLastFourDays = function(a) {
        var dateImgDownload = new Date(a.date);
        return dateImgDownload >= (today - lastFourDays);
      };
      picturesToFilter = picturesToFilter.filter(showLastFourDays);
      break;

    // Обсуждаемые — отсортированные по убыванию количества комментариев (поле comments)
    case Filter.DISCUSS:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;

    // Сделайте так, чтобы если при фильтрации, ни один элемент из списка не
    // подходит под выбранные критерии, в блоке выводилось соответствующее сообщение.
    default:
      showError();
      break;
  }

  if (picturesToFilter.length === 0) {
    return showError();
  } else {
    return picturesToFilter;
  }
};

var showError = function() {
  var body = document.querySelector('body');
  var templateError = document.querySelector('#error-filter');
  var errorElement = templateError.content.querySelector('.error-wrapper');
  errorElement = errorElement.cloneNode(true);
  body.appendChild(errorElement);

  var errorClose = document.querySelector('.error-close');
  var errorWrap = document.querySelector('.error-wrapper');
  errorClose.addEventListener('click', function(evt) {
    evt.preventDefault();
    body.removeChild(errorWrap);
  });
};

var setFilterEnabled = function(filter) {
  filteredPictures = getFilteredPictures(pictures, filter);
  pageNumber = 0;
  renderPictures(filteredPictures, pageNumber, true);

  var activeFilter = filters.querySelector('.' + ACTIVE_FILTER_CLASSNAME);
  if (activeFilter) {
    activeFilter.classList.remove(ACTIVE_FILTER_CLASSNAME);
  }
  var filterToActivate = document.getElementById(filter);
  filterToActivate.classList.add(ACTIVE_FILTER_CLASSNAME);
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
  renderPictures(pictures, 0);
  setScrollEnabled();
});

// Отображает блок с фильтрами.
filters.classList.remove('hidden');

