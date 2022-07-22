
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

class MSBES {
  constructor() {
    this.str = '';
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.countArr = [];
    this.errObj = {
      el: 'Element, id and pseudo-element should not occur more then one time inside the selector',
      sel: 'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element',
    };
  }

  element(value) {
    if (!this.countArr.includes(0)) { this.countArr.push(0); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    if (this.elArr.includes('element')) {
      throw new Error(this.errObj.el);
    } else {
      this.elArr.push('element');
    }
    this.idArr = [];
    this.pseudoArr = [];
    this.str += value;
    return this;
  }

  id(value) {
    if (!this.countArr.includes(1)) { this.countArr.push(1); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    if (this.idArr.includes('id')) {
      throw new Error(this.errObj.el);
    } else {
      this.idArr.push('id');
    }
    this.elArr = [];
    this.pseudoArr = [];
    this.str += `#${value}`;
    return this;
  }

  class(value) {
    if (!this.countArr.includes(2)) { this.countArr.push(2); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `.${value}`;
    return this;
  }

  attr(value) {
    if (!this.countArr.includes(3)) { this.countArr.push(3); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `[${value}]`;
    return this;
  }

  pseudoClass(value) {
    if (!this.countArr.includes(4)) { this.countArr.push(4); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.str += `:${value}`;
    return this;
  }

  pseudoElement(value) {
    if (!this.countArr.includes(5)) { this.countArr.push(5); }
    if (this.countArr[0] > this.countArr[1] && this.countArr.length <= 2) {
      throw new Error(this.errObj.sel);
    }
    if (this.pseudoArr.includes('pseudoElement')) {
      throw new Error(this.errObj.el);
    } else {
      this.pseudoArr.push('pseudoElement');
    }
    this.elArr = [];
    this.idArr = [];
    this.str += `::${value}`;
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.str += `${selector1.clear()} ${combinator} ${selector2.clear()}`;
    return this;
  }

  clear() {
    const { str } = this;
    this.str = '';
    this.elArr = [];
    this.idArr = [];
    this.pseudoArr = [];
    this.countArr = [];
    return str;
  }
}


const cssSelectorBuilder = {
  element(value) {
    const element = new MSBES();
    return element.element(value);
  },

  id(value) {
    const element = new MSBES();
    return element.id(value);
  },

  class(value) {
    const element = new MSBES();
    return element.class(value);
  },

  attr(value) {
    const element = new MSBES();
    return element.attr(value);
  },

  pseudoClass(value) {
    const element = new MSBES();
    return element.pseudoClass(value);
  },

  pseudoElement(value) {
    const element = new MSBES();
    return element.pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const element = new MSBES();
    return element.combine(selector1, combinator, selector2);
  },

  clear() {
    const element = new MSBES();
    return element.clear();
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
