## 1. vue脚手架

	用来创建vue项目的工具包
	创建项目:
	    npm install -g vue-cli
	    vue init webpack VueDemo
	开发环境运行:
	    cd VueDemo
	    npm install
	    npm run dev
	生产环境打包发布
	    npm run build
	    npm install -g serve
	    serve dist
	    http://localhost:5000


## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程
    vue文件包含3个部分
        <template>
          <div></div>
        </template>
        <script>
            export default {
    		 props: []/{}
              data(){},
    		 computed: {}
              methods: {},
    		  
    		  watch: {}
    		  filters: {}
    		  directives: {}
    		  components: {}
            }
        </script>
        <style>
        </style>
    组件化编码的基本流程
    	1). 拆分界面, 抽取组件
    	2). 编写静态组件
    	3). 编写动态组件
        	初始化数据, 动态显示初始化界面
        	实现与用户交互功能
    组件通信的5种方式
    	props
    	vue的自定义事件
    	pubsub第三方库
    	slot
    	vuex(后面单独讲)
    props:
        父子组件间通信的基本方式
        属性值的2大类型: 
            一般/非函数: 父组件-->子组件
            函数: 子组件-->父组件
    	隔层组件间传递: 必须逐层传递(麻烦)
    	兄弟组件间: 必须借助父组件(麻烦)
    vue自定义事件
        方式1: 给子组件标签绑定事件监听
            子组件向父组件的通信方式
            功能类似于function props
            不适合隔层组件和兄弟组件间的通信
        方式2: 通过单独的vm对象绑定监听/分发事件
            任意组件间通信
    pubsub第三方库(消息订阅与发布)
        适合于任何关系的组件间通信
    slot
        通信是带数据的标签
        注意: 标签是在父组件中解析
    vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比pubsub强大, 更适用于vue项目

## 4. ajax
    相关库:
        vue-resource: vue插件, 多用于vue1.x
        axios: 第三方库, 多用于vue2.x
    vue-resource使用
        // 引入模块
        import VueResource from 'vue-resource'
        // 使用插件
        Vue.use(VueResource)
        
        // 通过vue/组件对象发送ajax请求
        this.$http.get('/someUrl').then((response) => {
          // success callback
          console.log(response.data) //返回结果数据
        }, (response) => {
          // error callback
          console.log(response.statusText) //错误信息
        })
    axios使用
        // 引入模块
        import axios from 'axios'
        
        // 发送ajax请求
        axios.get(url)
          .then(response => {
            console.log(response.data) // 得到返回结果数据
          })
          .catch(error => {
        	console.log(error.message)
          })

## 5. vue-router
    vue用来实现SPA的插件
    使用vue-router
        1. 创建路由器: router/index.js
          new VueRouter({
            routes: [
              { // 一般路由
                path: '/about',
                component: About
              },
              { // 自动跳转路由
                path: '/', 
                redirect: '/about'
              }
            ]
          })
        2. 注册路由器: main.js
           import router from './router'
           	new Vue({
           		router
           	})
        3. 使用路由组件标签:
           	<router-link to="/xxx">Go to XXX</router-link>
           	<router-view></router-view>
    编写路由的3步
        1. 定义路由组件    
        2. 映射路由
        3. 编写路由2个标签
    嵌套路由
        children: [
            {
              path: '/home/news/:xxx/:yyy',
              component: news
            },
            {
              path: 'message',
              component: message
            }
         ]
    向路由组件传递数据
        params/query: <router-link to="/home/news/abc/123?zzz=1234">
        props: <router-view msg='abc'>
    缓存路由组件
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
    路由的编程式导航
    	this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
    	this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
    	this.$router.back(): 请求(返回)上一个记录路由
    	
