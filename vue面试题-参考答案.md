# day01
## 1. 说说MVVM设计模式
    M: Model(模型), vue中是data(为view提供数据)
    V: View(视图), vue中是模板页面(显示data中的数据)
    VM: ViewModel(视图模型), vue中是Vue实例对象(管理者: 数据绑定/DOM监听) 
    
## 2. 说说你对计算属性的理解
    什么时候用计算属性?
       模板显示要显示的数据是根据n个已有的相关数据进行计算来确定
    getter: get方法, 当读取属性值时/相关数据发生了改变自动调用, 根据相关数据进行计算并返回结果, this就是vm
    setter: set方法, 当修改了当前属性的值自动调用, 监视属性值的变化去更新相关数据, this就是vm

## 3. 说说回调函数的判断及相关问题
    1. 什么函数?
        1). 你定义的
        2). 你没有调用
        3). 但最终执行了(在后面的某个时刻或者某个条件下)
    2. 关于回调函数相关的3个问题
        1). 什么时候调用
        2). 用来做什么的
        3). this是谁

## 4. 说说2种类型的数据容器
    1). 对象
      属性值才是我们要存的数据
      属性名是数据的标识名称, 根据标识名来操作数据
    2). 数组
      数组中的元素就是我们要存的数据
      元素的下标就是数据的标识名称, 根据标识名来操作数据
    3). 选择哪种容器
      一般有序的用数组, 不强调顺序的可用对象
      如果需要根据标识数据查找数据对象, 用对象容器比用数组容器效率高

## 5. git的6个基本操作
    1). 创建本地仓库
       创建.gitignore配置文件
       git init
       git add *
       git commit -m "xxx"
    2). 创建远程仓库
       New Repository
       指定名称
       创建
    3). 将本地仓库推送到远程仓库
       git remote add origin https://github.com/zxfjd3g/xxx.git 关联远程仓库
       git push origin master
    4). 如果本地有更新, 推送到远程
       git add *
       git commit -m "xxx"
       git push origin master
    5). 如果远程有更新, 拉取到本地
       git pull origin master
    6). 克隆远程仓库到本地
       git clone https://github.com/zxfjd3g/xxx.git
       
## 6. data中的数组与对象属性不同处理
    数组: 重写数组更新数组元素的方法, 只要调用数组的这些方法, 就会更新相应的界面
    对象: 对对象中的属性进行setter监视, 只要设置了新的属性值, 就会更新相应的界面
    
## 7. 区别computed与method和watch
    1). computed与method: computed有缓存可以避免重复计算, 而method不可以
    2). computed与watch: 
        get(): 可以监视所有依赖数据, 编码简洁, 但只能同步计算产生一个需要显示的结果数据
        watch: 可以监视所有依赖数据, 编码麻烦, 可以进行异步/长时间处理后更新数据显示

## 8. 函数的2个角色, 方法与属性, 方法与函数
    1). 函数的2个角色:
        函数: 通过()调用
        对象: 通过.操作属性或方法, 此时可以称之为函数对象
    2). 方法与属性
        方法是一个特别的属性: 属性值是函数
    3). 方法与函数
        在对象内定义的常称为方法, 通过对象调用的常称为方法, 其它常称为函数
    
# day02
## 1. 写出7个指令及其作用
    v-text: 设置标签体文本
    v-html: 设置标签体子标签
    v-if/v-else/v-show: 显示/隐藏
    v-for: 遍历显示列表
    v-bind: 强制绑定表达式, 简写:
    v-on: 绑定事件监听, 简写@
    v-model: 双向数据绑定
    
## 2. 写出vue 7个配置选项及其作用
    el: 最外层元素选择器
    props: 声明接收哪些属性
    data: 状态数据
    computed: 计算属性
    methods: 事件回调函数
    watch: 监视属性变化
    directives: 注册局部指令
    filters: 注册局部过滤器
    components: 局部注册组件
    
