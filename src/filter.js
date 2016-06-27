'use strict';

var CONST = require('./constants');
var cssSelectorsDictionary = require('./cssSelectorsDictionary');
var utils = require('./utils');

var getFilteredPictures = function(picturesArr, filter) {
  var picturesToFilter = picturesArr.slice(0);

  switch (filter) {
    // Популярные — список фотографий, в том виде, в котором он был загружен
    case cssSelectorsDictionary.filterPopularId:
      picturesToFilter.sort(function(a, b) {
        return b.likes - a.likes;
      });
      break;

    // Новые — список фотографий, сделанных за последние четыре дня,
    // отсортированные по убыванию даты (поле date).
    case cssSelectorsDictionary.filterNewId:
      var DAYS = CONST.days;
      var lastFourDays = 4 * DAYS;
      var today = new Date();
      var showLastFourDays = function(a) {
        var dateImgDownload = new Date(a.date);
        return dateImgDownload >= (today - lastFourDays);
      };
      picturesToFilter = picturesToFilter.filter(showLastFourDays);
      break;

    // Обсуждаемые — отсортированные по убыванию количества комментариев (поле comments)
    case cssSelectorsDictionary.filterDiscussId:
      picturesToFilter.sort(function(a, b) {
        return b.comments - a.comments;
      });
      break;

    // Сделайте так, чтобы если при фильтрации, ни один элемент из списка не
    // подходит под выбранные критерии, в блоке выводилось соответствующее сообщение.
    default:
      utils.showError();
      break;
  }

  if (picturesToFilter.length === 0) {
    return utils.showError();
  } else {
    return picturesToFilter;
  }
};

module.exports = getFilteredPictures;