# vue MVVM分析
## 1. 准备
	1.Array.prototype.slice.call(lis): 将伪数组生成一个真数组
	2.node.nodeType: 得到节点类型
	3.Object.defineProperty(obj, propertyName, {}): 给对象添加/修改属性(指定描述符)
		* configurable: true/false  是否可以重新define
		* enumerable: true/false 是否可以枚举(for..in / keys())
		* value: 指定初始值
		* writable: true/false value是否可以修改存取(访问)描述符
		* get: 函数, 用来得到当前属性值
		* set: 函数, 用来监视当前属性值的变化
	4.Object.keys(obj): 得到对象自身可枚举的属性名的数组
	5.DocumentFragment: 文档碎片(高效批量更新多个节点)
	6.obj.hasOwnProperty(prop): 判断prop是否是obj自身的属性

## 2. 数据代理(MVVM.js)
	1.通过一个对象代理对另一个对象中属性的操作(读/写)
	2.通过vm对象来代理data对象中所有属性的操作
	3.好处: 更方便的操作data中的数据
	4.基本实现流程
		1). 通过Object.defineProperty()给vm添加与data对象的属性对应的属性描述符
		2). 所有添加的属性都包含getter/setter
		3). 在getter/setter内部去操作data中对应的属性数据
		
## 3. 模板解析(compile.js)
	1.模板解析的关键对象: compile对象
	2.模板解析的基本流程:
		1). 将el的所有子节点取出, 添加到一个新建的文档fragment对象中
		2). 对fragment中的所有层次子节点递归进行编译解析处理
	    	* 对插值文本节点进行解析
	    	* 对元素节点的指令属性进行解析
	        	* 事件指令解析
	        	* 一般指令解析
    3). 将解析后的fragment添加到el中显示
	3.解析插值文本节点: textNode.textContent = value
	  	1). 根据正则对象得到匹配出的表达式: 子匹配/RegExp.$1
	  	2). 从data中取出表达式对应的属性值
	  	3). 将属性值设置为文本节点的textContent
	4.事件指令解析: elementNode.addEventListener(事件名, 回调函数.bind(vm))
	    v-on:click="test"
	  	1). 从指令名中取出事件名
	  	2). 根据指令的值(表达式)从methods中得到对应的事件处理函数对象
	  	3). 给当前元素节点绑定指定事件名和回调函数的dom事件监听
	  	4). 指令解析完后, 移除此指令属性
	5.一般指令解析: elementNode.xxx = value
	  	1). 得到指令名和指令值(表达式)     text/html/class content/content/myClass
	  	2). 从data中根据表达式得到对应的值
	  	3). 根据指令名确定需要操作元素节点的什么属性
	        * v-text---textContent属性
	        * v-html---innerHTML属性
	        * v-class--className属性
	  	4). 将得到的表达式的值设置到对应的属性上
	  	5). 移除元素的指令属性

## 4. 数据劫持-->数据绑定
	1.数据绑定(model==>View):
		1). 一旦更新了data中的某个属性数据, 所有界面上直接使用或间接使用了此属性的节点都会更新(更新)
	2.数据劫持
		1). 数据劫持是vue中用来实现数据绑定的一种技术
		2). 基本思想: 通过defineProperty()来监视data中所有属性(任意层次)数据的变化, 一旦变化就去更新界面
	3.四个重要对象
    	1). Observer
			* 用来对data所有属性数据进行劫持的构造函数
	      	* 给data中所有属性重新定义属性描述(get/set)
	      	* 为data中的每个属性创建对应的dep对象
	    2). Dep(Depend)
	      	* data中的每个属性(所有层次)都对应一个dep对象
	      	* 创建的时机:
	        	* 在初始化define data中各个属性时创建对应的dep对象
	        	* 在data中的某个属性值被设置为新的对象时
	      	* 对象的结构
		        {
		          id, // 每个dep都有一个唯一的id
		          subs //包含n个对应watcher的数组(subscribes的简写)
		        }
			* subs属性说明
				* 当一个watcher被创建时, 内部会将当前watcher对象添加到对应的dep对象的subs中
				* 当此data属性的值发生改变时, 所有subs中的watcher都会收到更新的通知, 从而最终更新对应的界面
		3). Compile
			* 用来解析模板页面的对象的构造函数(一个实例)
			* 利用compile对象解析模板页面
			* 每解析一个表达式(非事件指令)都会创建一个对应的watcher对象, 并建立watcher与dep的关系
			* complie与watcher关系: 一对多的关系
		4). Watcher
	      	* 模板中每个非事件指令或表达式都对应一个watcher对象
	      	* 监视当前表达式数据的变化
	      	* 创建的时机: 在初始化编译模板时
	      	* 对象的组成
				{
		          vm,  //vm对象
		          exp, //对应指令的表达式
		          cb, //当表达式所对应的数据发生改变的回调函数
		          value, //表达式当前的值
		          depIds //表达式中各级属性所对应的dep对象的集合对象
		                  //属性名为dep的id, 属性值为dep
				}
			
		5). 总结: dep与watcher的关系: 多对多
			* 一个data中的属性对应对应一个dep, 一个dep中可能包含多个watcher(模板中有几个表达式使用到了属性)
			* 模板中一个非事件表达式对应一个watcher, 一个watcher中可能包含多个dep(表达式中包含了几个data属性)
			* 数据绑定使用到2个核心技术
				* defineProperty()
				* 消息订阅与发布
	
	4.双向数据绑定
		1). 双向数据绑定是建立在单向数据绑定(model==>View)的基础之上的
		2). 双向数据绑定的实现流程:
	      	* 在解析v-model指令时, 给当前元素添加input监听
	      	* 当input的value发生改变时, 将最新的值赋值给当前表达式所对应的data属性
	      	
