# 创建react项目
```bash
// 使用脚手架 
npx create-react-app 项目名称
npm run statr 启动项目
```

# 项目说明
·index.js **项目入口文件**
```js
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
//ReactDOM.createRoot 创建一个ReactDOMRoot实例
// render() 进行跟组件渲染
// <React.StrictMode> 严格模式(帮助排错)
```

## 根组件设置方式
```js
import App from './App';
// 默认导入App.js
```

## React组件创建方式
· 函数式组件
· 类组件
**现主推函数式组件，类组件过于复杂冗余**

>函数式组件的使用(App.js)
·JSX 相当于一种模板语法深入的结合了js和html

· 函数组件return后面的小括号
 是书写JSX时必须的，必须出现在换行的时候。(虽然可以单行时不换行，但是还是建议单行内容时也书写括号)

·JSX只能返回一个根元素
JSX中，只能有一个根元素，如果要返回多个元素，需要用一个外层标签包裹起来，比如div。或者在外层包含一个<>代码</>(空标签)
这是处理那种必须要设置多级，不希望有外部父级的情况下的处理方式

·使用HTML标签必须要正确的闭合
尽管使用但标签组件的时候也使用<组件 /> /结尾

## 插值
```js
<img src={logo} className="App-logo" alt="logo" />
```
①上诉代码中{logo}的花括号就是插值语法 
②如果插值的数据是单独和当前页面相关的话就直接将数据定义在当前组件内部
③插值可以使用的位置：1、标签内容 2、标签属性
```js
<div title="{divTitle}">{divContent}</div>
// 使用“” 将变回普通属性
```