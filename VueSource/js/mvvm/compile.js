function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 得到el元素并保存
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el元素存在
  if (this.$el) {
    // 1. 将el元素中的所有子节点转移到一个fragment容器中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所有层次子节点
    this.init();
    // 3. 将解析好的fragment添加到el中
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /*
  编译el的所有层次子节点
   */
  compileElement: function (el) {
    // 得到所有最外层子节点
    var childNodes = el.childNodes,
      me = this;
    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 匹配插值的正则对象, 包含子匹配(用来匹配出表达式)
      var reg = /\{\{(.*)\}\}/;   // {{name}}

      // 如果是元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点中所有指令属性
        me.compile(node);
        // 如果插值格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译文本节点
        me.compileText(node, RegExp.$1);
      }

      // 如果当前子节点还有子节点, 通过递归调用实现对所有层次子节点的编译
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 得到所有属性节点
    var nodeAttrs = node.attributes,
      me = this;
    // 遍历所有属性节点
    [].slice.call(nodeAttrs).forEach(function (attr) {
      //  得到属性名: v-on:click
      var attrName = attr.name;
      // 如果指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值, 表达式  test
        var exp = attr.value;
        // 得到指令名: on:click
        var dir = attrName.substring(2);
        // 如果是事件指令
        if (me.isEventDirective(dir)) {
          // 解析事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 如果普通指令
        } else {
          // 解析普通指令
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        // 删除指令属性
        node.removeAttribute(attrName);
      }
    });
  },

  /*
  编译文本节点
  exp: 表达式 name
   */
  compileText: function (node, exp) {
    // 调用编译工具对象进行编译
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

// 包含编译指令/插值方法的对象
var compileUtil = {
  // 编译 v-text/{{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  // 编译v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  // 编译v-model
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  // 编译v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  真正用来编译指定指令/{{}}的方法
   */
  bind: function (node, vm, exp, dir) {
    // 根据指令名得到用于更新节点的函数
    var updaterFn = updater[dir + 'Updater'];

    /*
    执行更新节点的函数
    node: 要更新的节点
    this._getVMVal(vm, exp): 得到表达式对应的属性值
     */
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 解析事件指令
  eventHandler: function (node, vm, exp, dir) {
    // 得到事件名/类型  click
    var eventType = dir.split(':')[1],
      // 得到处理事件的回调函数 (根据表达式去methods中取)
      fn = vm.$options.methods && vm.$options.methods[exp];

    if (eventType && fn) {
      // 给元素点绑定指定事件名和回调函数的DOM事件监听, 回调函数this被强制指定为vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  /*
  通过vm得到表达式对应的值
   */
  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  /*
  将最新的值设置给表达式对应的属性值
   */
  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

/*
包含一些更新节点方法的对象
 */
var updater = {
  // 更新节点的textContent属性
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML属性
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className属性
  classUpdater: function (node, value, oldValue) {
    // 得到静态class值
    var className = node.className;
    node.className = className ? (className + ' ' + value) : value
  },

  // 更新节点的value属性
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};