function getMessage(a,b) {

  function multiply(nameArray1, nameArray2){
    var arrLength1 = nameArray1.length;
    var arrLength2 = nameArray2.length;

    for (var i = 0, sum = 0; i < arrLength1; i++) {
      sum += nameArray1[i] * nameArray2[i];
    }
    return sum;
  }

  if(typeof a === 'boolean'){
    if (a) {
      return 'Переданное GIF-изображение анимировано и содержит ' + b + ' кадров';
    } else {
      return 'Переданное GIF-изображение не анимировано';
    }
  }

  if (typeof a === 'number') {
    return 'Переданное SVG-изображение содержит ' + a + ' объектов и ' + b * 4 + ' аттрибутов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {

    var square = multiply(a,b);

    return 'Общая площадь артефактов сжатия: ' + square + ' пикселей';
  }

     if (Array.isArray(a)) {

      var arrLength = a.length;
      var sum = 0;
      for (var i = 0; i < arrLength; i++) {
        sum += a[i];
      }

      return 'Количество красных точек во всех строчках изображения: ' + sum;
    }

}

