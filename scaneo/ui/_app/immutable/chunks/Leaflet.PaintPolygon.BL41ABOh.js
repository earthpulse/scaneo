(function(d){var v={};function r(i){if(v[i])return v[i].exports;var o=v[i]={i,l:!1,exports:{}};return d[i].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=d,r.c=v,r.d=function(i,o,h){r.o(i,o)||Object.defineProperty(i,o,{enumerable:!0,get:h})},r.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},r.t=function(i,o){if(1&o&&(i=r(i)),8&o||4&o&&typeof i=="object"&&i&&i.__esModule)return i;var h=Object.create(null);if(r.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:i}),2&o&&typeof i!="string")for(var y in i)r.d(h,y,(function(f){return i[f]}).bind(null,y));return h},r.n=function(i){var o=i&&i.__esModule?function(){return i.default}:function(){return i};return r.d(o,"a",o),o},r.o=function(i,o){return Object.prototype.hasOwnProperty.call(i,o)},r.p="",r(r.s=8)})([function(module,exports,__webpack_require__){var factory;factory=function(){return function(d){var v={};function r(i){if(v[i])return v[i].exports;var o=v[i]={i,l:!1,exports:{}};return d[i].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=d,r.c=v,r.d=function(i,o,h){r.o(i,o)||Object.defineProperty(i,o,{enumerable:!0,get:h})},r.r=function(i){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(i,"__esModule",{value:!0})},r.t=function(i,o){if(1&o&&(i=r(i)),8&o||4&o&&typeof i=="object"&&i&&i.__esModule)return i;var h=Object.create(null);if(r.r(h),Object.defineProperty(h,"default",{enumerable:!0,value:i}),2&o&&typeof i!="string")for(var y in i)r.d(h,y,(function(f){return i[f]}).bind(null,y));return h},r.n=function(i){var o=i&&i.__esModule?function(){return i.default}:function(){return i};return r.d(o,"a",o),o},r.o=function(i,o){return Object.prototype.hasOwnProperty.call(i,o)},r.p="",r(r.s="./main.js")}({"./main.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.difference = exports.xor = exports.intersection = exports.union = undefined;

var _src = __webpack_require__(/*! ./src */ "./src/index.js");

var _src2 = _interopRequireDefault(_src);

var _operation = __webpack_require__(/*! ./src/operation */ "./src/operation.js");

var _operation2 = _interopRequireDefault(_operation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var union = exports.union = function union(geom) {
  for (var _len = arguments.length, moreGeoms = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    moreGeoms[_key - 1] = arguments[_key];
  }

  return (0, _src2.default)(_operation2.default.types.UNION, geom, moreGeoms);
};

var intersection = exports.intersection = function intersection(geom) {
  for (var _len2 = arguments.length, moreGeoms = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    moreGeoms[_key2 - 1] = arguments[_key2];
  }

  return (0, _src2.default)(_operation2.default.types.INTERSECTION, geom, moreGeoms);
};

var xor = exports.xor = function xor(geom) {
  for (var _len3 = arguments.length, moreGeoms = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    moreGeoms[_key3 - 1] = arguments[_key3];
  }

  return (0, _src2.default)(_operation2.default.types.XOR, geom, moreGeoms);
};

var difference = exports.difference = function difference(subjectGeom) {
  for (var _len4 = arguments.length, clippingGeoms = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    clippingGeoms[_key4 - 1] = arguments[_key4];
  }

  return (0, _src2.default)(_operation2.default.types.DIFFERENCE, subjectGeom, clippingGeoms);
};

//# sourceURL=webpack://polygon-clipping/./main.js?`)},"./node_modules/qheap/index.js":function(module,exports,__webpack_require__){eval(`module.exports = __webpack_require__(/*! ./lib/qheap.js */ "./node_modules/qheap/lib/qheap.js");


//# sourceURL=webpack://polygon-clipping/./node_modules/qheap/index.js?`)},"./node_modules/qheap/lib/qheap.js":function(module,exports,__webpack_require__){eval(`/**
 * nodejs heap, classic array implementation
 *
 * Items are stored in a balanced binary tree packed into an array where
 * node is at [i], left child is at [2*i], right at [2*i+1].  Root is at [1].
 *
 * Copyright (C) 2014-2017 Andras Radics
 * Licensed under the Apache License, Version 2.0
 */



module.exports = Heap;

function isBeforeDefault( a, b ) { return a < b; }

function Heap( opts ) {
    opts = opts || {};
    if (typeof opts === 'function') opts = {compar: opts};

    if (opts.compar) {
        this._isBefore = function(a, b) { return opts.compar(a,b) < 0 };
    } else if (opts.comparBefore) {
        this._isBefore = opts.comparBefore;
    } else {
        this._isBefore = isBeforeDefault;
    }
    this.length = 0;
    this._freeSpace = opts.freeSpace ? this._trimArraySize : false;
    this._list = new Array(opts.size || 100);
}

Heap.prototype._list = null;
Heap.prototype._compar = null;
Heap.prototype._isBefore = null;
Heap.prototype._freeSpace = null;
Heap.prototype.length = 0;

/*
 * insert new item at end, and bubble up
 */
Heap.prototype.insert = function Heap_insert( item ) {
    var idx = ++this.length;
    var list = this._list;
    list[idx] = item;

    while (idx > 1) {
        var parentidx = idx >> 1;
        var parentval = list[parentidx];
        if (!(this._isBefore(item, parentval))) break;
        list[idx] = parentval;
        idx = parentidx;
    }
    list[idx] = item;
};
Heap.prototype.append = Heap.prototype.insert;
Heap.prototype.push = Heap.prototype.insert;
Heap.prototype.unshift = Heap.prototype.insert;
Heap.prototype.enqueue = Heap.prototype.insert;

Heap.prototype.peek = function Heap_peek( ) {
    return this.length > 0 ? this._list[1] : undefined;
};

Heap.prototype.size = function Heap_size( ) {
    return this.length;
};

/*
 * return the root, and bubble down last item from top root position
 * when bubbling down, r: root idx, c: child sub-tree root idx, cv: child root value
 * Note that the child at (c == this.length) does not have to be tested in the loop,
 * since its value is the one being bubbled down, so can loop \`while (c < len)\`.
 *
 * Note that a redundant (c < len &&) test before the c vs c+1 compar lets node v0.10
 * run 4x faster; v4, v5 and v6 run faster without it if using _isBefore and not
 * raw _compar.
 *
 * Note that this version runs faster than the two-pass pull-up-new-root then
 * bubble-up-last-value-from-hole approach (except when inserting pre-sorted data).
 */
Heap.prototype.remove = function Heap_remove( ) {
    if (this.length < 1) return undefined;
    var ret = this._list[1];
    var itm = this._list[this.length];

    var r = 1, c = 2, cv;
    var len = this.length;
    while (c < len) {
        cv = this._list[c];
        if (this._isBefore(this._list[c+1], cv)) { cv = this._list[c+1] ; c = c+1 }
        if (!(this._isBefore(cv, itm))) break;
        this._list[r] = cv;
        r = c;
        c = c << 1;
    }
    this._list[len] = 0;
    this.length = --len;
    if (len) this._list[r] = itm;
    if (this._freeSpace) this._freeSpace(this._list, len);

    return ret;
};
Heap.prototype.shift = Heap.prototype.remove;
Heap.prototype.pop = Heap.prototype.remove;
Heap.prototype.dequeue = Heap.prototype.remove;

/*
 * Free unused storage slots in the _list.
 * The default is to unconditionally gc, use the options to omit when not useful.
 */
Heap.prototype.gc = function Heap_gc( options ) {
    if (!options) options = {};

    var minListLength = options.minLength;      // smallest list that will be gc-d
    if (minListLength === undefined) minListLength = 0;

    var minListFull = options.minFull;          // list utilization below which to gc
    if (minListFull === undefined) minListFull = 1.00;

    if (this._list.length >= minListLength && (this.length < this._list.length * minListFull)) {
        // gc reallocates the array to free the unused storage slots at the end
        // use splice to actually free memory; 7% slower than setting .length
        // note: list.slice makes the array slower to insert to??  splice is better
        this._list.splice(this.length+1, this._list.length);
    }
}

Heap.prototype._trimArraySize = function Heap__trimArraySize( list, len ) {
    if (len > 10000 && list.length > 4 * len) {
        // use slice to actually free memory; 7% slower than setting .length
        // note: list.slice makes the array slower to insert to??  splice is better
        list.splice(len+1, list.length);
    }
}

Heap.prototype._check = function Heap__check( ) {
    var isBefore = this._isBefore;
    var _compar = function(a, b) { return isBefore(a, b) ? -1 : 1 };

    var i, p, fail = 0;
    for (i=this.length; i>1; i--) {
        // error if parent should go after child, but not if don\`t care
        p = i >>> 1;
        // swapping the values must change their ordering, otherwise the
        // comparison is a tie.  (Ie, consider the ordering func (a <= b)
        // that for some values reports both that a < b and b < a.)
        if (_compar(this._list[p], this._list[i]) > 0 &&
            _compar(this._list[i], this._list[p]) < 0)
        {
            fail = i;
        }
    }
    if (fail) console.log("failed at", (fail >>> 1), fail);
    return !fail;
}

// optimize access
Heap.prototype = Heap.prototype;


//# sourceURL=webpack://polygon-clipping/./node_modules/qheap/lib/qheap.js?`)},"./node_modules/splaytree/index.js":function(module,__webpack_exports__,__webpack_require__){eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Tree; });
/* follows "An implementation of top-down splaying"
 * by D. Sleator <sleator@cs.cmu.edu> March 1992
 */

/**
 * @typedef {*} Key
 */


/**
 * @typedef {*} Value
 */


/**
 * @typedef {function(node:Node):void} Visitor
 */


/**
 * @typedef {function(a:Key, b:Key):number} Comparator
 */


/**
 * @param {function(node:Node):string} NodePrinter
 */


/**
 * @typedef {Object}  Node
 * @property {Key}    Key
 * @property {Value=} data
 * @property {Node}   left
 * @property {Node}   right
 */

class Node {

  constructor (key, data) {
    this.key    = key;
    this.data   = data;
    this.left   = null;
    this.right  = null;
  }
}

function DEFAULT_COMPARE (a, b) { return a > b ? 1 : a < b ? -1 : 0; }


/**
 * Simple top down splay, not requiring i to be in the tree t.
 * @param {Key} i
 * @param {Node?} t
 * @param {Comparator} comparator
 */
function splay (i, t, comparator) {
  if (t === null) return t;
  let l, r, y;
  const N = new Node();
  l = r = N;

  while (true) {
    const cmp = comparator(i, t.key);
    //if (i < t.key) {
    if (cmp < 0) {
      if (t.left === null) break;
      //if (i < t.left.key) {
      if (comparator(i, t.left.key) < 0) {
        y = t.left;                           /* rotate right */
        t.left = y.right;
        y.right = t;
        t = y;
        if (t.left === null) break;
      }
      r.left = t;                               /* link right */
      r = t;
      t = t.left;
    //} else if (i > t.key) {
    } else if (cmp > 0) {
      if (t.right === null) break;
      //if (i > t.right.key) {
      if (comparator(i, t.right.key) > 0) {
        y = t.right;                          /* rotate left */
        t.right = y.left;
        y.left = t;
        t = y;
        if (t.right === null) break;
      }
      l.right = t;                              /* link left */
      l = t;
      t = t.right;
    } else {
      break;
    }
  }
  /* assemble */
  l.right = t.left;
  r.left = t.right;
  t.left = N.right;
  t.right = N.left;
  return t;
}


/**
 * @param  {Key}        i
 * @param  {Value}      data
 * @param  {Comparator} comparator
 * @param  {Tree}       tree
 * @return {Node}      root
 */
function insert (i, data, t, comparator, tree) {
  const node = new Node(i, data);

  tree._size++;

  if (t === null) {
    node.left = node.right = null;
    return node;
  }

  t = splay(i, t, comparator);
  const cmp = comparator(i, t.key);
  if (cmp < 0) {
    node.left = t.left;
    node.right = t;
    t.left = null;
  } else if (cmp >= 0) {
    node.right = t.right;
    node.left = t;
    t.right = null;
  }
  return node;
}


/**
 * Insert i into the tree t, unless it's already there.
 * @param  {Key}        i
 * @param  {Value}      data
 * @param  {Comparator} comparator
 * @param  {Tree}       tree
 * @return {Node}       root
 */
function add (i, data, t, comparator, tree) {
  const node = new Node(i, data);

  if (t === null) {
    node.left = node.right = null;
    tree._size++;
    return node;
  }

  t = splay(i, t, comparator);
  const cmp = comparator(i, t.key);
  if (cmp === 0) return t;
  else {
    if (cmp < 0) {
      node.left = t.left;
      node.right = t;
      t.left = null;
    } else if (cmp > 0) {
      node.right = t.right;
      node.left = t;
      t.right = null;
    }
    tree._size++;
    return node;
  }
}


/**
 * Deletes i from the tree if it's there
 * @param {Key}        i
 * @param {Tree}       tree
 * @param {Comparator} comparator
 * @param {Tree}       tree
 * @return {Node}      new root
 */
function remove (i, t, comparator, tree) {
  let x;
  if (t === null) return null;
  t = splay(i, t, comparator);
  if (i === t.key) {               /* found it */
    if (t.left === null) {
      x = t.right;
    } else {
      x = splay(i, t.left, comparator);
      x.right = t.right;
    }
    tree._size--;
    return x;
  }
  return t;                         /* It wasn't there */
}


function split (key, v, comparator) {
  let left, right;
  if (v === null) {
    left = right = null;
  } else {
    v = splay(key, v, comparator);

    const cmp = comparator(v.key, key);
    if (cmp === 0) {
      left  = v.left;
      right = v.right;
    } else if (cmp < 0) {
      right   = v.right;
      v.right = null;
      left    = v;
    } else {
      left   = v.left;
      v.left = null;
      right  = v;
    }
  }
  return { left, right };
}


function merge (left, right, comparator) {
  if (right === null) return left;
  if (left  === null) return right;

  right = splay(left.key, right, comparator);
  right.left = left;
  return right;
}


/**
 * Prints level of the tree
 * @param  {Node}                        root
 * @param  {String}                      prefix
 * @param  {Boolean}                     isTail
 * @param  {Array<string>}               out
 * @param  {Function(node:Node):String}  printNode
 */
function printRow (root, prefix, isTail, out, printNode) {
  if (root) {
    out(\`\${ prefix }\${ isTail ? '└── ' : '├── ' }\${ printNode(root) }\\n\`);
    const indent = prefix + (isTail ? '    ' : '│   ');
    if (root.left)  printRow(root.left,  indent, false, out, printNode);
    if (root.right) printRow(root.right, indent, true,  out, printNode);
  }
}


class Tree {

  constructor (comparator = DEFAULT_COMPARE) {
    this._comparator = comparator;
    this._root = null;
    this._size = 0;
  }


  /**
   * Inserts a key, allows duplicates
   * @param  {Key}    key
   * @param  {Value=} data
   * @return {Node|null}
   */
  insert (key, data) {
    return this._root = insert(key, data, this._root, this._comparator, this);
  }


  /**
   * Adds a key, if it is not present in the tree
   * @param  {Key}    key
   * @param  {Value=} data
   * @return {Node|null}
   */
  add (key, data) {
    return this._root = add(key, data, this._root, this._comparator, this);
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  remove (key) {
    this._root = remove(key, this._root, this._comparator, this);
  }


  /**
   * Removes and returns the node with smallest key
   * @return {?Node}
   */
  pop () {
    let node = this._root;
    if (node) {
      while (node.left) node = node.left;
      this._root = splay(node.key,  this._root, this._comparator);
      this._root = remove(node.key, this._root, this._comparator, this);
      return { key: node.key, data: node.data };
    }
    return null;
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  findStatic (key) {
    let current   = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0)    return current;
      else if (cmp < 0) current = current.left;
      else              current = current.right;
    }
    return null;
  }


  /**
   * @param  {Key} key
   * @return {Node|null}
   */
  find (key) {
    if (this._root) {
      this._root = splay(key, this._root, this._comparator);
      if (this._comparator(key, this._root.key) !== 0) return null;
    }
    return this._root;
  }


  /**
   * @param  {Key} key
   * @return {Boolean}
   */
  contains (key) {
    let current   = this._root;
    const compare = this._comparator;
    while (current) {
      const cmp = compare(key, current.key);
      if (cmp === 0)    return true;
      else if (cmp < 0) current = current.left;
      else              current = current.right;
    }
    return false;
  }


  /**
   * @param  {Visitor} visitor
   * @param  {*=}      ctx
   * @return {SplayTree}
   */
  forEach (visitor, ctx) {
    let current = this._root;
    const Q = [];  /* Initialize stack s */
    let done = false;

    while (!done) {
      if (current !==  null) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length !== 0) {
          current = Q.pop();
          visitor.call(ctx, current);

          current = current.right;
        } else done = true;
      }
    }
    return this;
  }


  /**
   * Walk key range from \`low\` to \`high\`. Stops if \`fn\` returns a value.
   * @param  {Key}      low
   * @param  {Key}      high
   * @param  {Function} fn
   * @param  {*?}       ctx
   * @return {SplayTree}
   */
  range (low, high, fn, ctx) {
    const Q = [];
    const compare = this._comparator;
    let node = this._root, cmp;

    while (Q.length !== 0 || node) {
      if (node) {
        Q.push(node);
        node = node.left;
      } else {
        node = Q.pop();
        cmp = compare(node.key, high);
        if (cmp > 0) {
          break;
        } else if (compare(node.key, low) >= 0) {
          if (fn.call(ctx, node)) return this; // stop if smth is returned
        }
        node = node.right;
      }
    }
    return this;
  }


  /**
   * Returns array of keys
   * @return {Array<Key>}
   */
  keys () {
    const keys = [];
    this.forEach(({ key }) => keys.push(key));
    return keys;
  }


  /**
   * Returns array of all the data in the nodes
   * @return {Array<Value>}
   */
  values () {
    const values = [];
    this.forEach(({ data }) => values.push(data));
    return values;
  }


  /**
   * @return {Key|null}
   */
  min() {
    if (this._root) return this.minNode(this._root).key;
    return null;
  }


  /**
   * @return {Key|null}
   */
  max() {
    if (this._root) return this.maxNode(this._root).key;
    return null;
  }


  /**
   * @return {Node|null}
   */
  minNode(t = this._root) {
    if (t) while (t.left) t = t.left;
    return t;
  }


  /**
   * @return {Node|null}
   */
  maxNode(t = this._root) {
    if (t) while (t.right) t = t.right;
    return t;
  }


  /**
   * Returns node at given index
   * @param  {number} index
   * @return {?Node}
   */
  at (index) {
    let current = this._root, done = false, i = 0;
    const Q = [];

    while (!done) {
      if (current) {
        Q.push(current);
        current = current.left;
      } else {
        if (Q.length > 0) {
          current = Q.pop();
          if (i === index) return current;
          i++;
          current = current.right;
        } else done = true;
      }
    }
    return null;
  }


  /**
   * @param  {Node}   d
   * @return {Node|null}
   */
  next (d) {
    let root = this._root;
    let successor = null;

    if (d.right) {
      successor = d.right;
      while (successor.left) successor = successor.left;
      return successor;
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break;
      else if (cmp < 0) {
        successor = root;
        root = root.left;
      } else root = root.right;
    }

    return successor;
  }


  /**
   * @param  {Node} d
   * @return {Node|null}
   */
  prev (d) {
    let root = this._root;
    let predecessor = null;

    if (d.left !== null) {
      predecessor = d.left;
      while (predecessor.right) predecessor = predecessor.right;
      return predecessor;
    }

    const comparator = this._comparator;
    while (root) {
      const cmp = comparator(d.key, root.key);
      if (cmp === 0) break;
      else if (cmp < 0) root = root.left;
      else {
        predecessor = root;
        root = root.right;
      }
    }
    return predecessor;
  }


  /**
   * @return {SplayTree}
   */
  clear() {
    this._root = null;
    this._size = 0;
    return this;
  }


  /**
   * @return {NodeList}
   */
  toList() {
    return toList(this._root);
  }


  /**
   * Bulk-load items. Both array have to be same size
   * @param  {Array<Key>}    keys
   * @param  {Array<Value>}  [values]
   * @param  {Boolean}       [presort=false] Pre-sort keys and values, using
   *                                         tree's comparator. Sorting is done
   *                                         in-place
   * @return {AVLTree}
   */
  load (keys = [], values = [], presort = false) {
    let size = keys.length;
    const comparator = this._comparator;

    // sort if needed
    if (presort) sort(keys, values, 0, size - 1, comparator);

    if (this._root === null) { // empty tree
      this._root = loadRecursive(this._root, keys, values, 0, size);
      this._size = size;
    } else { // that re-builds the whole tree from two in-order traversals
      const mergedList = mergeLists(this.toList(), createList(keys, values), comparator);
      size = this._size + size;
      this._root = sortedListToBST({ head: mergedList }, 0, size);
    }
    return this;
  }


  /**
   * @return {Boolean}
   */
  isEmpty() { return this._root === null; }

  get size () { return this._size; }


  /**
   * @param  {NodePrinter=} printNode
   * @return {String}
   */
  toString (printNode = (n) => n.key) {
    const out = [];
    printRow(this._root, '', true, (v) => out.push(v), printNode);
    return out.join('');
  }


  update (key, newKey, newData) {
    const comparator = this._comparator;
    let { left, right } = split(key, this._root, comparator);
    this._size--;
    if (comparator(key, newKey) < 0) {
      right = insert(newKey, newData, right, comparator, this);
    } else {
      left = insert(newKey, newData, left, comparator, this);
    }
    this._root = merge(left, right, comparator);
  }


  split(key) {
    return split(key, this._root, this._comparator);
  }
}


function loadRecursive (parent, keys, values, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const key    = keys[middle];
    const data   = values[middle];
    const node   = { key, data, parent };
    node.left    = loadRecursive(node, keys, values, start, middle);
    node.right   = loadRecursive(node, keys, values, middle + 1, end);
    return node;
  }
  return null;
}


function createList(keys, values) {
  const head = { next: null };
  let p = head;
  for (let i = 0; i < keys.length; i++) {
    p = p.next = { key: keys[i], data: values[i] };
  }
  p.next = null;
  return head.next;
}


function toList (root) {
  var current = root;
  var Q = [], done = false;

  const head = { next: null };
  let p = head;

  while (!done) {
    if (current) {
      Q.push(current);
      current = current.left;
    } else {
      if (Q.length > 0) {
        current = p = p.next = Q.pop();
        current = current.right;
      } else done = true;
    }
  }
  p.next = null; // that'll work even if the tree was empty
  return head.next;
}


function sortedListToBST(list, start, end) {
  const size = end - start;
  if (size > 0) {
    const middle = start + Math.floor(size / 2);
    const left = sortedListToBST(list, start, middle);

    const root = list.head;
    root.left = left;

    list.head = list.head.next;

    root.right = sortedListToBST(list, middle + 1, end);
    return root;
  }
  return null;
}


function mergeLists (l1, l2, compare = (a, b) => a - b) {
  const head = {}; // dummy
  let p = head;

  let p1 = l1;
  let p2 = l2;

  while (p1 !== null && p2 !== null) {
    if (compare(p1.key, p2.key) < 0) {
      p.next = p1;
      p1 = p1.next;
    } else {
      p.next = p2;
      p2 = p2.next;
    }
    p = p.next;
  }

  if (p1 !== null)      p.next = p1;
  else if (p2 !== null) p.next = p2;

  return head.next;
}


function sort(keys, values, left, right, compare) {
  if (left >= right) return;

  const pivot = keys[(left + right) >> 1];
  let i = left - 1;
  let j = right + 1;

  while (true) {
    do i++; while (compare(keys[i], pivot) < 0);
    do j--; while (compare(keys[j], pivot) > 0);
    if (i >= j) break;

    let tmp = keys[i];
    keys[i] = keys[j];
    keys[j] = tmp;

    tmp = values[i];
    values[i] = values[j];
    values[j] = tmp;
  }

  sort(keys, values,  left,     j, compare);
  sort(keys, values, j + 1, right, compare);
}


//# sourceURL=webpack://polygon-clipping/./node_modules/splaytree/index.js?`)},"./src/bbox.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUniqueCorners = exports.getBboxOverlap = exports.doBboxesOverlap = exports.isInBbox = undefined;

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

/**
 * A bounding box has the format:
 *
 *  { ll: { x: xmin, y: ymin }, ur: { x: xmax, y: ymax } }
 *
 */

var isInBbox = exports.isInBbox = function isInBbox(bbox, point) {
  var xmin = bbox.ll.x;
  var ymin = bbox.ll.y;
  var xmax = bbox.ur.x;
  var ymax = bbox.ur.y;
  var xpt = point.x;
  var ypt = point.y;
  return (0, _flp.cmp)(xmin, xpt) <= 0 && (0, _flp.cmp)(xpt, xmax) <= 0 && (0, _flp.cmp)(ymin, ypt) <= 0 && (0, _flp.cmp)(ypt, ymax) <= 0;
};

var doBboxesOverlap = exports.doBboxesOverlap = function doBboxesOverlap(b1, b2) {
  return !((0, _flp.cmp)(b2.ur.x, b1.ll.x) < 0 || (0, _flp.cmp)(b1.ur.x, b2.ll.x) < 0 || (0, _flp.cmp)(b2.ur.y, b1.ll.y) < 0 || (0, _flp.cmp)(b1.ur.y, b2.ll.y) < 0);
};

/* Returns either null, or a bbox (aka an ordered pair of points)
 * If there is only one point of overlap, a bbox with identical points
 * will be returned */
var getBboxOverlap = exports.getBboxOverlap = function getBboxOverlap(b1, b2) {
  if (!doBboxesOverlap(b1, b2)) return null;

  // find the middle two X values
  var lowerX = b1.ll.x < b2.ll.x ? b2.ll.x : b1.ll.x;
  var upperX = b1.ur.x < b2.ur.x ? b1.ur.x : b2.ur.x;

  // find the middle two Y values
  var lowerY = b1.ll.y < b2.ll.y ? b2.ll.y : b1.ll.y;
  var upperY = b1.ur.y < b2.ur.y ? b1.ur.y : b2.ur.y;

  // put those middle values together to get the overlap
  return { ll: { x: lowerX, y: lowerY }, ur: { x: upperX, y: upperY } };
};

/* Returns a list of unique corners.
 * Will contain one, two or four points */
var getUniqueCorners = exports.getUniqueCorners = function getUniqueCorners(bbox) {
  var xmin = bbox.ll.x;
  var ymin = bbox.ll.y;
  var xmax = bbox.ur.x;
  var ymax = bbox.ur.y;
  var xEq = (0, _flp.cmp)(xmin, xmax) === 0;
  var yEq = (0, _flp.cmp)(ymin, ymax) === 0;
  if (xEq && yEq) return [{ x: xmin, y: ymin }];
  if (xEq) return [{ x: xmin, y: ymin }, { x: xmin, y: ymax }];
  if (yEq) return [{ x: xmin, y: ymin }, { x: xmax, y: ymin }];
  return [{ x: xmin, y: ymin }, { x: xmin, y: ymax }, { x: xmax, y: ymin }, { x: xmax, y: ymax }];
};

//# sourceURL=webpack://polygon-clipping/./src/bbox.js?`)},"./src/clean-input.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorOnSelfIntersectingRings = exports.cleanRing = exports.cleanMultiPoly = exports.forceMultiPoly = exports.pointsAsObjects = undefined;

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

var _vector = __webpack_require__(/*! ./vector */ "./src/vector.js");

/* Given input geometry as a standard array-of-arrays geojson-style
 * geometry, return one that uses objects as points, for better perf */
var pointsAsObjects = exports.pointsAsObjects = function pointsAsObjects(geom) {
  // we can handle well-formed multipolys and polys
  var output = [];
  if (!Array.isArray(geom)) {
    throw new Error('Input is not a Polygon or MultiPolygon');
  }
  for (var i = 0, iMax = geom.length; i < iMax; i++) {
    if (!Array.isArray(geom[i])) {
      throw new Error('Input is not a Polygon or MultiPolygon');
    }
    output.push([]);
    for (var j = 0, jMax = geom[i].length; j < jMax; j++) {
      if (!Array.isArray(geom[i][j])) {
        throw new Error('Input is not a Polygon or MultiPolygon');
      }
      if (geom[i][j].length === 2) {
        output[i].push({ x: geom[i][j][0], y: geom[i][j][1] });
        continue;
      }
      output[i].push([]);
      for (var k = 0, kMax = geom[i][j].length; k < kMax; k++) {
        if (!Array.isArray(geom[i][j][k]) || geom[i][j][k].length !== 2) {
          throw new Error('Input is not a Polygon or MultiPolygon');
        }
        output[i][j].push({ x: geom[i][j][k][0], y: geom[i][j][k][1] });
      }
    }
  }
  return output;
};

/* WARN: input modified directly */
var forceMultiPoly = exports.forceMultiPoly = function forceMultiPoly(geom) {
  if (Array.isArray(geom)) {
    if (geom.length === 0) return; // allow empty multipolys

    if (Array.isArray(geom[0])) {
      if (Array.isArray(geom[0][0])) {
        if (typeof geom[0][0][0].x === 'number' && typeof geom[0][0][0].y === 'number') {
          // multipolygon
          return;
        }
      }
      if (typeof geom[0][0].x === 'number' && typeof geom[0][0].y === 'number') {
        // polygon
        geom.unshift(geom.splice(0));
        return;
      }
    }
  }
  throw new Error('Unrecognized input - not a polygon nor multipolygon');
};

/* WARN: input modified directly */
var cleanMultiPoly = exports.cleanMultiPoly = function cleanMultiPoly(multipoly) {
  var i = 0;
  while (i < multipoly.length) {
    var poly = multipoly[i];
    if (poly.length === 0) {
      multipoly.splice(i, 1);
      continue;
    }

    var exteriorRing = poly[0];
    cleanRing(exteriorRing);
    // poly is dropped if exteriorRing is degenerate
    if (exteriorRing.length === 0) {
      multipoly.splice(i, 1);
      continue;
    }

    var j = 1;
    while (j < poly.length) {
      var interiorRing = poly[j];
      cleanRing(interiorRing);
      if (interiorRing.length === 0) poly.splice(j, 1);else j++;
    }

    i++;
  }
};

/* Clean ring:
 *  - remove duplicate points
 *  - remove colinear points
 *  - remove rings with no area (less than 3 distinct points)
 *  - close rings (last point should equal first)
 *
 * WARN: input modified directly */
var cleanRing = exports.cleanRing = function cleanRing(ring) {
  if (ring.length === 0) return;
  if ((0, _flp.cmpPoints)(ring[0], ring[ring.length - 1]) !== 0) {
    ring.push({ x: ring[0].x, y: ring[0].y }); // copy by value
  }

  var isPointUncessary = function isPointUncessary(prevPt, pt, nextPt) {
    return (0, _flp.cmpPoints)(prevPt, pt) === 0 || (0, _flp.cmpPoints)(pt, nextPt) === 0 || (0, _vector.compareVectorAngles)(pt, prevPt, nextPt) === 0;
  };

  var i = 1;
  while (i < ring.length - 1) {
    if (isPointUncessary(ring[i - 1], ring[i], ring[i + 1])) ring.splice(i, 1);else i++;
  }

  // check the first/last point as well
  while (ring.length > 2) {
    if (!isPointUncessary(ring[ring.length - 2], ring[0], ring[1])) break;
    ring.splice(0, 1);
    ring.splice(ring.length - 1, 1);
    ring.push(ring[0]);
  }

  // if our ring has less than 3 distinct points now (so is degenerate)
  // shrink it down to the empty array to communicate to our caller to
  // drop it
  while (ring.length < 4 && ring.length > 0) {
    ring.pop();
  }
};

/* Scan the already-linked events of the segments for any
 * self-intersecting input rings (which are not supported) */
var errorOnSelfIntersectingRings = exports.errorOnSelfIntersectingRings = function errorOnSelfIntersectingRings(segments) {
  var _loop = function _loop(i, iMax) {
    var seg = segments[i];

    var evt = seg.flowIntoSE;

    if (evt.linkedEvents.length > 2) {
      var evtsThisRing = evt.linkedEvents.filter(function (other) {
        return other.segment.ringIn === seg.ringIn;
      });
      if (evtsThisRing.length > 2) {
        evtsThisRing.sort(evt.getLeftmostComparator(evt.otherSE));
        var leftMostEvt = evtsThisRing[1]; // skip ourself
        var rightMostEvt = evtsThisRing[evtsThisRing.length - 1];

        // both the segment on our immediate left and right will flow
        // 'out' in intersection point was a touch and not a crossing
        if (leftMostEvt.segment.flowIntoSE === leftMostEvt || rightMostEvt.segment.flowIntoSE === rightMostEvt) {
          throw new Error('Self-intersecting, crossing input ring found at ' + ('[' + evt.point.x + ', ' + evt.point.y + ']'));
        }
      }
    }
  };

  for (var i = 0, iMax = segments.length; i < iMax; i++) {
    _loop(i, iMax);
  }
};

//# sourceURL=webpack://polygon-clipping/./src/clean-input.js?`)},"./src/flp.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Javascript doesn't do integer math. Everything is
 * floating point with percision Number.EPSILON.
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
 */

// IE Polyfill
if (Number.EPSILON === undefined) Number.EPSILON = Math.pow(2, -52);

var EPSILON_SQ = Number.EPSILON * Number.EPSILON;

/* FLP comparator */
var cmp = exports.cmp = function cmp(a, b) {
  // check if they're both 0
  if (-Number.EPSILON < a && a < Number.EPSILON) {
    if (-Number.EPSILON < b && b < Number.EPSILON) {
      return 0;
    }
  }

  // check if they're flp equal
  if ((a - b) * (a - b) < EPSILON_SQ * a * b) {
    return 0;
  }

  // normal comparison
  return a < b ? -1 : 1;
};

/* FLP point comparator, favors point encountered first by sweep line */
var cmpPoints = exports.cmpPoints = function cmpPoints(aPt, bPt) {
  // fist compare X, then compare Y

  var a = aPt.x;
  var b = bPt.x;

  // inlined version of cmp() for performance boost
  if (a <= -Number.EPSILON || Number.EPSILON <= a || b <= -Number.EPSILON || Number.EPSILON <= b) {
    var diff = a - b;
    if (diff * diff >= EPSILON_SQ * a * b) {
      return a < b ? -1 : 1;
    }
  }

  a = aPt.y;
  b = bPt.y;

  // inlined version of cmp() for performance boost
  if (a <= -Number.EPSILON || Number.EPSILON <= a || b <= -Number.EPSILON || Number.EPSILON <= b) {
    var _diff = a - b;
    if (_diff * _diff >= EPSILON_SQ * a * b) {
      return a < b ? -1 : 1;
    }
  }

  // they're the same
  return 0;
};

//# sourceURL=webpack://polygon-clipping/./src/flp.js?`)},"./src/geom-in.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPoly = exports.Poly = exports.Ring = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _segment = __webpack_require__(/*! ./segment */ "./src/segment.js");

var _segment2 = _interopRequireDefault(_segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Give rings unique ID's to get consistent sorting of segments
// and sweep events when all else is identical
var ringId = 0;

var Ring = exports.Ring = function () {
  function Ring(geomRing, poly) {
    _classCallCheck(this, Ring);

    this.id = ringId++;
    this.poly = poly;
    this.segments = [];

    for (var i = 1, iMax = geomRing.length; i < iMax; i++) {
      this.segments.push(new _segment2.default(geomRing[i - 1], geomRing[i], this));
    }
  }

  _createClass(Ring, [{
    key: 'getSweepEvents',
    value: function getSweepEvents() {
      var sweepEvents = [];
      for (var i = 0, iMax = this.segments.length; i < iMax; i++) {
        var segment = this.segments[i];
        sweepEvents.push(segment.leftSE);
        sweepEvents.push(segment.rightSE);
      }
      return sweepEvents;
    }
  }, {
    key: 'isValid',


    /* Given a segment on this rings with these relationships to other rings,
     * is it a valid segment of the ring's poly? */
    value: function isValid(ringsSameSLER, ringsDiffSLER, ringsInsideOf) {
      var exterior = this.poly.exteriorRing;
      var interiors = this.poly.interiorRings;

      if (this === exterior) {
        // exterior segments inside or interior, nope
        for (var i = 0, iMax = ringsInsideOf.length; i < iMax; i++) {
          if (interiors.includes(ringsInsideOf[i])) return false;
        }

        // overlap with an interior of same SWL orientatio, nope
        for (var _i = 0, _iMax = ringsSameSLER.length; _i < _iMax; _i++) {
          if (interiors.includes(ringsSameSLER[_i])) return false;
        }

        return true;
      }

      // interior rings that aren't inside the exterior nor
      // overlapping with different SWE
      if (!ringsInsideOf.includes(exterior)) {
        if (!ringsDiffSLER.includes(exterior)) return false;
      }

      // interior rings inside another interior, nope
      for (var _i2 = 0, _iMax2 = ringsInsideOf.length; _i2 < _iMax2; _i2++) {
        if (interiors.includes(ringsInsideOf[_i2])) return false;
      }

      // overlapping interiors with different sweep line orientation, nope
      for (var _i3 = 0, _iMax3 = ringsDiffSLER.length; _i3 < _iMax3; _i3++) {
        if (interiors.includes(ringsDiffSLER[_i3])) return false;
      }

      return true;
    }
  }, {
    key: 'isExterior',
    get: function get() {
      return this.poly.exteriorRing === this;
    }
  }, {
    key: 'isInterior',
    get: function get() {
      return this.poly.exteriorRing !== this;
    }
  }]);

  return Ring;
}();

var Poly = exports.Poly = function () {
  function Poly(geomPoly, multiPoly) {
    _classCallCheck(this, Poly);

    this.exteriorRing = new Ring(geomPoly[0], this);
    this.interiorRings = [];
    for (var i = 1, iMax = geomPoly.length; i < iMax; i++) {
      this.interiorRings.push(new Ring(geomPoly[i], this));
    }
    this.multiPoly = multiPoly;
  }

  _createClass(Poly, [{
    key: 'getSweepEvents',
    value: function getSweepEvents() {
      var sweepEvents = this.exteriorRing.getSweepEvents();
      for (var i = 0, iMax = this.interiorRings.length; i < iMax; i++) {
        var ringSweepEvents = this.interiorRings[i].getSweepEvents();
        for (var j = 0, jMax = ringSweepEvents.length; j < jMax; j++) {
          sweepEvents.push(ringSweepEvents[j]);
        }
      }
      return sweepEvents;
    }

    /* Given a segment with these rings, is that segment inside this polygon? */

  }, {
    key: 'isInside',
    value: function isInside(ringsOnEdgeOf, ringsInsideOf) {
      // if we're on an edge, we can't be inside
      for (var i = 0, iMax = ringsOnEdgeOf.length; i < iMax; i++) {
        if (ringsOnEdgeOf[i].poly === this) return false;
      }

      // we need to be inside the exterior, and nothing else
      var isInsideExterior = false;
      for (var _i4 = 0, _iMax4 = ringsInsideOf.length; _i4 < _iMax4; _i4++) {
        var ring = ringsInsideOf[_i4];
        if (ring.poly !== this) continue;
        if (ring.isInterior) return false;
        isInsideExterior = true;
      }
      return isInsideExterior;
    }
  }]);

  return Poly;
}();

var MultiPoly = exports.MultiPoly = function () {
  function MultiPoly(geomMultiPoly) {
    _classCallCheck(this, MultiPoly);

    this.polys = [];
    for (var i = 0, iMax = geomMultiPoly.length; i < iMax; i++) {
      this.polys.push(new Poly(geomMultiPoly[i], this));
    }
    this.isSubject = false;
  }

  _createClass(MultiPoly, [{
    key: 'markAsSubject',
    value: function markAsSubject() {
      this.isSubject = true;
    }
  }, {
    key: 'getSweepEvents',
    value: function getSweepEvents() {
      var sweepEvents = [];
      for (var i = 0, iMax = this.polys.length; i < iMax; i++) {
        var polySweepEvents = this.polys[i].getSweepEvents();
        for (var j = 0, jMax = polySweepEvents.length; j < jMax; j++) {
          sweepEvents.push(polySweepEvents[j]);
        }
      }
      return sweepEvents;
    }
  }]);

  return MultiPoly;
}();

//# sourceURL=webpack://polygon-clipping/./src/geom-in.js?`)},"./src/geom-out.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiPoly = exports.Poly = exports.Ring = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vector = __webpack_require__(/*! ./vector */ "./src/vector.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ring = exports.Ring = function () {
  _createClass(Ring, null, [{
    key: 'factory',

    /* Given the segments from the sweep line pass, compute & return a series
     * of closed rings from all the segments marked to be part of the result */
    value: function factory(allSegments) {
      var ringsOut = [];

      for (var i = 0, iMax = allSegments.length; i < iMax; i++) {
        var segment = allSegments[i];
        if (!segment.isInResult || segment.ringOut) continue;

        var prevEvent = null;
        var event = segment.leftSE;
        var nextEvent = segment.rightSE;
        var events = [event];

        var startingLE = event.linkedEvents;
        var intersectionLEs = [];

        /* Walk the chain of linked events to form a closed ring */
        while (true) {
          prevEvent = event;
          event = nextEvent;
          events.push(event);

          /* Is the ring complete? */
          if (event.linkedEvents === startingLE) break;

          while (true) {
            var availableLEs = event.getAvailableLinkedEvents();

            /* Did we hit a dead end? This shouldn't happen. Indicates some earlier
             * part of the algorithm malfunctioned... please file a bug report. */
            if (availableLEs.length === 0) {
              var firstPt = events[0].point;
              var lastPt = events[events.length - 1].point;
              throw new Error('Unable to complete output ring starting at [' + firstPt.x + ',' + (' ' + firstPt.y + ']. Last matching segment found ends at ') + (' [' + lastPt.x + ', ' + lastPt.y + '].'));
            }

            /* Only one way to go, so cotinue on the path */
            if (availableLEs.length === 1) {
              nextEvent = availableLEs[0].otherSE;
              break;
            }

            /* We must have an intersection. Check for a completed loop */
            var indexLE = null;
            for (var j = 0, jMax = intersectionLEs.length; j < jMax; j++) {
              if (intersectionLEs[j].linkedEvents === event.linkedEvents) {
                indexLE = j;
                break;
              }
            }
            /* Found a completed loop. Cut that off and make a ring */
            if (indexLE !== null) {
              var intersectionLE = intersectionLEs.splice(indexLE)[0];
              var ringEvents = events.splice(intersectionLE.index);
              ringEvents.unshift(ringEvents[0].otherSE);
              ringsOut.push(new Ring(ringEvents.reverse()));
              continue;
            }
            /* register the intersection */
            intersectionLEs.push({
              index: events.length,
              linkedEvents: event.linkedEvents
            });
            /* Choose the left-most option to continue the walk */
            var comparator = event.getLeftmostComparator(prevEvent);
            nextEvent = availableLEs.sort(comparator)[0].otherSE;
            break;
          }
        }

        ringsOut.push(new Ring(events));
      }
      return ringsOut;
    }
  }]);

  function Ring(events) {
    _classCallCheck(this, Ring);

    this.events = events;
    for (var i = 0, iMax = events.length; i < iMax; i++) {
      events[i].segment.registerRingOut(this);
    }
    this.poly = null;
    this._clearCache();
  }

  _createClass(Ring, [{
    key: 'registerPoly',
    value: function registerPoly(poly) {
      this.poly = poly;
    }
  }, {
    key: 'getGeom',
    value: function getGeom() {
      // Remove superfluous points (ie extra points along a straight line),
      var points = [[this.events[0].point.x, this.events[0].point.y]];
      for (var i = 1, iMax = this.events.length - 1; i < iMax; i++) {
        var _prevPt = this.events[i - 1].point;
        var _pt = this.events[i].point;
        var _nextPt = this.events[i + 1].point;
        if ((0, _vector.compareVectorAngles)(_pt, _prevPt, _nextPt) === 0) continue;
        points.push([_pt.x, _pt.y]);
      }

      // check if the starting point is necessary
      var prevPt = this.events[this.events.length - 2].point;
      var pt = this.events[0].point;
      var nextPt = this.events[1].point;
      if ((0, _vector.compareVectorAngles)(pt, prevPt, nextPt) === 0) points.shift();

      // ring was all (within rounding error of angle calc) colinear points
      if (points.length === 0) return null;

      points.push(points[0]);
      return this.isExteriorRing ? points : points.reverse();
    }
  }, {
    key: '_clearCache',
    value: function _clearCache() {
      this._cache = {};
    }
  }, {
    key: '_getCached',
    value: function _getCached(propName, calcMethod) {
      // if this._cache[something] isn't set, fill it with this._something()
      if (this._cache[propName] === undefined) {
        this._cache[propName] = this['_' + propName].bind(this)();
      }
      return this._cache[propName];
    }
  }, {
    key: '_isExteriorRing',
    value: function _isExteriorRing() {
      if (!this.enclosingRing) return true;
      if (!this.enclosingRing.enclosingRing) return false;
      // an island in hole is a whole new polygon
      return this.enclosingRing.enclosingRing.isExteriorRing;
    }

    /* Returns the ring that encloses this one, if any */

  }, {
    key: '_enclosingRing',
    value: function _enclosingRing() {
      var prevSeg = this.events[0].segment.prevInResult;
      while (prevSeg && prevSeg.ringOut === this) {
        prevSeg = prevSeg.prevInResult;
      }var prevPrevSeg = prevSeg ? prevSeg.prevInResult : null;

      while (true) {
        // no segment found, thus no ring can enclose us
        if (!prevSeg) return null;

        // no segments below prev segment found, thus the ring of the prev
        // segment must loop back around and enclose us
        if (!prevPrevSeg) return prevSeg.ringOut;

        // if the two segments are of different rings, the ring of the prev
        // segment must either loop around us or the ring of the prev prev
        // seg, which would make us and the ring of the prev peers
        if (prevPrevSeg.ringOut !== prevSeg.ringOut) {
          if (prevPrevSeg.ringOut.enclosingRing !== prevSeg.ringOut) {
            return prevSeg.ringOut;
          } else return prevSeg.ringOut.enclosingRing;
        }

        // two segments are from the same ring, so this was a penisula
        // of that ring. iterate downward, keep searching
        prevSeg = prevPrevSeg.prevInResult;
        prevPrevSeg = prevSeg ? prevSeg.prevInResult : null;
      }
    }
  }, {
    key: 'enclosingRing',
    get: function get() {
      return this._getCached('enclosingRing');
    }
  }, {
    key: 'isExteriorRing',
    get: function get() {
      return this._getCached('isExteriorRing');
    }
  }]);

  return Ring;
}();

var Poly = exports.Poly = function () {
  function Poly(exteriorRing) {
    _classCallCheck(this, Poly);

    this.exteriorRing = exteriorRing;
    exteriorRing.registerPoly(this);
    this.interiorRings = [];
  }

  _createClass(Poly, [{
    key: 'addInterior',
    value: function addInterior(ring) {
      this.interiorRings.push(ring);
      ring.registerPoly(this);
    }
  }, {
    key: 'getGeom',
    value: function getGeom() {
      var geom = [this.exteriorRing.getGeom()];
      // exterior ring was all (within rounding error of angle calc) colinear points
      if (geom[0] === null) return null;
      for (var i = 0, iMax = this.interiorRings.length; i < iMax; i++) {
        var ringGeom = this.interiorRings[i].getGeom();
        // interior ring was all (within rounding error of angle calc) colinear points
        if (ringGeom === null) continue;
        geom.push(ringGeom);
      }
      return geom;
    }
  }]);

  return Poly;
}();

var MultiPoly = exports.MultiPoly = function () {
  function MultiPoly(rings) {
    _classCallCheck(this, MultiPoly);

    this.rings = rings;
    this.polys = this._composePolys(rings);
  }

  _createClass(MultiPoly, [{
    key: 'getGeom',
    value: function getGeom() {
      var geom = [];
      for (var i = 0, iMax = this.polys.length; i < iMax; i++) {
        var polyGeom = this.polys[i].getGeom();
        // exterior ring was all (within rounding error of angle calc) colinear points
        if (polyGeom === null) continue;
        geom.push(polyGeom);
      }
      return geom;
    }
  }, {
    key: '_composePolys',
    value: function _composePolys(rings) {
      var polys = [];
      for (var i = 0, iMax = rings.length; i < iMax; i++) {
        var ring = rings[i];
        if (ring.poly) continue;
        if (ring.isExteriorRing) polys.push(new Poly(ring));else {
          if (!ring.enclosingRing.poly) polys.push(new Poly(ring.enclosingRing));
          ring.enclosingRing.poly.addInterior(ring);
        }
      }
      return polys;
    }
  }]);

  return MultiPoly;
}();

//# sourceURL=webpack://polygon-clipping/./src/geom-out.js?`)},"./src/index.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = doIt;

var _qheap = __webpack_require__(/*! qheap */ "./node_modules/qheap/index.js");

var _qheap2 = _interopRequireDefault(_qheap);

var _cleanInput = __webpack_require__(/*! ./clean-input.js */ "./src/clean-input.js");

var cleanInput = _interopRequireWildcard(_cleanInput);

var _geomIn = __webpack_require__(/*! ./geom-in */ "./src/geom-in.js");

var geomIn = _interopRequireWildcard(_geomIn);

var _geomOut = __webpack_require__(/*! ./geom-out */ "./src/geom-out.js");

var geomOut = _interopRequireWildcard(_geomOut);

var _operation = __webpack_require__(/*! ./operation */ "./src/operation.js");

var _operation2 = _interopRequireDefault(_operation);

var _sweepEvent = __webpack_require__(/*! ./sweep-event */ "./src/sweep-event.js");

var _sweepEvent2 = _interopRequireDefault(_sweepEvent);

var _sweepLine = __webpack_require__(/*! ./sweep-line */ "./src/sweep-line.js");

var _sweepLine2 = _interopRequireDefault(_sweepLine);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function doIt(operationType, geom, moreGeoms) {
  /* Make a copy of the input geometry with points as objects, for perf */
  var geoms = [cleanInput.pointsAsObjects(geom)];
  for (var i = 0, iMax = moreGeoms.length; i < iMax; i++) {
    geoms.push(cleanInput.pointsAsObjects(moreGeoms[i]));
  }

  /* Clean inputs */
  for (var _i = 0, _iMax = geoms.length; _i < _iMax; _i++) {
    cleanInput.forceMultiPoly(geoms[_i]);
    cleanInput.cleanMultiPoly(geoms[_i]);
  }

  /* Convert inputs to MultiPoly objects, mark subject & register operation */
  var multipolys = [];
  for (var _i2 = 0, _iMax2 = geoms.length; _i2 < _iMax2; _i2++) {
    multipolys.push(new geomIn.MultiPoly(geoms[_i2]));
  }
  multipolys[0].markAsSubject();
  _operation2.default.register(operationType, multipolys.length);

  /* Put segment endpoints in a priority queue */
  var queue = new _qheap2.default({ comparBefore: _sweepEvent2.default.compareBefore });
  for (var _i3 = 0, _iMax3 = multipolys.length; _i3 < _iMax3; _i3++) {
    var sweepEvents = multipolys[_i3].getSweepEvents();
    for (var j = 0, jMax = sweepEvents.length; j < jMax; j++) {
      queue.insert(sweepEvents[j]);
    }
  }

  /* Pass the sweep line over those endpoints */
  var sweepLine = new _sweepLine2.default();
  while (queue.length) {
    var newEvents = sweepLine.process(queue.remove());
    for (var _i4 = 0, _iMax4 = newEvents.length; _i4 < _iMax4; _i4++) {
      queue.insert(newEvents[_i4]);
    }
  }

  /* Error on self-crossing input rings */
  cleanInput.errorOnSelfIntersectingRings(sweepLine.segments);

  /* Collect and compile segments we're keeping into a multipolygon */
  var ringsOut = geomOut.Ring.factory(sweepLine.segments);
  var result = new geomOut.MultiPoly(ringsOut);
  return result.getGeom();
}

//# sourceURL=webpack://polygon-clipping/./src/index.js?`)},"./src/operation.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Operation = function () {
  function Operation() {
    _classCallCheck(this, Operation);

    this.types = {
      INTERSECTION: 0,
      UNION: 1,
      XOR: 2,
      DIFFERENCE: 3
    };
  }

  _createClass(Operation, [{
    key: "register",
    value: function register(type, numMultiPolys) {
      this.type = type;
      this.numMultiPolys = numMultiPolys;
    }
  }]);

  return Operation;
}();

// global to register details about the operation on


var operation = new Operation();

exports.default = operation;

//# sourceURL=webpack://polygon-clipping/./src/operation.js?`)},"./src/segment.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _operation = __webpack_require__(/*! ./operation */ "./src/operation.js");

var _operation2 = _interopRequireDefault(_operation);

var _sweepEvent = __webpack_require__(/*! ./sweep-event */ "./src/sweep-event.js");

var _sweepEvent2 = _interopRequireDefault(_sweepEvent);

var _bbox = __webpack_require__(/*! ./bbox */ "./src/bbox.js");

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

var _vector = __webpack_require__(/*! ./vector */ "./src/vector.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Segment = function () {
  _createClass(Segment, null, [{
    key: 'compare',
    value: function compare(a, b) {
      if (a === b) return 0;

      var alx = a.leftSE.point.x;
      var aly = a.leftSE.point.y;
      var blx = b.leftSE.point.x;
      var bly = b.leftSE.point.y;
      var arx = a.rightSE.point.x;
      var brx = b.rightSE.point.x;

      // check if they're even in the same vertical plane
      if ((0, _flp.cmp)(brx, alx) < 0) return 1;
      if ((0, _flp.cmp)(arx, blx) < 0) return -1;

      var cmpLeft = a.comparePoint(b.leftSE.point);
      var cmpLX = (0, _flp.cmp)(alx, blx);

      // are a and b colinear?
      if (cmpLeft === 0 && a.comparePoint(b.rightSE.point) === 0 && b.comparePoint(a.leftSE.point) === 0 && b.comparePoint(a.rightSE.point) === 0) {
        // colinear segments with non-matching left-endpoints, consider
        // the more-left endpoint to be earlier
        if (cmpLX !== 0) return cmpLX;

        // colinear segments with matching left-endpoints, fall back
        // on creation order of segments as a tie-breaker
        // NOTE: we do not use segment length to break a tie here, because
        //       when segments are split their length changes
        if (a.ringIn.id !== b.ringIn.id) {
          return a.ringIn.id < b.ringIn.id ? -1 : 1;
        }
      } else {
        // not colinear

        // if the our left endpoints are not in the same vertical line,
        // consider a vertical line at the rightmore of the two left endpoints,
        // consider the segment that intersects lower with that line to be earlier
        if (cmpLX < 0) return cmpLeft === 1 ? -1 : 1;
        if (cmpLX > 0) return b.comparePoint(a.leftSE.point) === 1 ? 1 : -1;

        // if our left endpoints match, consider the segment
        // that angles more downward to be earlier
        if (cmpLX === 0 && (0, _flp.cmp)(a.leftSE.point.y, b.leftSE.point.y) === 0) {
          return a.comparePoint(b.rightSE.point) > 0 ? -1 : 1;
        }

        // left endpoints are in the same vertical line but don't overlap exactly,
        // lower means ealier
        return (0, _flp.cmp)(aly, bly);
      }

      throw new Error('Segment comparison (from [' + a.leftSE.point.x + ', ' + a.leftSR.point.y + '])' + (' -> to [' + a.rightSE.point.x + ', ' + a.rightSE.point.y + ']) failed... ') + ' segments equal but not identical?');
    }
  }]);

  function Segment(point1, point2, ring) {
    _classCallCheck(this, Segment);

    this.ringIn = ring;
    this.ringOut = null;

    var ptCmp = (0, _flp.cmpPoints)(point1, point2);
    var lp = void 0;
    var rp = void 0;
    if (ptCmp < 0) {
      lp = point1;
      rp = point2;
      this.flowL2R = true;
    } else if (ptCmp > 0) {
      lp = point2;
      rp = point1;
      this.flowL2R = false;
    } else {
      throw new Error('Tried to create degenerate segment at [' + point1.x + ', ' + point1.y + ']');
    }

    this.leftSE = new _sweepEvent2.default(lp, this);
    this.rightSE = new _sweepEvent2.default(rp, this);

    // cache of dynamically computed properies
    this._clearCache();
  }

  _createClass(Segment, [{
    key: 'clone',
    value: function clone() {
      var seg = new Segment(this.leftSE.point, this.rightSE.point, this.ringIn);
      seg.flowL2R = this.flowL2R;
      return seg;
    }
  }, {
    key: 'getOtherSE',
    value: function getOtherSE(se) {
      if (se === this.leftSE) return this.rightSE;
      if (se === this.rightSE) return this.leftSE;
      throw new Error('may only be called by own sweep events');
    }
  }, {
    key: 'isAnEndpoint',
    value: function isAnEndpoint(point) {
      return (0, _flp.cmpPoints)(point, this.leftSE.point) === 0 || (0, _flp.cmpPoints)(point, this.rightSE.point) === 0;
    }
  }, {
    key: 'isPointOn',
    value: function isPointOn(point) {
      return (0, _bbox.isInBbox)(this.bbox, point) && this.comparePoint(point) === 0;
    }

    /* Compare this segment with a point. Return value indicates
     *    1: point is below segment
     *    0: point is colinear to segment
     *   -1: point is above segment */

  }, {
    key: 'comparePoint',
    value: function comparePoint(point) {
      if (this.isAnEndpoint(point)) return 0;
      return (0, _vector.compareVectorAngles)(point, this.leftSE.point, this.rightSE.point);
    }

    /**
     * Given another segment, returns an array of intersection points
     * between the two segments. The returned array can contain:
     *  * zero points:  no intersection b/t segments
     *  * one point:    segments intersect once
     *  * two points:   segments overlap. Endpoints of overlap returned.
     *                  Will be ordered as sweep line would encounter them.
     */

  }, {
    key: 'getIntersections',
    value: function getIntersections(other) {
      // If bboxes don't overlap, there can't be any intersections
      var bboxOverlap = (0, _bbox.getBboxOverlap)(this.bbox, other.bbox);
      if (bboxOverlap === null) return [];

      // The general algorithim doesn't handle overlapping colinear segments.
      // Overlapping colinear segments, if present, will have intersections
      // of one pair of opposing corners of the bbox overlap. Thus we just
      // manually check those coordinates.
      //
      // Note this also handles the cases of a collapsed bbox (just one point)
      // and semi-collapsed bbox (a vertical or horizontal line) as well.
      //
      // In addition, in the case of a T-intersection, this ensures that the
      // interseciton returned matches exactly an endpoint - no rounding error.
      var intersections = [];
      var bboxCorners = (0, _bbox.getUniqueCorners)(bboxOverlap);
      for (var i = 0, iMax = bboxCorners.length; i < iMax; i++) {
        var point = bboxCorners[i];
        // test if this point is an intersection
        if (this.isAnEndpoint(point) && other.isPointOn(point) || other.isAnEndpoint(point) && this.isPointOn(point)) {
          intersections.push(point);
        }
      }
      if (intersections.length > 0) return intersections;

      // General case for non-overlapping segments.
      // This algorithm is based on Schneider and Eberly.
      // http://www.cimec.org.ar/~ncalvo/Schneider_Eberly.pdf - pg 244
      var al = this.leftSE.point;
      var bl = other.leftSE.point;
      var va = this.vector;
      var vb = other.vector;
      var ve = { x: bl.x - al.x, y: bl.y - al.y };
      var kross = (0, _vector.crossProduct)(va, vb);

      // not on line segment a
      var s = (0, _vector.crossProduct)(ve, vb) / kross;
      if ((0, _flp.cmp)(s, 0) < 0 || (0, _flp.cmp)(1, s) < 0) return [];

      var t = (0, _vector.crossProduct)(ve, va) / kross;
      if ((0, _flp.cmp)(t, 0) < 0 || (0, _flp.cmp)(1, t) < 0) return [];

      // intersection is in a midpoint of both lines, let's average them and
      // bound the result by org bbox (otherwise leftSE and rightSE could swap)
      var x = (al.x + s * va.x + bl.x + t * vb.x) / 2;
      var y = (al.y + s * va.y + bl.y + t * vb.y) / 2;
      if (x < bboxOverlap.ll.x) x = bboxOverlap.ll.x;
      if (x > bboxOverlap.ur.x) x = bboxOverlap.ur.x;
      if (y < bboxOverlap.ll.y) y = bboxOverlap.ll.y;
      if (y > bboxOverlap.ur.y) y = bboxOverlap.ur.y;
      return [{ x: x, y: y }];
    }

    /**
     * Split the given segment into multiple segments on the given points.
     *  * The existing segment will retain it's leftSE and a new rightSE will be
     *    generated for it.
     *  * A new segment will be generated which will adopt the original segment's
     *    rightSE, and a new leftSE will be generated for it.
     *  * If there are more than two points given to split on, new segments
     *    in the middle will be generated with new leftSE and rightSE's.
     *  * An array of the newly generated SweepEvents will be returned.
     */

  }, {
    key: 'split',
    value: function split(points) {
      // sort them and unique-ify them
      points.sort(_flp.cmpPoints);
      points = points.filter(function (pt, i, pts) {
        return i === 0 || (0, _flp.cmpPoints)(pts[i - 1], pt) !== 0;
      });

      for (var i = 0, iMax = points.length; i < iMax; i++) {
        var pt = points[i];
        if (this.isAnEndpoint(pt)) {
          throw new Error('Cannot split segment upon endpoint at [' + pt.x + ', ' + pt.y + ']');
        }
      }

      var point = points.shift();
      var newSeg = this.clone();
      newSeg.leftSE = new _sweepEvent2.default(point, newSeg);
      newSeg.rightSE = this.rightSE;
      this.rightSE.segment = newSeg;
      this.rightSE = new _sweepEvent2.default(point, this);
      var newEvents = [this.rightSE, newSeg.leftSE];

      if (points.length > 0) {
        var moreNewEvents = newSeg.split(points);
        for (var _i = 0, _iMax = moreNewEvents.length; _i < _iMax; _i++) {
          newEvents.push(moreNewEvents[_i]);
        }
      }
      return newEvents;
    }
  }, {
    key: 'registerPrev',
    value: function registerPrev(other) {
      this.prev = other;
      this._clearCache();
    }
  }, {
    key: 'registerRingOut',
    value: function registerRingOut(ring) {
      this.ringOut = ring;
    }

    /* The first segment previous segment chain that is in the result */

  }, {
    key: '_prevInResult',
    value: function _prevInResult() {
      var prev = this.prev;
      while (prev && !prev.isInResult) {
        prev = prev.prev;
      }return prev;
    }

    /* The segments, including ourselves, for which we overlap perfectly */

  }, {
    key: '_coincidents',
    value: function _coincidents() {
      // a coincident will have both left and right sweepEvents linked with us
      var coincidents = [];
      var leftLinkedEvents = this.leftSE.linkedEvents;
      var rightLinkedEvents = this.rightSE.linkedEvents;
      for (var i = 0, iMax = leftLinkedEvents.length; i < iMax; i++) {
        var leftSE = leftLinkedEvents[i];
        if (!leftSE.isLeft) continue;
        if (leftSE.segment.rightSE.linkedEvents !== rightLinkedEvents) continue;
        coincidents.push(leftSE.segment);
      }

      if (coincidents.length > 0) {
        // put the 'winner' at the front
        // arbitary - winner is the one with lowest ringId
        coincidents.sort(function (a, b) {
          return a.ringIn.id - b.ringIn.id;
        });

        // set this in all our coincident's caches so they don't have to calc it
        for (var _i2 = 0, _iMax2 = coincidents.length; _i2 < _iMax2; _i2++) {
          coincidents[_i2]._cache['coincidents'] = coincidents;
        }
      }
      return coincidents;
    }
  }, {
    key: '_prevNotCoincident',
    value: function _prevNotCoincident() {
      // iterating backwards from next to prev
      var next = this;
      var prev = this.prev;
      while (prev && next.coincidents === prev.coincidents) {
        next = prev;
        prev = prev.prev;
      }
      return prev;
    }

    /* Does the sweep line, when it intersects this segment, enter the ring? */

  }, {
    key: '_sweepLineEntersRing',
    value: function _sweepLineEntersRing() {
      // opposite of previous segment on the same ring
      var prev = this.prevNotCoincident;
      while (prev) {
        for (var i = 0, iMax = prev.coincidents.length; i < iMax; i++) {
          var seg = prev.coincidents[i];
          if (seg.ringIn === this.ringIn) return !seg.sweepLineEntersRing;
        }
        prev = prev.prevNotCoincident;
      }
      return true;
    }

    /* Does the sweep line, when it intersects this segment, enter the polygon? */

  }, {
    key: '_ringsInsideOf',
    value: function _ringsInsideOf() {
      if (!this.prev) return [];

      // coincidents always share the same rings. Return same array to save mem
      if (this.coincidents === this.prev.coincidents) {
        return this.prev.ringsInsideOf;
      }

      var rings = [];
      var prevRingsInsideOf = this.prev.ringsInsideOf;
      var prevRingsEntering = this.prev.getRingsEntering();
      var ringsExiting = this.getRingsExiting();

      // rings our prev was inside of all count, except those we're exiting
      for (var i = 0, iMax = prevRingsInsideOf.length; i < iMax; i++) {
        var ring = prevRingsInsideOf[i];
        if (!ringsExiting.includes(ring)) rings.push(ring);
      }

      // rings our prev was entering of all count, except those we're exiting
      for (var _i3 = 0, _iMax3 = prevRingsEntering.length; _i3 < _iMax3; _i3++) {
        var _ring = prevRingsEntering[_i3];
        if (!ringsExiting.includes(_ring)) rings.push(_ring);
      }

      return rings;
    }

    /* Array of input rings this segment is on boundary of */

  }, {
    key: 'getRingsOnEdgeOf',
    value: function getRingsOnEdgeOf() {
      var rings = [];
      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {
        rings.push(this.coincidents[i].ringIn);
      }
      return rings;
    }

    /* Array of input rings this segment is on boundary of,
     * and for which the sweep line enters when intersecting there */

  }, {
    key: 'getRingsEntering',
    value: function getRingsEntering() {
      var rings = [];
      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {
        var segment = this.coincidents[i];
        if (!segment.sweepLineEntersRing) continue;
        rings.push(segment.ringIn);
      }
      return rings;
    }

    /* Array of input rings this segment is on boundary of,
     * and for which the sweep line exits when intersecting there */

  }, {
    key: 'getRingsExiting',
    value: function getRingsExiting() {
      var rings = [];
      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {
        var segment = this.coincidents[i];
        if (segment.sweepLineEntersRing) continue;
        rings.push(segment.ringIn);
      }
      return rings;
    }

    /* Is this segment valid on our own polygon? (ie not outside exterior ring) */

  }, {
    key: '_isValidEdgeForPoly',
    value: function _isValidEdgeForPoly() {
      // SLER: sweep line entering orientation
      var sameSLER = void 0;
      var diffSLER = void 0;
      if (this.sweepLineEntersRing) {
        sameSLER = this.getRingsEntering();
        diffSLER = this.getRingsExiting();
      } else {
        diffSLER = this.getRingsEntering();
        sameSLER = this.getRingsExiting();
      }
      return this.ringIn.isValid(sameSLER, diffSLER, this.ringsInsideOf);
    }

    /* Array of multipolys this segment is inside of */

  }, {
    key: 'getMultiPolysInsideOf',
    value: function getMultiPolysInsideOf() {
      var mps = [];
      for (var i = 0, iMax = this.ringsInsideOf.length; i < iMax; i++) {
        var poly = this.ringsInsideOf[i].poly;
        if (mps.includes(poly.multiPoly)) continue;
        if (!poly.isInside(this.getRingsOnEdgeOf(), this.ringsInsideOf)) continue;
        mps.push(poly.multiPoly);
      }
      return mps;
    }

    /* The multipolys on one side of us */

  }, {
    key: 'getMultiPolysSLPEnters',
    value: function getMultiPolysSLPEnters(multiPolysInsideOf) {
      // start with the multipolys we're fully inside
      var mps = multiPolysInsideOf.slice();
      // add the multipolys we have the sweep line entering
      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {
        var seg = this.coincidents[i];
        if (!seg.sweepLineEntersPoly) continue;
        var mp = seg.ringIn.poly.multiPoly;
        if (!mps.includes(mp)) mps.push(mp);
      }
      return mps;
    }

    /* The multipolys on the other side of us */

  }, {
    key: 'getMultiPolysSLPExits',
    value: function getMultiPolysSLPExits(multiPolysInsideOf) {
      // start with the multipolys we're fully inside
      var mps = multiPolysInsideOf.slice();
      // add the multipolys we have the sweep line entering
      for (var i = 0, iMax = this.coincidents.length; i < iMax; i++) {
        var seg = this.coincidents[i];
        if (!seg.sweepLineExitsPoly) continue;
        var mp = seg.ringIn.poly.multiPoly;
        if (!mps.includes(mp)) mps.push(mp);
      }
      return mps;
    }

    /* Is this segment part of the final result? */

  }, {
    key: '_isInResult',
    value: function _isInResult() {
      // if it's not the coincidence winner, it's not in the resul
      if (this !== this.coincidents[0]) return false;

      var multiPolysInsideOf = this.getMultiPolysInsideOf();
      var multiPolysSLPEnters = this.getMultiPolysSLPEnters(multiPolysInsideOf);
      var multiPolysSLPExits = this.getMultiPolysSLPExits(multiPolysInsideOf);

      switch (_operation2.default.type) {
        case _operation2.default.types.UNION:
          // UNION - included iff:
          //  * On one side of us there is 0 poly interiors AND
          //  * On the other side there is 1 or more.
          var noEnters = multiPolysSLPEnters.length === 0;
          var noExits = multiPolysSLPExits.length === 0;
          return noEnters !== noExits;

        case _operation2.default.types.INTERSECTION:
          // INTERSECTION - included iff:
          //  * on one side of us all multipolys are rep. with poly interiors AND
          //  * on the other side of us, not all multipolys are repsented
          //    with poly interiors
          var least = void 0;
          var most = void 0;
          if (multiPolysSLPEnters.length < multiPolysSLPExits.length) {
            least = multiPolysSLPEnters.length;
            most = multiPolysSLPExits.length;
          } else {
            least = multiPolysSLPExits.length;
            most = multiPolysSLPEnters.length;
          }
          return most === _operation2.default.numMultiPolys && least < most;

        case _operation2.default.types.XOR:
          // XOR - included iff:
          //  * the difference between the number of multipolys represented
          //    with poly interiors on our two sides is an odd number
          var diff = Math.abs(multiPolysSLPEnters.length - multiPolysSLPExits.length);
          return diff % 2 === 1;

        case _operation2.default.types.DIFFERENCE:
          // DIFFERENCE included iff:
          //  * on exactly one side, we have just the subject
          var isJustSubject = function isJustSubject(mps) {
            return mps.length === 1 && mps[0].isSubject;
          };
          return isJustSubject(multiPolysSLPEnters) !== isJustSubject(multiPolysSLPExits);

        default:
          throw new Error('Unrecognized operation type found ' + _operation2.default.type);
      }
    }
  }, {
    key: '_clearCache',
    value: function _clearCache() {
      this._cache = {};
    }
  }, {
    key: 'bbox',
    get: function get() {
      var y1 = this.leftSE.point.y;
      var y2 = this.rightSE.point.y;
      return {
        ll: { x: this.leftSE.point.x, y: y1 < y2 ? y1 : y2 },
        ur: { x: this.rightSE.point.x, y: y1 > y2 ? y1 : y2 }
      };
    }

    /* A vector from the left point to the right */

  }, {
    key: 'vector',
    get: function get() {
      return {
        x: this.rightSE.point.x - this.leftSE.point.x,
        y: this.rightSE.point.y - this.leftSE.point.y
      };
    }
  }, {
    key: 'isVertical',
    get: function get() {
      return (0, _flp.cmp)(this.leftSE.point.x, this.rightSE.point.x) === 0;
    }

    /* In the original ringIn, which event came second */

  }, {
    key: 'flowIntoSE',
    get: function get() {
      return this.flowL2R ? this.rightSE : this.leftSE;
    }
  }, {
    key: 'prevInResult',
    get: function get() {
      var key = 'prevInResult';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'coincidents',
    get: function get() {
      var key = 'coincidents';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'prevNotCoincident',
    get: function get() {
      var key = 'prevNotCoincident';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'sweepLineEntersRing',
    get: function get() {
      var key = 'sweepLineEntersRing';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'sweepLineEntersPoly',
    get: function get() {
      if (!this.isValidEdgeForPoly) return false;
      return this.ringIn.isExterior === this.sweepLineEntersRing;
    }

    /* Does the sweep line, when it intersects this segment, exit the polygon? */

  }, {
    key: 'sweepLineExitsPoly',
    get: function get() {
      if (!this.isValidEdgeForPoly) return false;
      return this.ringIn.isExterior !== this.sweepLineEntersRing;
    }

    /* Array of input rings this segment is inside of (not on boundary) */

  }, {
    key: 'ringsInsideOf',
    get: function get() {
      var key = 'ringsInsideOf';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'isValidEdgeForPoly',
    get: function get() {
      var key = 'isValidEdgeForPoly';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }, {
    key: 'isInResult',
    get: function get() {
      var key = 'isInResult';
      if (this._cache[key] === undefined) this._cache[key] = this['_' + key]();
      return this._cache[key];
    }
  }]);

  return Segment;
}();

exports.default = Segment;

//# sourceURL=webpack://polygon-clipping/./src/segment.js?`)},"./src/sweep-event.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

var _vector = __webpack_require__(/*! ./vector */ "./src/vector.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SweepEvent = function () {
  _createClass(SweepEvent, null, [{
    key: 'compareBefore',
    value: function compareBefore(a, b) {
      // favor event with a point that the sweep line hits first
      var cmpX = (0, _flp.cmp)(a.point.x, b.point.x);
      if (cmpX !== 0) return cmpX < 0;

      var cmpY = (0, _flp.cmp)(a.point.y, b.point.y);
      if (cmpY !== 0) return cmpY < 0;

      // favor right events over left
      if (a.isLeft !== b.isLeft) return !a.isLeft;

      // favor events where the line segment is lower
      var pointSegCmp = a.segment.comparePoint(b.otherSE.point);
      if (pointSegCmp !== 0) return pointSegCmp > 0;

      // as a tie-breaker, favor lower segment creation id
      var aId = a.segment.ringIn.id;
      var bId = b.segment.ringIn.id;
      if (aId !== bId) return aId < bId;

      // NOTE:  We don't sort on segment length because that changes
      //        as segments are divided.

      // they appear to be the same point... are they?
      if (a === b) return false;

      throw new Error('SweepEvent comparison failed at [' + a.point.x + ', ' + a.point.y + ']... ' + 'equal but not identical?');
    }
  }]);

  function SweepEvent(point, segment) {
    _classCallCheck(this, SweepEvent);

    this.point = point;
    this.segment = segment;
    this.linkedEvents = [this];
  }

  _createClass(SweepEvent, [{
    key: 'link',
    value: function link(other) {
      var otherLE = other.linkedEvents;
      for (var i = 0, iMax = otherLE.length; i < iMax; i++) {
        var evt = otherLE[i];
        this.linkedEvents.push(evt);
        evt.linkedEvents = this.linkedEvents;
      }
    }
  }, {
    key: 'getAvailableLinkedEvents',
    value: function getAvailableLinkedEvents() {
      var events = [];
      for (var i = 0, iMax = this.linkedEvents.length; i < iMax; i++) {
        var evt = this.linkedEvents[i];
        if (evt !== this && !evt.segment.ringOut && evt.segment.isInResult) {
          events.push(evt);
        }
      }
      return events;
    }

    /**
     * Returns a comparator function for sorting linked events that will
     * favor the event that will give us the smallest left-side angle.
     * All ring construction starts as low as possible heading to the right,
     * so by always turning left as sharp as possible we'll get polygons
     * without uncessary loops & holes.
     *
     * The comparator function has a compute cache such that it avoids
     * re-computing already-computed values.
     */

  }, {
    key: 'getLeftmostComparator',
    value: function getLeftmostComparator(baseEvent) {
      var _this = this;

      var cache = new Map();

      var fillCache = function fillCache(linkedEvent) {
        var nextEvent = linkedEvent.otherSE;
        cache.set(linkedEvent, {
          sine: (0, _vector.sineOfAngle)(_this.point, baseEvent.point, nextEvent.point),
          cosine: (0, _vector.cosineOfAngle)(_this.point, baseEvent.point, nextEvent.point)
        });
      };

      return function (a, b) {
        if (!cache.has(a)) fillCache(a);
        if (!cache.has(b)) fillCache(b);

        var _cache$get = cache.get(a),
            asine = _cache$get.sine,
            acosine = _cache$get.cosine;

        var _cache$get2 = cache.get(b),
            bsine = _cache$get2.sine,
            bcosine = _cache$get2.cosine;

        var cmpZeroASine = (0, _flp.cmp)(asine, 0);
        var cmpZeroBSine = (0, _flp.cmp)(bsine, 0);

        if (cmpZeroASine >= 0 && cmpZeroBSine >= 0) return (0, _flp.cmp)(bcosine, acosine);
        if (cmpZeroASine < 0 && cmpZeroBSine < 0) return (0, _flp.cmp)(acosine, bcosine);
        return (0, _flp.cmp)(bsine, asine);
      };
    }
  }, {
    key: 'isLeft',
    get: function get() {
      return this === this.segment.leftSE;
    }
  }, {
    key: 'isRight',
    get: function get() {
      return this === this.segment.rightSE;
    }
  }, {
    key: 'otherSE',
    get: function get() {
      return this.segment.getOtherSE(this);
    }
  }]);

  return SweepEvent;
}();

exports.default = SweepEvent;

//# sourceURL=webpack://polygon-clipping/./src/sweep-event.js?`)},"./src/sweep-line.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _splaytree = __webpack_require__(/*! splaytree */ "./node_modules/splaytree/index.js");

var _splaytree2 = _interopRequireDefault(_splaytree);

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

var _segment = __webpack_require__(/*! ./segment */ "./src/segment.js");

var _segment2 = _interopRequireDefault(_segment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * NOTE:  We must be careful not to change any segments while
 *        they are in the SplayTree. AFAIK, there's no way to tell
 *        the tree to rebalance itself - thus before splitting
 *        a segment that's in the tree, we remove it from the tree,
 *        do the split, then re-insert it. (Even though splitting a
 *        segment *shouldn't* change its correct position in the
 *        sweep line tree, the reality is because of rounding errors,
 *        it sometimes does.)
 */

var SweepLine = function () {
  function SweepLine() {
    var comparator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _segment2.default.compare;

    _classCallCheck(this, SweepLine);

    this.tree = new _splaytree2.default(comparator);
    this.segments = [];
    this.prevEvent = null;
  }

  _createClass(SweepLine, [{
    key: 'process',
    value: function process(event) {
      var segment = event.segment;
      var newEvents = [];
      var node = event.isLeft ? this.tree.insert(segment) : this.tree.find(segment);

      var prevNode = this.tree.prev(node);
      var prevSeg = prevNode ? prevNode.key : null;

      var nextNode = this.tree.next(node);
      var nextSeg = nextNode ? nextNode.key : null;

      if (event.isLeft) {
        var mySplitters = [];

        // Check for intersections against the previous segment in the sweep line
        if (prevSeg) {
          var prevInters = prevSeg.getIntersections(segment);
          if (prevInters.length > 0) {
            var newEventsFromSplit = this._possibleSplit(prevSeg, prevInters);
            for (var i = 0, iMax = newEventsFromSplit.length; i < iMax; i++) {
              newEvents.push(newEventsFromSplit[i]);
            }
            for (var _i = 0, _iMax = prevInters.length; _i < _iMax; _i++) {
              var pt = prevInters[_i];
              if (!segment.isAnEndpoint(pt)) mySplitters.push(pt);
            }
          }
        }

        // Check for intersections against the next segment in the sweep line
        if (nextSeg) {
          var nextInters = nextSeg.getIntersections(segment);
          if (nextInters.length > 0) {
            var _newEventsFromSplit = this._possibleSplit(nextSeg, nextInters);
            for (var _i2 = 0, _iMax2 = _newEventsFromSplit.length; _i2 < _iMax2; _i2++) {
              newEvents.push(_newEventsFromSplit[_i2]);
            }
            for (var _i3 = 0, _iMax3 = nextInters.length; _i3 < _iMax3; _i3++) {
              var _pt = nextInters[_i3];
              if (!segment.isAnEndpoint(_pt)) mySplitters.push(_pt);
            }
          }
        }

        // did we get some intersections?
        if (newEvents.length > 0 || mySplitters.length > 0) {
          this.tree.remove(segment);

          if (mySplitters.length > 0) {
            var _newEventsFromSplit2 = segment.split(mySplitters);
            for (var _i4 = 0, _iMax4 = _newEventsFromSplit2.length; _i4 < _iMax4; _i4++) {
              newEvents.push(_newEventsFromSplit2[_i4]);
            }
          }

          // Make sure sweep line ordering is totally consistent for later
          // use with the segment 'prev' pointers - re-do the current event.
          newEvents.push(event);
          return newEvents;
        }

        this.segments.push(segment);
        segment.registerPrev(prevSeg);
      } else {
        // event.isRight

        // since we're about to be removed from the sweep line, check for
        // intersections between our previous and next segments
        if (prevSeg && nextSeg) {
          var inters = prevSeg.getIntersections(nextSeg);
          if (inters.length > 0) {
            var _newEventsFromSplit3 = this._possibleSplit(prevSeg, inters);
            for (var _i5 = 0, _iMax5 = _newEventsFromSplit3.length; _i5 < _iMax5; _i5++) {
              newEvents.push(_newEventsFromSplit3[_i5]);
            }
            _newEventsFromSplit3 = this._possibleSplit(nextSeg, inters);
            for (var _i6 = 0, _iMax6 = _newEventsFromSplit3.length; _i6 < _iMax6; _i6++) {
              newEvents.push(_newEventsFromSplit3[_i6]);
            }
          }
        }

        this.tree.remove(segment);
      }

      if (this.prevEvent && (0, _flp.cmpPoints)(this.prevEvent.point, event.point) === 0) {
        this.prevEvent.link(event);
      }
      this.prevEvent = event;

      return newEvents;
    }
  }, {
    key: '_possibleSplit',
    value: function _possibleSplit(segment, intersections) {
      var splitters = [];
      for (var i = 0, iMax = intersections.length; i < iMax; i++) {
        var pt = intersections[i];
        if (!segment.isAnEndpoint(pt)) splitters.push(pt);
      }

      var newEvents = void 0;
      if (splitters.length > 0) {
        this.tree.remove(segment);
        newEvents = segment.split(splitters);
        this.tree.insert(segment);
      } else newEvents = [];
      return newEvents;
    }
  }]);

  return SweepLine;
}();

exports.default = SweepLine;

//# sourceURL=webpack://polygon-clipping/./src/sweep-line.js?`)},"./src/vector.js":function(module,exports,__webpack_require__){eval(`

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cosineOfAngle = exports.sineOfAngle = exports.compareVectorAngles = exports.dotProduct = exports.crossProduct = undefined;

var _flp = __webpack_require__(/*! ./flp */ "./src/flp.js");

/* Cross Product of two vectors with first point at origin */
var crossProduct = exports.crossProduct = function crossProduct(a, b) {
  return a.x * b.y - a.y * b.x;
};

/* Dot Product of two vectors with first point at origin */
var dotProduct = exports.dotProduct = function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y;
};

/* Comparator for two vectors with same starting point */
var compareVectorAngles = exports.compareVectorAngles = function compareVectorAngles(basePt, endPt1, endPt2) {
  var v1 = { x: endPt1.x - basePt.x, y: endPt1.y - basePt.y };
  var v2 = { x: endPt2.x - basePt.x, y: endPt2.y - basePt.y };
  var kross = crossProduct(v1, v2);
  return (0, _flp.cmp)(kross, 0);
};

var length = function length(v) {
  return Math.sqrt(dotProduct(v, v));
};

/* Get the sine of the angle from pShared -> pAngle to pShaed -> pBase */
var sineOfAngle = exports.sineOfAngle = function sineOfAngle(pShared, pBase, pAngle) {
  var vBase = { x: pBase.x - pShared.x, y: pBase.y - pShared.y };
  var vAngle = { x: pAngle.x - pShared.x, y: pAngle.y - pShared.y };
  return crossProduct(vAngle, vBase) / length(vAngle) / length(vBase);
};

/* Get the cosine of the angle from pShared -> pAngle to pShaed -> pBase */
var cosineOfAngle = exports.cosineOfAngle = function cosineOfAngle(pShared, pBase, pAngle) {
  var vBase = { x: pBase.x - pShared.x, y: pBase.y - pShared.y };
  var vAngle = { x: pAngle.x - pShared.x, y: pAngle.y - pShared.y };
  return dotProduct(vAngle, vBase) / length(vAngle) / length(vBase);
};

//# sourceURL=webpack://polygon-clipping/./src/vector.js?`)}})},module.exports=factory()},function(d,v,r){var i=r(2);typeof i=="string"&&(i=[[d.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};r(6)(i,o),i.locals&&(d.exports=i.locals)},function(d,v,r){var i=r(3);(d.exports=r(4)(!1)).push([d.i,`
/*   Icons  */

.leaflet-control-paintpolygon-icon {
    background-image: url(`+i(r(5))+`);
    background-repeat: no-repeat;
    height: 30px;
    width: 30px;
}

.leaflet-control-paintpolygon-icon-active {
    -webkit-filter: invert(75%); /* Safari 6.0 - 9.0 */
    filter: invert(75%);
}

.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-trash {
    background-position: 0px 0px;
}

.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-brush {
    background-position: 0px -30px;
}

.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-eraser {
    background-position: 0px -60px;
}

.leaflet-control-paintpolygon-icon.leaflet-control-paintpolygon-icon-size {
    background-position: 0px -90px;
}


/* Menu */

.leaflet-control-paintpolygon-menu  {
    background-color: #fff;
    position: absolute;
    border: 0!important;
    max-width: 0;
    max-height: 30px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
}
.leaflet-control-paintpolygon-menu-content  {
    padding: 5px;
    display: inline-block;
    max-width: 250px;
}

.leaflet-control-paintpolygon-menu-open  {
    border: inherit!important;
    max-width: 250px;
    max-height: 200px;
}

.leaflet-control-container .leaflet-top.leaflet-right .leaflet-control-paintpolygon-menu {
    top: 60px;
    right: 30px;
}
.leaflet-control-container .leaflet-top.leaflet-left .leaflet-control-paintpolygon-menu {
    top: 60px;
    left: 30px;
}
.leaflet-control-container .leaflet-bottom.leaflet-right .leaflet-control-paintpolygon-menu {
    bottom: 0px;
    right: 30px;
}
.leaflet-control-container .leaflet-bottom.leaflet-left .leaflet-control-paintpolygon-menu {
    bottom: 0px;
    left: 30px;
}

`,""])},function(d,v){d.exports=function(r){return typeof r!="string"?r:(/^['"].*['"]$/.test(r)&&(r=r.slice(1,-1)),/["'() \t\n]/.test(r)?'"'+r.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':r)}},function(d,v){d.exports=function(r){var i=[];return i.toString=function(){return this.map(function(o){var h=function(y,f){var C=y[1]||"",m=y[3];if(!m)return C;if(f&&typeof btoa=="function"){var A=(b=m,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(b))))+" */"),x=m.sources.map(function(k){return"/*# sourceURL="+m.sourceRoot+k+" */"});return[C].concat(x).concat([A]).join(`
`)}var b;return[C].join(`
`)}(o,r);return o[2]?"@media "+o[2]+"{"+h+"}":h}).join("")},i.i=function(o,h){typeof o=="string"&&(o=[[null,o,""]]);for(var y={},f=0;f<this.length;f++){var C=this[f][0];typeof C=="number"&&(y[C]=!0)}for(f=0;f<o.length;f++){var m=o[f];typeof m[0]=="number"&&y[m[0]]||(h&&!m[2]?m[2]=h:h&&(m[2]="("+m[2]+") and ("+h+")"),i.push(m))}},i}},function(d,v){d.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzAiCiAgIGhlaWdodD0iMTIwIgogICB2aWV3Qm94PSIwIDAgNy45Mzc1IDMxLjc1MDAwMSIKICAgdmVyc2lvbj0iMS4xIgogICBpZD0ic3ZnOCIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45Mi4zICgyNDA1NTQ2LCAyMDE4LTAzLTExKSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iUGFpbnRQb2x5Z29uLnN2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIiPgogICAgPG1hcmtlcgogICAgICAgaW5rc2NhcGU6c3RvY2tpZD0iQXJyb3cxU3N0YXJ0IgogICAgICAgb3JpZW50PSJhdXRvIgogICAgICAgcmVmWT0iMCIKICAgICAgIHJlZlg9IjAiCiAgICAgICBpZD0iQXJyb3cxU3N0YXJ0IgogICAgICAgc3R5bGU9Im92ZXJmbG93OnZpc2libGUiCiAgICAgICBpbmtzY2FwZTppc3N0b2NrPSJ0cnVlIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGg5NzMiCiAgICAgICAgIGQ9Ik0gMCwwIDUsLTUgLTEyLjUsMCA1LDUgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS4wMDAwMDAwM3B0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuMiwwLDAsMC4yLDEuMiwwKSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KICAgIDwvbWFya2VyPgogICAgPG1hcmtlcgogICAgICAgaW5rc2NhcGU6c3RvY2tpZD0iQXJyb3cxTWVuZCIKICAgICAgIG9yaWVudD0iYXV0byIKICAgICAgIHJlZlk9IjAiCiAgICAgICByZWZYPSIwIgogICAgICAgaWQ9Im1hcmtlcjE1MjMiCiAgICAgICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZSIKICAgICAgIGlua3NjYXBlOmlzc3RvY2s9InRydWUiPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDE1MjEiCiAgICAgICAgIGQ9Ik0gMCwwIDUsLTUgLTEyLjUsMCA1LDUgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS4wMDAwMDAwM3B0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjQsMCwwLC0wLjQsLTQsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIKICAgICAgIGlua3NjYXBlOnN0b2NraWQ9IkFycm93MkxlbmQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJBcnJvdzJMZW5kIgogICAgICAgc3R5bGU9Im92ZXJmbG93OnZpc2libGUiCiAgICAgICBpbmtzY2FwZTppc3N0b2NrPSJ0cnVlIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGg5ODIiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNjI1O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIDguNzE4NTg3OCw0LjAzMzczNTIgLTIuMjA3Mjg5NSwwLjAxNjAxMzI2IDguNzE4NTg4NCwtNC4wMDE3MDc4IGMgLTEuNzQ1NDk4NCwyLjM3MjA2MDkgLTEuNzM1NDQwOCw1LjYxNzQ1MTkgLTZlLTcsOC4wMzU0NDMgeiIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTEuMSwwLDAsLTEuMSwtMS4xLDApIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyCiAgICAgICBpbmtzY2FwZTpzdG9ja2lkPSJBcnJvdzFMZW5kIgogICAgICAgb3JpZW50PSJhdXRvIgogICAgICAgcmVmWT0iMCIKICAgICAgIHJlZlg9IjAiCiAgICAgICBpZD0iQXJyb3cxTGVuZCIKICAgICAgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIgogICAgICAgaW5rc2NhcGU6aXNzdG9jaz0idHJ1ZSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoOTY0IgogICAgICAgICBkPSJNIDAsMCA1LC01IC0xMi41LDAgNSw1IFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMDAwMDAwMDNwdDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMC44LDAsMCwtMC44LC0xMCwwKSIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KICAgIDwvbWFya2VyPgogICAgPG1hcmtlcgogICAgICAgaW5rc2NhcGU6c3RvY2tpZD0iQXJyb3cxTHN0YXJ0IgogICAgICAgb3JpZW50PSJhdXRvIgogICAgICAgcmVmWT0iMCIKICAgICAgIHJlZlg9IjAiCiAgICAgICBpZD0ibWFya2VyMTI5NSIKICAgICAgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIgogICAgICAgaW5rc2NhcGU6aXNzdG9jaz0idHJ1ZSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoMTI5MyIKICAgICAgICAgZD0iTSAwLDAgNSwtNSAtMTIuNSwwIDUsNSBaIgogICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjAwMDAwMDAzcHQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC44LDAsMCwwLjgsMTAsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIKICAgICAgIGlua3NjYXBlOnN0b2NraWQ9IkFycm93MU1lbmQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJBcnJvdzFNZW5kIgogICAgICAgc3R5bGU9Im92ZXJmbG93OnZpc2libGUiCiAgICAgICBpbmtzY2FwZTppc3N0b2NrPSJ0cnVlIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGg5NzAiCiAgICAgICAgIGQ9Ik0gMCwwIDUsLTUgLTEyLjUsMCA1LDUgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MS4wMDAwMDAwM3B0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjQsMCwwLC0wLjQsLTQsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIKICAgICAgIGlua3NjYXBlOnN0b2NraWQ9IkFycm93MlNlbmQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJBcnJvdzJTZW5kIgogICAgICAgc3R5bGU9Im92ZXJmbG93OnZpc2libGUiCiAgICAgICBpbmtzY2FwZTppc3N0b2NrPSJ0cnVlIj4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGg5OTQiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuNjI1O3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJNIDguNzE4NTg3OCw0LjAzMzczNTIgLTIuMjA3Mjg5NSwwLjAxNjAxMzI2IDguNzE4NTg4NCwtNC4wMDE3MDc4IGMgLTEuNzQ1NDk4NCwyLjM3MjA2MDkgLTEuNzM1NDQwOCw1LjYxNzQ1MTkgLTZlLTcsOC4wMzU0NDMgeiIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoLTAuMywwLDAsLTAuMywwLjY5LDApIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyCiAgICAgICBpbmtzY2FwZTpzdG9ja2lkPSJBcnJvdzJMc3RhcnQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJBcnJvdzJMc3RhcnQiCiAgICAgICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZSIKICAgICAgIGlua3NjYXBlOmlzc3RvY2s9InRydWUiPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDk3OSIKICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC42MjU7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGQ9Ik0gOC43MTg1ODc4LDQuMDMzNzM1MiAtMi4yMDcyODk1LDAuMDE2MDEzMjYgOC43MTg1ODg0LC00LjAwMTcwNzggYyAtMS43NDU0OTg0LDIuMzcyMDYwOSAtMS43MzU0NDA4LDUuNjE3NDUxOSAtNmUtNyw4LjAzNTQ0MyB6IgogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLjEsMCwwLDEuMSwxLjEsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIKICAgICAgIGlua3NjYXBlOnN0b2NraWQ9IkFycm93MU1zdGFydCIKICAgICAgIG9yaWVudD0iYXV0byIKICAgICAgIHJlZlk9IjAiCiAgICAgICByZWZYPSIwIgogICAgICAgaWQ9IkFycm93MU1zdGFydCIKICAgICAgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlIgogICAgICAgaW5rc2NhcGU6aXNzdG9jaz0idHJ1ZSI+CiAgICAgIDxwYXRoCiAgICAgICAgIGlkPSJwYXRoOTY3IgogICAgICAgICBkPSJNIDAsMCA1LC01IC0xMi41LDAgNSw1IFoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMDAwMDAwMDNwdDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjQsMCwwLDAuNCw0LDApIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyCiAgICAgICBpbmtzY2FwZTpzdG9ja2lkPSJBcnJvdzFMc3RhcnQiCiAgICAgICBvcmllbnQ9ImF1dG8iCiAgICAgICByZWZZPSIwIgogICAgICAgcmVmWD0iMCIKICAgICAgIGlkPSJBcnJvdzFMc3RhcnQiCiAgICAgICBzdHlsZT0ib3ZlcmZsb3c6dmlzaWJsZSIKICAgICAgIGlua3NjYXBlOmlzc3RvY2s9InRydWUiPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDk2MSIKICAgICAgICAgZD0iTSAwLDAgNSwtNSAtMTIuNSwwIDUsNSBaIgogICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDoxLjAwMDAwMDAzcHQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC44LDAsMCwwLjgsMTAsMCkiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJiYXNlIgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp6b29tPSIxNiIKICAgICBpbmtzY2FwZTpjeD0iMTguMTAyNDY1IgogICAgIGlua3NjYXBlOmN5PSIxMTEuMTcyNDEiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIKICAgICBzaG93Z3JpZD0idHJ1ZSIKICAgICB1bml0cz0icHgiCiAgICAgc2hvd2d1aWRlcz0idHJ1ZSIKICAgICBvYmplY3R0b2xlcmFuY2U9IjIwIgogICAgIGdyaWR0b2xlcmFuY2U9IjUiCiAgICAgaW5rc2NhcGU6c25hcC1ncmlkcz0iZmFsc2UiCiAgICAgZml0LW1hcmdpbi10b3A9IjgiCiAgICAgZml0LW1hcmdpbi1sZWZ0PSI4IgogICAgIGZpdC1tYXJnaW4tcmlnaHQ9IjgiCiAgICAgZml0LW1hcmdpbi1ib3R0b209IjgiCiAgICAgaW5rc2NhcGU6Z3VpZGUtYmJveD0idHJ1ZSIKICAgICBndWlkZXRvbGVyYW5jZT0iOSIKICAgICBpbmtzY2FwZTpzbmFwLXRvLWd1aWRlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjciCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSI+CiAgICA8aW5rc2NhcGU6Z3JpZAogICAgICAgdHlwZT0ieHlncmlkIgogICAgICAgaWQ9ImdyaWQzNzEzIgogICAgICAgc3BhY2luZ3g9IjIuNjQ1ODMzNCIKICAgICAgIHNwYWNpbmd5PSIyLjY0NTgzMzQiCiAgICAgICBzbmFwdmlzaWJsZWdyaWRsaW5lc29ubHk9ImZhbHNlIgogICAgICAgZW1wc3BhY2luZz0iMyIKICAgICAgIG9yaWdpbng9IjAiCiAgICAgICBvcmlnaW55PSIwIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBwb3NpdGlvbj0iMS4zMjcxNjAzLDI0LjI4NjQ0OCIKICAgICAgIG9yaWVudGF0aW9uPSIxLDAiCiAgICAgICBpZD0iZ3VpZGU0NTM0IgogICAgICAgaW5rc2NhcGU6bG9ja2VkPSJmYWxzZSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgcG9zaXRpb249IjYuNjEyNDE1MywyMi4yNjM1NTIiCiAgICAgICBvcmllbnRhdGlvbj0iMSwwIgogICAgICAgaWQ9Imd1aWRlNDUzOCIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIHBvc2l0aW9uPSItMi4wMDUzNTY3LDIyLjQ4NTcyIgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIGlkPSJndWlkZTQ1NDAiCiAgICAgICBpbmtzY2FwZTpsb2NrZWQ9ImZhbHNlIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBwb3NpdGlvbj0iLTEuNzM2MzI4MiwxNy4xOTc5MTciCiAgICAgICBvcmllbnRhdGlvbj0iMCwxIgogICAgICAgaWQ9Imd1aWRlNDU0MiIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIHBvc2l0aW9uPSItMS44MTkwMTA1LDE0LjU1MjA4NCIKICAgICAgIG9yaWVudGF0aW9uPSIwLDEiCiAgICAgICBpZD0iZ3VpZGU0NTQ0IgogICAgICAgaW5rc2NhcGU6bG9ja2VkPSJmYWxzZSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgcG9zaXRpb249Ii0xLjI4OTg0MzgsOS4yNDM4ODA0IgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIGlkPSJndWlkZTQ1NDYiCiAgICAgICBpbmtzY2FwZTpsb2NrZWQ9ImZhbHNlIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBwb3NpdGlvbj0iLTEuNDM4NjcxOSw2LjYxNDU4MzUiCiAgICAgICBvcmllbnRhdGlvbj0iMCwxIgogICAgICAgaWQ9Imd1aWRlNDU0OCIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIHBvc2l0aW9uPSItMC45OTIxODc1MiwxLjI4OTg0MzgiCiAgICAgICBvcmllbnRhdGlvbj0iMCwxIgogICAgICAgaWQ9Imd1aWRlNDU1MCIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIHBvc2l0aW9uPSItNC4zMjY0MjU1LDExLjkwMzUxNyIKICAgICAgIG9yaWVudGF0aW9uPSIwLDEiCiAgICAgICBpZD0iZ3VpZGU0NTUyIgogICAgICAgaW5rc2NhcGU6bG9ja2VkPSJmYWxzZSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgcG9zaXRpb249Ii0xMi43MzMwNzMsMzAuNDI3MDg0IgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIGlkPSJndWlkZTk0MSIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgICA8c29kaXBvZGk6Z3VpZGUKICAgICAgIHBvc2l0aW9uPSItMTcuMDQ4NDU1LDI1LjE0MDA0MSIKICAgICAgIG9yaWVudGF0aW9uPSIwLDEiCiAgICAgICBpZD0iZ3VpZGU5NDkiCiAgICAgICBpbmtzY2FwZTpsb2NrZWQ9ImZhbHNlIiAvPgogICAgPHNvZGlwb2RpOmd1aWRlCiAgICAgICBwb3NpdGlvbj0iLTUuOTYzNDUxMywyOC40Mzc0NzkiCiAgICAgICBvcmllbnRhdGlvbj0iMCwxIgogICAgICAgaWQ9Imd1aWRlOTU4IgogICAgICAgaW5rc2NhcGU6bG9ja2VkPSJmYWxzZSIgLz4KICAgIDxzb2RpcG9kaTpndWlkZQogICAgICAgcG9zaXRpb249Ii03LjE1NjE0MTYsMjUuODQxNjIzIgogICAgICAgb3JpZW50YXRpb249IjAsMSIKICAgICAgIGlkPSJndWlkZTk2MCIKICAgICAgIGlua3NjYXBlOmxvY2tlZD0iZmFsc2UiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNSI+CiAgICA8cmRmOlJERj4KICAgICAgPGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPgogICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PgogICAgICAgIDxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4KICAgICAgICA8ZGM6dGl0bGU+PC9kYzp0aXRsZT4KICAgICAgICA8Y2M6bGljZW5zZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cHM6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy9ncGwtMy4wLnR4dCIgLz4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPGcKICAgICBpbmtzY2FwZTpsYWJlbD0iQ2FscXVlIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuNTU2OTkzNCwtMjU5LjIyMzg0KSI+CiAgICA8ZwogICAgICAgaWQ9Imc0NjcwIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMC44MzY0NzYyNiwwLDAsMC44MzMzMTMwNSwwLjM5MTczNTYzLDQ2LjUxNjg3NykiPgogICAgICA8cmVjdAogICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsLTAuMzM0ODI0OTcsMC45NDIyODAzNCwwLDApIgogICAgICAgICByeT0iMC42NDczODQ3IgogICAgICAgICB5PSIyOTIuNzkyNDUiCiAgICAgICAgIHg9Ijk5LjUyODIwNiIKICAgICAgICAgaGVpZ2h0PSI2LjczODQxMjkiCiAgICAgICAgIHdpZHRoPSI0LjA4MTQxNzEiCiAgICAgICAgIGlkPSJyZWN0NDUzMiIKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4yMzA0NjQ0NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICAgICAgPHJlY3QKICAgICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMSwwLC0wLjMzNDgyNDk4LDAuOTQyMjgwMzQsMCwwKSIKICAgICAgICAgcnk9IjAuNTc0OTAwMjEiCiAgICAgICAgIHk9IjI5NS44OTg2OCIKICAgICAgICAgeD0iOTkuNTI2NDUxIgogICAgICAgICBoZWlnaHQ9IjMuNjMyMTU4OCIKICAgICAgICAgd2lkdGg9IjQuMDgzMTY5NSIKICAgICAgICAgaWQ9InJlY3Q0NTMyLTMiCiAgICAgICAgIHN0eWxlPSJmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjMwNDY0NDQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiIC8+CiAgICA8L2c+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4xMDI0MDM2NDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46YmV2ZWw7c3Ryb2tlLW1pdGVybGltaXQ6MDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJyZWN0NDYzMyIKICAgICAgIHdpZHRoPSIwLjUzNjc5NTk3IgogICAgICAgaGVpZ2h0PSIzLjA3NzAxMTEiCiAgICAgICB4PSI4NS4wMjA1MzgiCiAgICAgICB5PSIyODAuNjQyNzkiCiAgICAgICByeT0iMC4yMDI3NTE2NSIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwtMC4yOTExMDkwMiwwLjk1NjY4OTg5LDAsMCkiCiAgICAgICByeD0iMC4yNjgzOTc5OSIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjE2NzQxNjk1O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpiZXZlbDtzdHJva2UtbWl0ZXJsaW1pdDowO3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgaWQ9InJlY3Q0NjM5IgogICAgICAgd2lkdGg9IjMuMzc3NTQ5NiIKICAgICAgIGhlaWdodD0iMC4zMzIyMTgwMiIKICAgICAgIHg9IjEuMDUzMjMyMSIKICAgICAgIHk9IjI3MS4zMzk2NiIKICAgICAgIHJ5PSIwLjE2NjEwOTAxIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjIxODI3NDM7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMS4zMTYyMzgsMjcxLjY0NDIgYyAtMC4yNDkxNjM2LDEuMjQ1ODEgLTEuMjA0MjkwMjksMi4xMzE3MiAtMS4yMDQyOTAyOSwyLjEzMTcyIGwgNC41NDAzMTI3OSwwLjAyNzYgYyAwLDAgLTAuNTg4MzAzLC0xLjMxNDk3IC0wLjQ0OTg3ODgsLTIuMjI4NTkiCiAgICAgICBpZD0icGF0aDQ2NDEiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjIxNDc4NjdweDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMS43NzMwMzc4LDI3MS42NDQxOSBjIC0wLjIwNzYzNjMsMC45NzU4OSAtMC43MjY3MjcsMS43NzE4MyAtMC43MjY3MjcsMS43NzE4MyIKICAgICAgIGlkPSJwYXRoNDY0MyIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjIxNDc4NjdweDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMi4xNjc1NDYyLDI3MS42NTgwMyBjIC0wLjE2NjEwOSwwLjkwNjY4IC0wLjUzOTg1NDIsMS43NTc5OSAtMC41Mzk4NTQyLDEuNzU3OTkiCiAgICAgICBpZD0icGF0aDQ2NDUiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjIyMTQ3ODY3cHg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDIuNTc5NDIzNCwyNzEuNjM3MjYgYyAtMC4xMTc2NjA2LDAuOTU1MTMgLTAuMzg3NTg3NywxLjc3ODc2IC0wLjM4NzU4NzcsMS43Nzg3NiIKICAgICAgIGlkPSJwYXRoNDY0NyIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjIxNDc4NjdweDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMi45NzcyOTYzLDI3MS42NTExMiBjIC0wLjE3MzAzMDIsMS4zMjg4NyAtMC4yMDc2MzYyLDEuNzY0OSAtMC4yMDc2MzYyLDEuNzY0OSIKICAgICAgIGlkPSJwYXRoNDY0OSIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMjIxNDc4NjdweDtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMy4zNjExOTYxLDI3MS42NjQ5NiBjIDAuMDIwNzY0LDEuMDY1ODUgLTAuMDA2OTMsMS43NTEwNiAtMC4wMDY5MywxLjc1MTA2IgogICAgICAgaWQ9InBhdGg0NjUxIgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4yMjE0Nzg2N3B4O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAzLjcxNzg5NzMsMjcxLjY3MTg4IGMgMC4wMjA3NjQsMC44NjUxNSAwLjI2MzAwNTksMS43NDQxNCAwLjI2MzAwNTksMS43NDQxNCIKICAgICAgIGlkPSJwYXRoNDY1MyIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjIiAvPgogICAgPGVsbGlwc2UKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMTk1NjU4NTY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGlkPSJwYXRoOTUxIgogICAgICAgY3g9IjIuNDMwMzM0MSIKICAgICAgIGN5PSIyODcuMDA5OTUiCiAgICAgICByeD0iMi43ODM1NjUzIgogICAgICAgcnk9IjIuODIwODQ3NSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjE1MTQwODMzO3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTowLjQ1NDIyNDk2LCAwLjE1MTQwODMzO3N0cm9rZS1kYXNob2Zmc2V0OjAuMTQyODc0OTk7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXItc3RhcnQ6dXJsKCNBcnJvdzJMc3RhcnQpO21hcmtlci1lbmQ6dXJsKCNBcnJvdzJMZW5kKSIKICAgICAgIGQ9Ik0gMC4wMjY0ODAxMiwyODcuMDA5OTUgSCA0LjgzNDE4ODEiCiAgICAgICBpZD0icGF0aDc2OTMiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMTU5O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDowLjU0MDg1MDM3O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icmVjdDk1NCIKICAgICAgIHdpZHRoPSIyLjY0MjYyNzUiCiAgICAgICBoZWlnaHQ9IjQuMDIyNDA1NiIKICAgICAgIHg9IjEuMTA5MDIwNCIKICAgICAgIHk9IjI2MS44MTE0IgogICAgICAgcng9IjAuMzIwNjM1MzIiCiAgICAgICByeT0iMC4yNDIyMTE1MSIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDpub25lO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjE1OTAwMDAxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2UtZGFzaG9mZnNldDoyLjA0NDE1ODk0O3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBpZD0icmVjdDk1NiIKICAgICAgIHdpZHRoPSIzLjU3ODA3MDkiCiAgICAgICBoZWlnaHQ9IjAuNTg0NjUyMTMiCiAgICAgICB4PSIwLjYwMjc5NDY1IgogICAgICAgeT0iMjYxLjIyMzkxIgogICAgICAgcng9IjAuMzIwNjM1MzIiCiAgICAgICByeT0iMC4yNDIyMTE1MSIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjA2NTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAyLjEzMzM5MywyNjIuNTM2MzYgdiAyLjU5NTg2IgogICAgICAgaWQ9InBhdGg5NjgiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogICAgPHBhdGgKICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjAuMDY1O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICBkPSJtIDIuNzE0OTI1MiwyNjIuNTM2MzYgdiAyLjU5NTg2IgogICAgICAgaWQ9InBhdGg5NjgtNiIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICA8cGF0aAogICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6IzAwMDAwMDtzdHJva2Utd2lkdGg6MC4wNjU7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgIGQ9Im0gMS41NTE4NjA4LDI2Mi41MzYzNiB2IDIuNTk1ODYiCiAgICAgICBpZD0icGF0aDk2OC03IgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz4KICAgIDxwYXRoCiAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjA2NTtzdHJva2UtbGluZWNhcDpidXR0O3N0cm9rZS1saW5lam9pbjptaXRlcjtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIgogICAgICAgZD0ibSAzLjI5NjQ1NzIsMjYyLjUzNjM2IHYgMi41OTU4NiIKICAgICAgIGlkPSJwYXRoOTY4LTUiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPgogIDwvZz4KPC9zdmc+Cg=="},function(d,v,r){var i,o,h={},y=(i=function(){return window&&document&&document.all&&!window.atob},function(){return o===void 0&&(o=i.apply(this,arguments)),o}),f=function(e){var t={};return function(s){if(typeof s=="function")return s();if(t[s]===void 0){var a=(function(c){return document.querySelector(c)}).call(this,s);if(window.HTMLIFrameElement&&a instanceof window.HTMLIFrameElement)try{a=a.contentDocument.head}catch{a=null}t[s]=a}return t[s]}}(),C=null,m=0,A=[],x=r(7);function b(e,t){for(var s=0;s<e.length;s++){var a=e[s],c=h[a.id];if(c){c.refs++;for(var g=0;g<c.parts.length;g++)c.parts[g](a.parts[g]);for(;g<a.parts.length;g++)c.parts.push(N(a.parts[g],t))}else{var I=[];for(g=0;g<a.parts.length;g++)I.push(N(a.parts[g],t));h[a.id]={id:a.id,refs:1,parts:I}}}}function k(e,t){for(var s=[],a={},c=0;c<e.length;c++){var g=e[c],I=t.base?g[0]+t.base:g[0],p={css:g[1],media:g[2],sourceMap:g[3]};a[I]?a[I].parts.push(p):s.push(a[I]={id:I,parts:[p]})}return s}function P(e,t){var s=f(e.insertInto);if(!s)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var a=A[A.length-1];if(e.insertAt==="top")a?a.nextSibling?s.insertBefore(t,a.nextSibling):s.appendChild(t):s.insertBefore(t,s.firstChild),A.push(t);else if(e.insertAt==="bottom")s.appendChild(t);else{if(typeof e.insertAt!="object"||!e.insertAt.before)throw new Error(`[Style Loader]

 Invalid value for parameter 'insertAt' ('options.insertAt') found.
 Must be 'top', 'bottom', or Object.
 (https://github.com/webpack-contrib/style-loader#insertat)
`);var c=f(e.insertInto+" "+e.insertAt.before);s.insertBefore(t,c)}}function D(e){if(e.parentNode===null)return!1;e.parentNode.removeChild(e);var t=A.indexOf(e);t>=0&&A.splice(t,1)}function E(e){var t=document.createElement("style");return e.attrs.type===void 0&&(e.attrs.type="text/css"),R(t,e.attrs),P(e,t),t}function R(e,t){Object.keys(t).forEach(function(s){e.setAttribute(s,t[s])})}function N(e,t){var s,a,c,g;if(t.transform&&e.css){if(!(g=t.transform(e.css)))return function(){};e.css=g}if(t.singleton){var I=m++;s=C||(C=E(t)),a=l.bind(null,s,I,!1),c=l.bind(null,s,I,!0)}else e.sourceMap&&typeof URL=="function"&&typeof URL.createObjectURL=="function"&&typeof URL.revokeObjectURL=="function"&&typeof Blob=="function"&&typeof btoa=="function"?(s=function(p){var u=document.createElement("link");return p.attrs.type===void 0&&(p.attrs.type="text/css"),p.attrs.rel="stylesheet",R(u,p.attrs),P(p,u),u}(t),a=(function(p,u,_){var w=_.css,M=_.sourceMap,S=u.convertToAbsoluteUrls===void 0&&M;(u.convertToAbsoluteUrls||S)&&(w=x(w)),M&&(w+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(M))))+" */");var O=new Blob([w],{type:"text/css"}),Z=p.href;p.href=URL.createObjectURL(O),Z&&URL.revokeObjectURL(Z)}).bind(null,s,t),c=function(){D(s),s.href&&URL.revokeObjectURL(s.href)}):(s=E(t),a=(function(p,u){var _=u.css,w=u.media;if(w&&p.setAttribute("media",w),p.styleSheet)p.styleSheet.cssText=_;else{for(;p.firstChild;)p.removeChild(p.firstChild);p.appendChild(document.createTextNode(_))}}).bind(null,s),c=function(){D(s)});return a(e),function(p){if(p){if(p.css===e.css&&p.media===e.media&&p.sourceMap===e.sourceMap)return;a(e=p)}else c()}}d.exports=function(e,t){if(typeof DEBUG<"u"&&DEBUG&&typeof document!="object")throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs=typeof t.attrs=="object"?t.attrs:{},t.singleton||typeof t.singleton=="boolean"||(t.singleton=y()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var s=k(e,t);return b(s,t),function(a){for(var c=[],g=0;g<s.length;g++){var I=s[g];(p=h[I.id]).refs--,c.push(p)}for(a&&b(k(a,t),t),g=0;g<c.length;g++){var p;if((p=c[g]).refs===0){for(var u=0;u<p.parts.length;u++)p.parts[u]();delete h[p.id]}}}};var j,n=(j=[],function(e,t){return j[e]=t,j.filter(Boolean).join(`
`)});function l(e,t,s,a){var c=s?"":a.css;if(e.styleSheet)e.styleSheet.cssText=n(t,c);else{var g=document.createTextNode(c),I=e.childNodes;I[t]&&e.removeChild(I[t]),I.length?e.insertBefore(g,I[t]):e.appendChild(g)}}},function(d,v){d.exports=function(r){var i=typeof window<"u"&&window.location;if(!i)throw new Error("fixUrls requires window.location");if(!r||typeof r!="string")return r;var o=i.protocol+"//"+i.host,h=o+i.pathname.replace(/\/[^\/]*$/,"/");return r.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(y,f){var C,m=f.trim().replace(/^"(.*)"$/,function(A,x){return x}).replace(/^'(.*)'$/,function(A,x){return x});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(m)?y:(C=m.indexOf("//")===0?m:m.indexOf("/")===0?o+m:h+m.replace(/^\.\//,""),"url("+JSON.stringify(C)+")")})}},function(d,v,r){r.r(v);let i={centimeters:637100880,centimetres:637100880,degrees:180/Math.PI,feet:20902260511392e-6,inches:63710088e-1*39.37,kilometers:6371.0088,kilometres:6371.0088,meters:63710088e-1,metres:63710088e-1,miles:3958.761333810546,millimeters:6371008800,millimetres:6371008800,nauticalmiles:63710088e-1/1852,radians:1,yards:63710088e-1/1.0936};function o(n,l,e){const t={type:"Feature"};return((e=b(e)).id===0||e.id)&&(t.id=e.id),e.bbox&&(t.bbox=e.bbox),t.properties=l||{},t.geometry=n,t}function h(n,l,e){return o({type:"Point",coordinates:n},l,e=b(e))}function y(n,l,e){e=b(e);for(const t of n){if(t.length<4)throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");for(let s=0;s<t[t.length-1].length;s++)if(t[t.length-1][s]!==t[0][s])throw new Error("First and last Position are not equivalent.")}return o({type:"Polygon",coordinates:n},l,e)}function f(n,l,e){return o({type:"MultiPolygon",coordinates:n},l,e=b(e))}function C(n,l){if(n==null)throw new Error("distance is required");if(l&&typeof l!="string")throw new Error("units must be a string");var e=i[l||"kilometers"];if(!e)throw new Error(l+" units is invalid");return n/e}function m(n){if(n==null)throw new Error("radians is required");return 180*(n%(2*Math.PI))/Math.PI}function A(n){if(n==null)throw new Error("degrees is required");return n%360*Math.PI/180}function x(n){return!!n&&n.constructor===Object}function b(n){if(!x(n=n||{}))throw new Error("options is invalid");return n}function k(n){return n.type==="Feature"?n.geometry:n}function P(n,l,e,t){t=b(t);const s=function(u){if(!u)throw new Error("coord is required");if(!Array.isArray(u)){if(u.type==="Feature"&&u.geometry!==null&&u.geometry.type==="Point")return u.geometry.coordinates;if(u.type==="Point")return u.coordinates}if(Array.isArray(u)&&u.length>=2&&!Array.isArray(u[0])&&!Array.isArray(u[1]))return u;throw new Error("coord must be GeoJSON Point or an Array of numbers")}(n),a=A(s[0]),c=A(s[1]),g=A(e),I=C(l,t.units),p=Math.asin(Math.sin(c)*Math.cos(I)+Math.cos(c)*Math.sin(I)*Math.cos(g));return h([m(a+Math.atan2(Math.sin(g)*Math.sin(I)*Math.cos(c),Math.cos(I)-Math.sin(c)*Math.sin(p))),m(p)],t.properties)}var D=function(n,l,e){const t=(e=b(e)).steps||64,s=e.properties?e.properties:!Array.isArray(n)&&n.type==="Feature"&&n.properties?n.properties:{},a=[];for(let c=0;c<t;c++)a.push(P(n,l,-360*c/t,e).geometry.coordinates);return a.push(a[0]),y([a],s)},E=r(0);function R(n,l){var e,t,s,a,c,g,I,p,u,_,w=0,M=n.type==="FeatureCollection",S=n.type==="Feature",O=M?n.features.length:1;for(e=0;e<O;e++){for(g=M?n.features[e].geometry:S?n.geometry:n,p=M?n.features[e].properties:S?n.properties:{},u=M?n.features[e].bbox:S?n.bbox:void 0,_=M?n.features[e].id:S?n.id:void 0,c=(I=!!g&&g.type==="GeometryCollection")?g.geometries.length:1,s=0;s<c;s++)if((a=I?g.geometries[s]:g)!==null)switch(a.type){case"Point":case"LineString":case"MultiPoint":case"Polygon":case"MultiLineString":case"MultiPolygon":if(l(a,w,p,u,_)===!1)return!1;break;case"GeometryCollection":for(t=0;t<a.geometries.length;t++)if(l(a.geometries[t],w,p,u,_)===!1)return!1;break;default:throw new Error("Unknown Geometry Type")}else if(l(null,w,p,u,_)===!1)return!1;w++}}var N={circle:D,union:function(n){const l=[];R(n,function(t){t.type==="Polygon"?l.push(t.coordinates):t.coordinates.forEach(function(s){l.push(s)})});var e=E.union(l);return e.length===0?null:f(e)},difference:function(n,l){var e=k(n),t=k(l),s=n.properties||{},a=E.difference(e.coordinates,t.coordinates);return a.length===0?null:f(a,s)}};r(1);const j=L.Control.extend({options:{position:"topright",radius:30,minRadius:10,maxRadius:50,layerOptions:{},drawOptions:{weight:1},eraseOptions:{color:"#ff324a",weight:1},menu:{drawErase:!0,size:!0,eraseAll:!0}},_latlng:[0,0],_metersPerPixel:{},onAdd:function(n){return this._map=n,this.setRadius(this.options.radius),this.options.menu===!1?L.DomUtil.create("div"):(this._container=L.DomUtil.create("div","leaflet-control-paintpolygon leaflet-bar leaflet-control"),this._createMenu(),this._container)},onRemove:function(){this._map.off("mousemove",this._onMouseMove,this)},setRadius:function(n){n!==void 0&&(n<this.options.minRadius?this._radius=this.options.minRadius:n>this.options.maxRadius?this._radius=this.options.maxRadius:this._radius=n),this._circle&&this._circle.setRadius(this._radius)},startDraw:function(){this.stop(),this._action="draw",this._addMouseListener(),this._circle=L.circleMarker(this._latlng,this.options.drawOptions).setRadius(this._radius).addTo(this._map)},startErase:function(){this.stop(),this._action="erase",this._addMouseListener(),this._circle=L.circleMarker(this._latlng,this.options.eraseOptions).setRadius(this._radius).addTo(this._map)},stop:function(){this._action=null,this._circle&&this._circle.remove(),this._removeMouseListener()},getLayer:function(){return this._layer},setData:function(n){this._data=n,this._layer!==void 0&&this._layer.remove(),this._layer=L.geoJSON(this._data,this.options.layerOptions).addTo(this._map)},getData:function(){return this._data},eraseAll:function(){this.setData()},_createMenu:function(){if(this.options.menu.drawErase!==!1&&(this._iconDraw=L.DomUtil.create("a","leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-brush",this._container),this._iconErase=L.DomUtil.create("a","leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-eraser",this._container),L.DomEvent.on(this._iconDraw,"click mousedown",this._clickDraw,this),L.DomEvent.on(this._iconErase,"click mousedown",this._clickErase,this)),this.options.menu.size!==!1){this._iconSize=L.DomUtil.create("a","leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-size",this._container),this._menu=L.DomUtil.create("div","leaflet-bar leaflet-control-paintpolygon-menu",this._container),L.DomEvent.disableClickPropagation(this._menu);var n=L.DomUtil.create("div","leaflet-control-paintpolygon-menu-content",this._menu),l=L.DomUtil.create("input","",n);l.type="range",l.value=this._radius,l.min=this.options.minRadius,l.max=this.options.maxRadius,L.DomEvent.on(l,"input change",this._cursorMove,this),L.DomEvent.on(this._iconSize,"click mousedown",this._clickSize,this)}this.options.menu.eraseAll!==!1&&(this._iconEraseAll=L.DomUtil.create("a","leaflet-control-paintpolygon-icon leaflet-control-paintpolygon-icon-trash",this._container),L.DomEvent.on(this._iconEraseAll,"click mousedown",this._clickEraseAll,this))},_clickDraw:function(n){n.type!="mousedown"?(this._resetMenu(),this._action=="draw"?this.stop():(this.startDraw(),this._activeIconStyle(this._iconDraw))):L.DomEvent.stop(n)},_clickErase:function(n){n.type!="mousedown"?(this._resetMenu(),this._action=="erase"?this.stop():(this.startErase(),this._activeIconStyle(this._iconErase))):L.DomEvent.stop(n)},_clickSize:function(n){n.type!="mousedown"?L.DomUtil.hasClass(this._menu,"leaflet-control-paintpolygon-menu-open")?this._closeMenu():this._openMenu():L.DomEvent.stop(n)},_clickEraseAll:function(n){this.eraseAll()},_resetMenu:function(){L.DomUtil.removeClass(this._iconDraw,"leaflet-control-paintpolygon-icon-active"),L.DomUtil.removeClass(this._iconErase,"leaflet-control-paintpolygon-icon-active")},_activeIconStyle:function(n){L.DomUtil.addClass(n,"leaflet-control-paintpolygon-icon-active")},_openMenu:function(){L.DomUtil.addClass(this._menu,"leaflet-control-paintpolygon-menu-open")},_closeMenu:function(){L.DomUtil.removeClass(this._menu,"leaflet-control-paintpolygon-menu-open")},_cursorMove:function(n){this.setRadius(n.target.valueAsNumber)},_addMouseListener:function(){this._map.on("mousemove",this._onMouseMove,this),this._map.on("mousedown",this._onMouseDown,this),this._map.on("mouseup",this._onMouseUp,this)},_removeMouseListener:function(){this._map.off("mousemove",this._onMouseMove,this),this._map.off("mousedown",this._onMouseDown,this),this._map.off("mouseup",this._onMouseUp,this)},_onMouseDown:function(n){this._map.dragging.disable(),this._mousedown=!0,this._onMouseMove(n)},_onMouseUp:function(n){this._map.dragging.enable(),this._mousedown=!1},_onMouseMove:function(n){this._setLatLng(n.latlng),this._mousedown===!0&&this._stackEvt(n.latlng,this._map.getZoom(),this._radius,this._action)},_setLatLng:function(n){n!==void 0&&(this._latlng=n),this._circle&&this._circle.setLatLng(this._latlng)},_latLngAsGeoJSON:function(n){return{type:"Point",coordinates:[n.lng,n.lat]}},_getCircleAsPolygon:function(n,l,e){var t=n.lat;return this._metersPerPixel[l]===void 0&&(this._metersPerPixel[l]=40075016686e-3*Math.abs(Math.cos(t*Math.PI/180))/Math.pow(2,l+8)),N.circle(this._latLngAsGeoJSON(n),this._metersPerPixel[l]*e/1e3,{})},_draw:function(n,l,e){if(this._data===void 0||this._data===null)this.setData(this._getCircleAsPolygon(n,l,e));else{let t={type:"FeatureCollection",features:[this._data,this._getCircleAsPolygon(n,l,e)]};this.setData(N.union(t))}},_erase:function(n,l,e){this._data!==void 0&&this._data!==null&&this.setData(N.difference(this._data,this._getCircleAsPolygon(n,l,e)))},_stackEvt:function(n,l,e,t){this._stack===void 0&&(this._stack=new Array),this._stack.push({latlng:n,zoom:l,radius:e,action:t}),this._processStack()},_processStack:function(){if(this._processingStack!==!0&&this._stack.length!=0){this._processingStack=!0;var n=this._stack.shift();n.action=="draw"?this._draw(n.latlng,n.zoom,n.radius):n.action=="erase"&&this._erase(n.latlng,n.zoom,n.radius),this._processingStack=!1,this._processStack()}}});L.Control.PaintPolygon=j,L.control.paintPolygon=n=>new L.Control.PaintPolygon(n),v.default=j}]);