## 3. 说说vue的生命周期
    1). 初始化
       beforeCreate()
       created()
       beforeMount()
       mounted(): 异步任务(发ajax请求/启动定时器)
    2). 更新
       beforeUpdate()
       updated()
    3). 死亡
       beforeDestroy(): 收尾工作(清除定时器)
       destroyed()

## 4. 说说项目开发中常用的ES6新语法
    比较简单
    比较重要/有点难度的

    定义变量/常量: const/let
    解构赋值: let {a, b} = this.props / import {aa} from 'xxx' / function f ({name}) {}
    对象的简洁表达: {a, b, c () {}}
    箭头函数: 
       组件的自定义方法: xxx = () => {}
       匿名函数作为实参
       优点:
          * 简洁
          * 没有自己的this,使用引用this查找的是外部this
    扩展运算符: ...
    类: class/extends/constructor/super
    ES6模块化: export/default/import
    异步: promise, async/await

## 5. 比较函数的call()/apply()/bind()
    1). call(obj, param1, param2)/apply(obj, [[param1, param2])
       调用/执行函数
       只是强制指定函数中的this为第一个参数指定的对象
       如果函数执行需要传参数, call是依次传递, apply需要封装成数组传递
    2). bind(obj)
       返回一个新函数, 不会自动执行, 需要手动执行
       新函数内部会通过原函数对象的call来调用原本的函数, 并指定函数的this为obj
       如果直接调用原来函数, this没有绑定为obj

## 6. babel的插件和预设
    未来版本 ECMAScript 标准经历五个阶段：Strawman（稻草人），Proposal（提议），Draft（草案），Candidate（候选）以及 Finished （完成）
    也就是对应 stage0、stage1、stage2、stage3、stage4 五个阶段
    babel常用的预设包:
        es2015：包含 es2015 语法标准所有相关插件
        es2016：包含 es2016 语法标准所有相关插件
        es2017：包含 es2017 语法标准所有相关插件
        latest：包含从 2015 开始历年语法标准所有相关插件
        env：在 latest 基础上提供环境配置能力，比如可以配置只支持某一个浏览器的某几个版本，会自动按需启用、禁用插件
        stage-0：包含处于标准提案 stage 0 阶段的语法所有相关插件
        stage-1：包含处于标准提案 stage 1 阶段的语法所有相关插件
        stage-2：包含处于标准提案 stage 2 阶段的语法所有相关插件
        stage-3：包含处于标准提案 stage 3 阶段的语法所有相关插件
    预设包与插件包的关系
        一个插件包只能解析1种语法
        预设包是n个插件包的的集合包
    babel的配置: .babelrc
        {
          presets: [], // 配置所有需要的预设包
          plugins: [], // 配置额外需要的插件包
        }
    
## 7. props和v-model
    问题: v-model指向父组件传入的属性, 会导致直接更新父组件的数据, 这违背了组件化开发单向数据流的基本原则
    解决:
        方法1: data + watch
        方法2: 计算属性get + set

# day03
## 1. 说说vue组件间通信的几种方式
    1). props
        父子组件间通信的基本方式
        属性值的2大类型: 
            一般: 父组件-->子组件
            函数: 子组件-->父组件
        隔层组件间传递: 必须逐层传递(麻烦)
        兄弟组件间: 必须借助父组件(麻烦)
    2). vue自定义事件
        方式1: 给子组件标签绑定事件监听
            子组件向父组件的通信方式
            功能类似于function props
            不适合隔层组件和兄弟组件间的通信
        方式2: 通过单独的vm对象绑定监听/分发事件
            任意组件间通信
    3). 消息订阅和发布(pubsub-js)
        适合于任何关系的组件间通信
        缺点: 管理不够集中
    4). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比pubsub强大, 更适用于vue项目
    5). slot
        父向子通信
        通信是带数据的标签
        注意: 标签是在父组件中解析


## 2. 组件化编码流程和2个重要问题
    1). 流程
        1. 拆分组件: 拆分界面, 定义组件
        2. 静态组件
        3. 动态组件
           1). 动态初始化显示
           2). 交互
    2). 2个问题
        1. 数据保存在哪个组件?   哪个组件需要还是哪些组件需要
        2. 更新数据的方法定义在哪个组件?   与数据同在一个组件

