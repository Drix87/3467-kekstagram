function getMessage(a,b) {
  if(a){
    return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
  } else {
    return 'Переданное GIF-изображение не анимировано';
  }

  if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' атрибутов';
  }

  if (typeof a === 'object') {

    var arrLength = a.length;
    var sum = 0;
    for (var i = 0; i < arrLength; i++) {
      sum += a[i];
    }

    return 'Количество красных точек во всех строчках изображения: ' + sum;
  }



    function multiply(nameArray){
      var arrLength = nameArray.length;
      var result = 1;

      for (var i = 0; i < arrLength; i++) {
        result *= nameArray[i];
      }
      return result;
    }

  if (typeof a === 'object' && typeof b === 'object') {

    var aResult = multiply(a);
    var bResult = multiply(b);
    var square = aResult + bResult;

    return 'Общая площадь артефактов сжатия: ' + square + ' пикселей';
  }

}

