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


