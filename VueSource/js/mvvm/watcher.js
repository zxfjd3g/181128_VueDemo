function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.depIds = {};   // d0 d1   {0: d0, 1: d1}
  // 获取表达式对应的值保存
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    // 得到表达式最新的值
    var value = this.get();
    // 得到老的值
    var oldVal = this.value;
    if (value !== oldVal) {
      // 保存最新的值
      this.value = value;
      // 调用更新节点的回调函数去更新界面上的节点
      this.cb.call(this.vm, value, oldVal);
    }
  },

  addDep: function (dep) {
    // 如果dep与watcher的关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 将watcher添加到dep中去 ==> 建立dep到watcher的关系
      dep.addSub(this);
      // 将dep添加到watcher中去  ==> 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    // 将当前watcher关联到Dep上
    Dep.target = this;
    // 读取data中对应的属性值 ===> 导致属性的getter调用  ==>建立dep与watcher之间的关系
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};