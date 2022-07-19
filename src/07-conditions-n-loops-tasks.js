/* *************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling  *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration              *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the 'Fizz','Buzz' or an original number using the following rules:
 * 1) return original number
 * 2) but if number multiples of three return 'Fizz'
 * 3) for the multiples of five return 'Buzz'
 * 4) for numbers which are multiples of both three and five return 'FizzBuzz'
 *
 * @param {number} num
 * @return {any}
 *
 * @example
 *   2 =>  2
 *   3 => 'Fizz'
 *   5 => 'Buzz'
 *   4 => 4
 *  15 => 'FizzBuzz'
 *  20 => 'Buzz'
 *  21 => 'Fizz'
 *
 */
function getFizzBuzz(num) {
  let fizzBuzz;
  if (num % 3 === 0 && num % 5 === 0) {
    fizzBuzz = 'FizzBuzz';
  } else if (num % 5 === 0) {
    fizzBuzz = 'Buzz';
  } else if (num % 3 === 0) {
    fizzBuzz = 'Fizz';
  } else { fizzBuzz = num; }
  return fizzBuzz;
}


/**
 * Returns the factorial of the specified integer n.
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   1  => 1
 *   5  => 120
 *   10 => 3628800
 */
function getFactorial(n) {
  if (!n) { return 1; }
  return n * getFactorial(n - 1);
}


/**
 * Returns the sum of integer numbers between n1 and n2 (inclusive).
 *
 * @param {number} n1
 * @param {number} n2
 * @return {number}
 *
 * @example:
 *   1,2   =>  3  ( = 1+2 )
 *   5,10  =>  45 ( = 5+6+7+8+9+10 )
 *   -1,1  =>  0  ( = -1 + 0 + 1 )
 */
function getSumBetweenNumbers(n1, n2) {
  const newArr = [];
  let count = n1;
  function getArr() {
    if (count === n2) {
      newArr.push(count);
      return newArr;
    }
    newArr.push(count);
    count += 1;
    return getArr();
  }
  return getArr().reduce((acc, el) => acc + el);
}


/**
 * Returns true, if a triangle can be built with the specified sides a, b, c
 * and false in any other ways.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {bool}
 *
 * @example:
 *   1,2,3    =>  false
 *   3,4,5    =>  true
 *   10,1,1   =>  false
 *   10,10,10 =>  true
 */
function isTriangle(a, b, c) {
  if (a <= 1 || b <= 1 || c <= 1) {
    return false;
  }
  return true;
}


/**
 * Returns true, if two specified axis-aligned rectangles overlap, otherwise false.
 * Each rectangle representing by object
 *  {
 *     top: 5,
 *     left: 5,
 *     width: 20,
 *     height: 10
 *  }
 *
 *  (5;5)
 *     -------------
 *     |           |
 *     |           |  height = 10
 *     -------------
 *        width=20
 *
 * NOTE: Please use canvas coordinate space (https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#The_grid),
 * it differs from Cartesian coordinate system.
 *
 * @param {object} rect1
 * @param {object} rect2
 * @return {bool}
 *
 * @example:
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top: 5, left: 5, width: 20, height: 20 }    =>  true
 *
 *   { top: 0, left: 0, width: 10, height: 10 },
 *   { top:20, left:20, width: 20, height: 20 }    =>  false
 *
 */
function doRectanglesOverlap(rect1, rect2) {
  const bol = true;
  const left1 = rect1.left;
  const right1 = rect1.left + rect1.width;
  const left2 = rect2.left;
  const right2 = rect2.left + rect2.width;

  const top1 = rect1.top;
  const bottom1 = rect1.top + rect1.height;
  const top2 = rect2.top;
  const bottom2 = rect1.top + rect1.height;

  if (left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1) {
    return false;
  }
  return bol;
}