## 3. 详细说明如何判断函数中的this
    1). 正常情况: 执行函数的方式决定了函数中的this
       直接调用: fn()       window
       new调用: new fn()   新创建的对象 
       对象调用: obj.fn()   obj对象
       call/apply调用: fn.call(obj)   第一个参数指定的对象
    2). 特别情况:
       bind()返回的函数: fn2 = fn.bind(obj) fn2()第一个参数指定的对象
       箭头函数: 使用的外部的this(内部没有自己的this) fn = () => {} fn()
       回调函数
          定时器回调/ajax回调/数组遍历相关方法回调: window
          dom事件监听回调: dom元素
          组件生命周期回调: 组件对象
    3). 在开发我们经常会利用箭头函数/bind()来改变this的指向
    
## 4. 关于2个引用变量指向同一个对象的2个问题
    1). 2个引用变量指向同个对象, 通过一个引用变量改变对象内部的数据, 另一个引用变量看到的新的
    2). 2个引用变量指向同个对象, 让一个引用变量指向一个新的对象, 另一个引用变量看到的还是原来的对象
    
## 5. 说说读取表达式a.b的值的查找流程
    先查找a, 沿着作用域链查找, 找不到报错(变量未定义)
    找到后查找对象上的b属性, 查找原型链, 如果找不到返回undefined
    
# day04
## 1. 说说vue项目中如何与后台通信
    1). 通过ajax请求与后台通信
    2). 常用的库
       vue-resource: vue的插件, 用于vue1.x
       axios: 独立的第三方库, 用于vue2.x
       fetch: 较新的原生方式, 但需要引入兼容包: fetch.js
    3). 执行请求代码的时机
       初始化异步显示: mounted()
       特定用户操作后异步显示: 事件回调函数或相关函数中
       
## 2. 说说你对事件处理机制的理解
    1). DOM事件
       * 绑定事件监听
          * 事件名(类型): 只有有限的几个, 不能随便写
          * 回调函数: 接收包含相关数据的event, 处理事件
       * 用户操作界面自动触发事件(event)
          * 事件名(类型)
          * 数据: event
    2). 自定义事件(如vue自定义事件/pubsub等)
       * 绑定事件监听
          * 事件名(类型): 任意
          * 回调函数: 通过形参接收数据, 在函数体处理事件
       * 触发(emit)/分发(dispatch)事件(编码)
          * 事件名(类型): 与绑定的事件监听的事件名一致
          * 数据: 会自动传递给回调函数

## 3. async/await的作用和使用
    1). 作用?
        简化pormise的使用(不用再使用then()/catch()来指定成功或失败的回调函数)
        以同步编码的方式实现异步流程(没有回调函数)
    2). 哪里使用await?
        在返回promise对象的表达式左侧, 为了直接得到异步返回的结果, 而不是promsie对象
    3). 哪里使用async?
        使用了await的函数定义左侧

## 4. GET请求的2种请求参数
    1). query参数: 
       路由path: /register
       请求path: /register?username=xxx&password=yyy   
       获取参数: req.query.username
    2). param参数: 
       路由path: /register/:username/:password
       请求path: /register/xxx/123   
       获取参数: req.params.username

## 5. vm对象与组件对象的关系
    1). 组件对象是Vue的子类型对象, Vue原型对象上的属性/方法所有组件对象都可以访问
    2). 一旦将某个数据或行为添加到Vue原型对象上, 那所有组件中都可通过this轻松访问
    3). 事件总线(EventBus)对象的存储: Vue.prototype.$eventBus = new Vue(), 在组件中直接访问: this.$eventBus

# day05
## 1. vue-router提供了哪些语法?
    1). 1个函数:
        VueRouter: 路由构建函数, 用于创建路由器对象, 配置路由
    2). 2个对象
        $route: 代表当前路由的对象, 包含当前路由相关信息(path, params参数, query参数)
        $router: 代表路由器对象, 包含控制路由跳转的方法(push/replce/back())
    3). 2个标签
        <router-link>: 路由链接, 生成路由链接
        <router-view>: 路由视图, 显示当前路由组件
    