# vuex
# 1. vuex是什么
	对vue应用中组件的状态进行集中式的管理的vue插件

# 2. vue状态自管理
	state: 驱动应用的数据源
	view: 以声明方式将state映射到视图
	actions: 响应在view上的用户输入导致的状态变化(包含n个更新状态的方法)
![](https://vuex.vuejs.org/flow.png)

# 3. 多组件共享状态的问题
	多个视图依赖于同一状态
	来自不同视图的行为需要变更同一状态
	以前的解决办法
		* 将数据以及操作数据的行为都定义在父组件
		* 将数据以及操作数据的行为传递给需要的各个子组件(有可能需要多级传递)
	vuex就是用来解决这个问题的
![](http://baocangwh.cn/t6/702/1556063498x2890173947.png)

# 4. vuex的核心概念
## 1). state
	vuex管理的状态对象
	它应该是唯一的
	const state = {
		xxx: initValue
	}

## 2). mutations
	包含多个直接更新state的方法(回调函数)的对象
	谁来触发: action中的commit('mutation名称')
	只能包含同步的代码, 不能写异步代码
	const mutations = {
		yyy (state, {data1}) { 
			// 更新state的某个属性
		}
	}
## 3). actions
	包含多个事件回调函数的对象
	通过执行: commit()来触发mutation的调用, 间接更新state
	谁来触发: 组件中: $store.dispatch('action名称')  // 'zzz'
	可以包含异步代码(定时器, ajax)
	const actions = {
		zzz ({commit, state}, data1) {
			commit('yyy', {data1})
		}
	}

## 4). getters
	包含多个计算属性(get)的对象
	谁来读取: 组件中: $store.getters.xxx
	const getters = {
		mmm (state) {
			return ...
		}
	}

## 5). modules
	包含多个module
	一个module是一个store的配置对象
	是将一复杂应用的vuex代码进行多模块拆分的第2种方式

## 6). 向外暴露store对象
	export default new Vuex.Store({
		state,
		mutations,
		actions,
		getters,
		modules: {
			a,
			b
		}
	})

## 7). 组件中:
	import {mapState, mapGetters} from 'vuex'
	export default {
		computed: (
			...mapState(['xxx']),
			...mapGetters(['yyy'])
		)
		methods: {
	        test () {
	            this.$store.dispatch('zzz', data)
	        }
		}
	}

## 8). 映射store: main.js
	import store from './store'
	new Vue({
		store
	})

## 9). store对象
	1.所有用vuex管理的组件中都多了一个属性$store, 它就是一个store对象
	2.属性:
	  state: 注册的state对象
	  getters: 注册的getters对象
	3.方法:
	  dispatch(actionName, data): 分发action 