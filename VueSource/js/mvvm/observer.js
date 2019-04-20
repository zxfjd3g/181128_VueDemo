function Observer(data) {
  // 保存data对象
  this.data = data;
  // 走起 startup
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function (key) {
      // 对data中指定属性定义响应式属性
      me.defineReactive(data, key, data[key])
    });
  },

  defineReactive: function (data, key, val) {
    // 为当前属性定义一个对应的dep对象
    var dep = new Dep();  // depend 依赖  (内部保存所有依赖了当前属性的watcher)
    // 通过隐式递归调用, 实现对data中所层次属性的监视劫持
    var childObj = observe(val);

    // 通过属性描述符的方法给data重新定义属性(添加setter/getter)
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define

      get: function () {
        // 建立dep与watcher之间关系
        // dep ---> watcher   1: n
        // watcher ---> dep   1: n
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      // data中的属性值发生了改变调用, 最终更新所有相关节点
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通过dep(订阅器)通知所有相关的watcher(订阅者)
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  if (!value || typeof value !== 'object') {
    return;
  }

  // 创建一个对应的监视者
  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = []; // subscribers 多个订阅者(watcher)数组
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历每个订阅者, 一个一个的通知
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;