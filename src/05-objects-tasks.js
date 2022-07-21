
/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Rectangle.prototype.getArea = function area() {
    return this.width * this.height;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const parseData = JSON.parse(json);
  return Object.setPrototypeOf(parseData, proto);
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {

  str: '',
  elArr: [],
  idArr: [],
  pseudoArr: [],
  arr: [],
  elementsArr: [],
  arrCombinator: [],
  countArr: [],
  count: 0,
  errObj: {
    el: 'Element, id and pseudo-element should not occur more then one time inside the selector',
    sel: 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
  },

  element(value) {
    if (!this.countArr.includes(0)) { this.countArr.push(0); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    if (this.elArr.includes('element') && !this.arrCombinator.length) {
      throw new Error(this.errObj.el);
    } else {
      this.elArr.push('element');
    }
    this.elementsArr.push(value);
    if (this.count >= 1) {
      this.str = `${this.str}&${value}`;
    } else {
      this.str += value;
    }
    this.idArr = [];
    this.pseudoArr = [];
    this.count += 1;
    this.arr.push(value);
    return this;
  },

  id(value) {
    if (!this.countArr.includes(1)) { this.countArr.push(1); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    if (this.idArr.includes('id') && !this.arrCombinator.length) {
      throw new Error(this.errObj.el);
    } else {
      this.idArr.push('id');
    }
    this.elArr = [];
    this.pseudoArr = [];
    this.str += `#${value}`;
    this.arr.push(`#${value}`);
    return this;
  },

  class(value) {
    if (!this.countArr.includes(2)) { this.countArr.push(2); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `.${value}`;
    this.arr.push(`.${value}`);
    return this;
  },

  attr(value) {
    if (!this.countArr.includes(3)) { this.countArr.push(3); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `[${value}]`;
    this.arr.push(`[${value}]`);
    return this;
  },

  pseudoClass(value) {
    if (!this.countArr.includes(4)) { this.countArr.push(4); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `:${value}`;
    this.arr.push(`:${value}`);
    return this;
  },

  pseudoElement(value) {
    if (!this.countArr.includes(5)) { this.countArr.push(5); }
    this.countArr.forEach(() => {
      if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
        throw new Error(this.errObj.sel);
      }
    });
    if (this.pseudoArr.includes('pseudoElement') && !this.arrCombinator.length) {
      throw new Error(this.errObj.el);
    } else {
      this.pseudoArr.push('pseudoElement');
    }
    this.elArr = [];
    this.idArr = [];
    this.str += `::${value}`;
    this.arr.push(`::${value}`);
    return this;
  },

  // eslint-disable-next-line no-unused-vars
  combine(selector1, combinator, selector2) {
    this.arrCombinator.push(combinator);
    return this;
  },

  clear() {
    this.elArr = [];
    const copiedArr = [...this.arr];
    const copiedArrCombinator = this.arrCombinator.reverse();
    const copiedEleemts = this.elementsArr;
    let str = '';
    if (copiedArrCombinator.length) {
      copiedEleemts.forEach((el, i) => {
        if (i > 0 && copiedEleemts.length > 1) {
          const index = copiedArr.indexOf(el);
          copiedArr.splice(index, 1, ` ${copiedArrCombinator.shift()} ${el}`);
        } else if (i === 0 && copiedEleemts.length === 1) {
          const index = copiedArr.indexOf(el);
          copiedArr.splice(index, 1, ` ${copiedArrCombinator.shift()} ${el}`);
        }
      });
    }
    copiedArr.forEach((el) => {
      str += el;
    });
    this.str = '';
    this.arr = [];
    this.elementsArr = [];
    this.arrCombinator = [];
    this.count = 0;
    this.countArr = [];
    return str;
  },

};

// eslint-disable-next-line no-extend-native
Object.prototype.stringify = function stringify() {
  return this.clear();
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