## 2. 说说vue的数据代理
    1.通过一个对象(vm)代理对另一个对象(data)中属性的操作(读/写)
    2.好处: 更方便的操作data中的数据
    3.基本实现流程
      1). 通过Object.defineProperty()给vm添加与data对象的属性对应的属性描述符
      2). 所有添加的属性都包含getter/setter
      3). 在getter/setter内部去操作data中对应的属性数据

## 3. 区别一般的HTTP请求与AJAX请求
    相同点: 都是向服务器提交的http请求
    不同点:             
                       --普通的HTTP--            --ajax请求--
       得到             页面(一般)                json(一般)
       浏览器处理响应    自动显示新数据页面         不会刷新/更新页面, 需要手动处理更新
       数据渲染          服务器端                 浏览器端
       应用类型         多页应用                  单页应用

## 4. 说说debug调试
    1). 调试的目的
         1). 查找bug: 不断缩小可疑代码的范围
         2). 查看程序的运行流程(用于熟悉新接手项目的代码)
       
    2). 如何开启调试模式
         1). 添加语debugger句: 程序运行前     此方式用打包后才运行的项目
         2). 添加(打)断点: 程序运行前或者过程中   此方式用运行源码js
       
    3). 如何进行调试操作
         resume: 恢复程序执行(可能执行完或者进入下一个断点处)
         step ove: 单步跳转, 尝试执行完当前语句, 进入下一条(如果内部有断点, 自动进入内部断点处)
         step into: 跳入, 进入当前调用函数内部
         step out: 跳出, 一次性执行完当前函数后面所有语句,并出去
         deactivate breakpoints: 使所有断点暂时失效
         
         call stack: 显示是程序函数调用的过程
         scope: 当前执行环境对应的作用域中包含的变量数据
         breakpoints: 断点列表

## 5. 内存结构图(原型结构图)
    function Foo () {}  // new Function()
    const fn1 = new Foo()
    const fn2 = new Foo()
    const o1 = {}
    const o2 = new Object()
![](http://baocangwh.cn/t6/702/1555977496x2890173947.png)


# day06
## 1. 说说vue模板解析
    1). 目的
       实现初始化显示
    2). 整体流程
       1. 将el的所有子节点取出, 添加到一个新建的文档fragment对象中
       2. 对fragment中的所有层次子节点递归进行编译解析处理
       3. 将解析后的fragment添加到el中显示
    3). 编译/解析包含大括号表达式的文本节点: textNode.textContent = value
    4). 编译事件指令: elementNode.addEventListener('eventName', callback)
    5). 编译一般指令: elementNode.xxx = value

## 2. 说说数据绑定的理解和基本原理
    1). 作用:
       实现数据的更新显示
    2). 基本原理:  数据劫持 + 订阅者-发布者
       a.在observer中, 通过Object.defineProperterty()给data中所有属性添加setter/getter, 实现数据劫持
       b.为每个data中的属性创建一个对应的dep对象(订阅器)
       c.为模板中的每个表达式创建对应的watcher对象(订阅者), 并关联到对应的dep上
       d.一旦data中的数据发生变化, setter(发布者)会通过dep对象通知所有关联的watcher, watcher收到通知后就更新对应的节点

## 3. Vue实现数据双向绑定的原理
    1). 双向数据绑定是单向数据绑定的基础上的, 所以先简单说清单向数据绑定, 再说双向
    2). vue单向数据绑的实现：
        数据劫持 + 订阅者-发布者模式的方式，
        通过Object.defineProperty()来劫持/监视data中的属性，在数据变动时发布消息给所有订阅者，每个订阅者去更新对应的DOM节点。
    3). 双向绑定: 给元素绑定input监听, 一旦输入改变了, 将最新的值保存到对应的属性上

## 4. Vue的MVVM实现结构图
![](http://baocangwh.cn/t6/702/1555977325x2890173947.png)