/**
 * Returns true, if point lies inside the circle, otherwise false.
 * Circle is an object of
 *  {
 *     center: {
 *       x: 5,
 *       y: 5
 *     },
 *     radius: 20
 *  }
 *
 * Point is object of
 *  {
 *     x: 5,
 *     y: 5
 *  }
 *
 * @param {object} circle
 * @param {object} point
 * @return {bool}
 *
 * @example:
 *   { center: { x:0, y:0 }, radius:10 },  { x:0, y:0 }     => true
 *   { center: { x:0, y:0 }, radius:10 },  { x:10, y:10 }   => false
 *
 */
function isInsideCircle(circle, point) {
  const makeCoord = (coord, radius) => {
    const arr = [];
    for (let i = coord - radius; i <= circle.radius + coord; i += 1) {
      if (i === coord - radius || i === circle.radius + coord) {
        arr.push(i);
      }
    }
    return arr;
  };
  const coordX = makeCoord(circle.center.x, circle.radius);
  const coordY = makeCoord(circle.center.y, circle.radius);
  let bol = false;
  // eslint-disable-next-line max-len
  if ((coordX[0] < point.x && coordX[1] > point.x) && (coordY[0] < point.y && coordY[1] > point.y)) {
    bol = true;
  }
  // eslint-disable-next-line max-len
  if ((point.x === point.y) && !(coordX[0] < point.x - 1 && coordX[1] > point.x + 1) && !(coordY[0] < point.y - 1 && coordY[1] > point.y + 1)) {
    bol = false;
  }
  return bol;
}


/**
 * Returns the first non repeated char in the specified strings otherwise returns null.
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 *   'The quick brown fox jumps over the lazy dog' => 'T'
 *   'abracadabra'  => 'c'
 *   'entente' => null
 */
function findFirstSingleChar(str) {
  let letter = null;
  let arr = str.split('');
  arr.forEach((el, i) => {
    arr.splice(i, 1);
    if (arr.indexOf(str.split('')[i]) === -1 && !letter) {
      letter = str.split('')[i];
    }
    arr = str.split('');
  });
  return letter;
}


/**
 * Returns the string representation of math interval,
 * specified by two points and include / exclude flags.
 * See the details: https://en.wikipedia.org/wiki/Interval_(mathematics)
 *
 * Please take attention, that the smaller number should be the first in the notation
 *
 * @param {number} a
 * @param {number} b
 * @param {bool} isStartIncluded
 * @param {bool} isEndIncluded
 * @return {string}
 *
 * @example
 *   0, 1, true, true   => '[0, 1]'
 *   0, 1, true, false  => '[0, 1)'
 *   0, 1, false, true  => '(0, 1]'
 *   0, 1, false, false => '(0, 1)'
 * Smaller number has to be first :
 *   5, 3, true, true   => '[3, 5]'
 *
 */
function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  let first;
  let second;
  let firstStr = '';
  let secondStr = '';
  const falseBr = ['(', ')'];
  const trueNr = ['[', ']'];
  if (a >= b) {
    first = b;
    second = a;
  } else {
    first = a;
    second = b;
  }
  if (isStartIncluded) {
    firstStr = `${trueNr[0]}${first}`;
  } else {
    firstStr = `${falseBr[0]}${first}`;
  }
  if (isEndIncluded) {
    secondStr = `${second}${trueNr[1]}`;
  } else {
    secondStr = `${second}${falseBr[1]}`;
  }
  return `${firstStr}, ${secondStr}`;
}


/**
 * Reverse the specified string (put all chars in reverse order)
 *
 * @param {string} str
 * @return {string}
 *
 * @example:
 * 'The quick brown fox jumps over the lazy dog' => 'god yzal eht revo spmuj xof nworb kciuq ehT'
 * 'abracadabra' => 'arbadacarba'
 * 'rotator' => 'rotator'
 * 'noon' => 'noon'
 */
function reverseString(str) {
  return str.split('').reverse().join('');
}


/**
 * Reverse the specified integer number (put all digits in reverse order)
 *
 * @param {number} num
 * @return {number}
 *
 * @example:
 *   12345 => 54321
 *   1111  => 1111
 *   87354 => 45378
 *   34143 => 34143
 */
function reverseInteger(num) {
  return num.toString().split('').reverse().join('');
}


