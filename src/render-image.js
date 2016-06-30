'use strict';

var cssSelectorsDictionary = require('./cssSelectorsDictionary');
var gallery = require('./gallery');
var templateElement = document.querySelector(cssSelectorsDictionary.templateElement);
var elementToClone;

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.picture');
} else {
  elementToClone = templateElement.querySelector('.picture');
}

// Создаёт для каждой записи массива pictures блок фотографии на основе
// шаблона #picture-template. Шаблон находится в build/index.html.
var getPictureElement = function(data, container, array) {
  var element = elementToClone.cloneNode(true);
  var iArr = array.indexOf(data);
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

  //Вызывайте функцию показа галереи — в обработчике клика по блоку с фотографией
  element.addEventListener('click', function(evt) {
    evt.preventDefault();
    console.log(evt.target);
    gallery.showGallery(iArr);
  });

  return element;
};

module.exports = getPictureElement;

