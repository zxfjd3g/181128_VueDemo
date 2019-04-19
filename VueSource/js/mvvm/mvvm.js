/*
相当于Vue函数
 */
function MVVM(options) {
  // 将配置对象保存到vm上
  this.$options = options;
  // 将data数据对象保存到vm和data变量上
  var data = this._data = this.$options.data;
  // 保存vm到me变量
  var me = this;

  // 遍历data中的所有属性
  Object.keys(data).forEach(function (key) {
    // 对指定属性名的属性实现数据代理
    me._proxy(key);
  });

  observe(data, this);

  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // 保存vm
    var me = this;
    // 给vm添加指定属性名的属性(使用属性描述符)
    Object.defineProperty(me, key, {
      // 不让更新定义(避免外部覆盖)
      configurable: false,
      // 可以枚举
      enumerable: true,
      // 当vm.xxx读取属性值调用返回属性值
      get: function proxyGetter() {
        // 读取data中对应属性的值
        return me._data[key];
      },
      // 当vm.xxx = value时调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data对应的属性上
        me._data[key] = newVal;
      }
    });
  }
};