/**
 * Validates the CCN (credit card number) and return true if CCN is valid
 * and false otherwise.
 *
 * See algorithm here : https://en.wikipedia.org/wiki/Luhn_algorithm
 *
 * @param {number} cnn
 * @return {boolean}
 *
 * @example:
 *   79927398713      => true
 *   4012888888881881 => true
 *   5123456789012346 => true
 *   378282246310005  => true
 *   371449635398431  => true
 *
 *   4571234567890111 => false
 *   5436468789016589 => false
 *   4916123456789012 => false
 */
function isCreditCardNumber(ccn) {
  let numbers = ccn.toString().split('').reverse();
  numbers.unshift('0');
  numbers = numbers.map((el) => Number(el));
  numbers = numbers.map((el, i) => {
    if (i % 2 === 0) {
      const num = el * 2;
      if (String(num).length === 2) {
        return String(num).split('').reduce((acc, val) => acc + +val, 0);
      } return num;
    }
    return el;
  });
  const finalNum = numbers.reduce((acc, el) => acc + el);
  if (finalNum % 10 === 0) {
    return true;
  }
  return false;
}

/**
 * Returns the digital root of integer:
 *   step1 : find sum of all digits
 *   step2 : if sum > 9 then goto step1 otherwise return the sum
 *
 * @param {number} n
 * @return {number}
 *
 * @example:
 *   12345 ( 1+2+3+4+5 = 15, 1+5 = 6) => 6
 *   23456 ( 2+3+4+5+6 = 20, 2+0 = 2) => 2
 *   10000 ( 1+0+0+0+0 = 1 ) => 1
 *   165536 (1+6+5+5+3+6 = 26,  2+6 = 8) => 8
 */
function getDigitalRoot(num) {
  function convert(n) {
    if (n.toString().length <= 1) {
      return n;
    }
    return convert(n.toString().split('').reduce((acc, val) => acc + Number(val), 0));
  }
  return convert(num);
}


/**
 * Returns true if the specified string has the balanced brackets and false otherwise.
 * Balanced means that is, whether it consists entirely of pairs of opening/closing brackets
 * (in that order), none of which mis-nest.
 * Brackets include [],(),{},<>
 *
 * @param {string} str
 * @return {boolean}
 *
 * @example:
 *   '' => true
 *   '[]'  => true
 *   '{}'  => true
 *   '()   => true
 *   '[[]' => false
 *   ']['  => false
 *   '[[][][[]]]' => true
 *   '[[][]][' => false
 *   '{)' = false
 *   '{[(<{[]}>)]}' = true
 */
function isBracketsBalanced(str) {
  const open = '[({<';
  const close = '])}>';
  const arr = str.split('');
  const last = [];
  let bol = true;
  arr.forEach((el) => {
    if (open.indexOf(el) !== -1) {
      last.push(el);
    } else if (open[close.indexOf(el)] === last[last.length - 1]) {
      last.splice(last.length - 1, 1);
    } else bol = false;
  });
  return bol && !last.length;
}


/**
 * Returns the string with n-ary (binary, ternary, etc, where n <= 10)
 * representation of specified number.
 * See more about
 * https://en.wikipedia.org/wiki/Binary_number
 * https://en.wikipedia.org/wiki/Ternary_numeral_system
 * https://en.wikipedia.org/wiki/Radix
 *
 * @param {number} num
 * @param {number} n, radix of the result
 * @return {string}
 *
 * @example:
 *   1024, 2  => '10000000000'
 *   6561, 3  => '100000000'
 *    365, 2  => '101101101'
 *    365, 3  => '111112'
 *    365, 4  => '11231'
 *    365, 10 => '365'
 */
function toNaryString(num, n) {
  return num.toString(n);
}


/**
 * Returns the common directory path for specified array of full filenames.
 *
 * @param {array} pathes
 * @return {string}
 *
 * @example:
 *   ['/web/images/image1.png', '/web/images/image2.png']  => '/web/images/'
 *   ['/web/assets/style.css', '/web/scripts/app.js',  'home/setting.conf'] => ''
 *   ['/web/assets/style.css', '/.bin/mocha',  '/read.me'] => '/'
 *   ['/web/favicon.ico', '/web-scripts/dump', '/verbalizer/logs'] => '/'
 */
function getCommonDirectoryPath(pathes) {
  let count = 1;
  let newArr = [];
  let secArr = [];
  function finder(arr) {
    newArr = [];
    secArr = [];
    arr.map((el) => newArr.push(el.slice(0, count)));
    arr.map((el) => secArr.push(el.slice(0, count + 1)));
    count += 1;
    if (newArr.every((el) => el === newArr[0]) && !secArr.every((el) => el === secArr[0])) {
      return newArr;
    }
    return finder(arr);
  }
  if (!pathes.every((el) => el[0] === pathes[0][0])) {
    return '';
  }
  const newStr = finder(pathes)[0];
  return newStr.slice(0, newStr.lastIndexOf('/') + 1);
}


/**
 * Returns the product of two specified matrixes.
 * See details: https://en.wikipedia.org/wiki/Matrix_multiplication
 *
 * @param {array} m1
 * @param {array} m2
 * @return {array}
 *
 * @example:
 *   [[ 1, 0, 0 ],       [[ 1, 2, 3 ],           [[ 1, 2, 3 ],
 *    [ 0, 1, 0 ],   X    [ 4, 5, 6 ],     =>     [ 4, 5, 6 ],
 *    [ 0, 0, 1 ]]        [ 7, 8, 9 ]]            [ 7, 8, 9 ]]
 *
 *                        [[ 4 ],
 *   [[ 1, 2, 3]]    X     [ 5 ],          =>     [[ 32 ]]
 *                         [ 6 ]]
 *
 */
function getMatrixProduct(m1, m2) {
  const arr = [];
  if (m1.length === 1) {
    let sum = 0;
    m1[0].forEach((el, i) => {
      sum += el * m2[i][0];
    });
    arr.push([sum]);
  } else {
    m1.forEach((el, i) => {
      el.forEach((el2, j) => {
        if (j === 0) { arr.push([]); }
        let sum = 0;
        for (let k = 0; k < m1.length; k += 1) {
          sum += m1[j][k] * m2[i][j];
          if (k === m2.length - 1) {
            arr[i].push(sum);
          }
        }
      });
    });
  }

  return arr;
}


/**
 * Returns the evaluation of the specified tic-tac-toe position.
 * See the details: https://en.wikipedia.org/wiki/Tic-tac-toe
 *
 * Position is provides as 3x3 array with the following values: 'X','0', undefined
 * Function should return who is winner in the current position according to the game rules.
 * The result can be: 'X','0',undefined
 *
 * @param {array} position
 * @return {string}
 *
 * @example
 *
 *   [[ 'X',   ,'0' ],
 *    [    ,'X','0' ],       =>  'X'
 *    [    ,   ,'X' ]]
 *
 *   [[ '0','0','0' ],
 *    [    ,'X',    ],       =>  '0'
 *    [ 'X',   ,'X' ]]
 *
 *   [[ '0','X','0' ],
 *    [    ,'X',    ],       =>  undefined
 *    [ 'X','0','X' ]]
 *
 *   [[    ,   ,    ],
 *    [    ,   ,    ],       =>  undefined
 *    [    ,   ,    ]]
 *
 */
function evaluateTicTacToePosition(position) {
  const inverseArr = [[], [], [], [], [], [], [], []];
  let winner;
  position.forEach((el, i) => {
    inverseArr[6].push(position[i][i]);
    inverseArr[7].push(position[i][position.length - i - 1]);
    el.forEach((el2, j) => {
      inverseArr[i].push(position[j][i]);
      inverseArr[i + 3].push(position[i][j]);
    });
  });
  inverseArr.forEach((el) => {
    if (el.reduce((a, b) => a + b) === 'XXX') {
      winner = 'X';
    }
    if (el.reduce((a, b) => a + b) === '000') {
      winner = '0';
    }
  });
  return winner;
}

module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
