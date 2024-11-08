import logo from './logo.svg';
import './App.css';
import MyApp from './qiantao/index1';
import Mytext from './qiantao/if';
import { Fragment, useState } from 'react';

// 测试Hook
import B1 from './qiantao/button1';
import B2 from './qiantao/button2';

function MyButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}
function App() {
  // <MyApp />

  const divContent = '标签内容'
  const divTitle = '标签标题'
  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90
  }

  // 条件渲染
  let content;
  if (1) {
    content = <Mytext />
  } else {
    content = <MyApp />
  }

  // 渲染列表
  const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
  ];
  const listItems = products.map(product =>
    <li key={product.id}>
      {product.title}
    </li>
    /* 
      注意， <li> 有一个 key 属性。对于列表中的每一个元素，你都应该传递一个字符串或者数字给 key，用于在其兄弟节点中唯一标识该元素。通常 key 来自你的数据，比如数据库中的 ID。如果你在后续插入、删除或重新排序这些项目，React 将依靠你提供的 key 来思考发生了什么。
    */
  );

  // 响应事件
  const handleClick = () => {
    alert('You clicked me!')
    setCount(count + 1)
  }

  // useState
  const [count, setCount] = useState(0);// useState(0) 中的0 是count的初始值,要想改变count的值，需要调用setCount()这个方法来修改
  const handleClick2 = () => {
    setCount(count + 1)
  }

  // Hook 必须要在组件(函数)内调用

  return (
    <>
      <div className="App">
        <MyApp />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div title={divTitle}>{divContent}</div>
          <div className='avatar'></div>
          <div className='avatar'>{user.name}</div>
          <img
            className='avatar'
            src={user.imageUrl}
            // 使用的样式是某个对象的属性时，要使用{{}}来引用
            style={{
              height: user.imageSize,
              width: user.imageSize
            }}
          />
          <br />
          <div title="{divTitle}">{divContent}</div>
        </header>
      </div >

      {/* 条件渲染 */}
      <div>{content}</div>
      <div>{content && <MyApp />}</div> {/* 如果 content 为真，则显示 <MyApp/> ：不为真则返回false,React 会自动忽略false */}

      {/* 列表渲染 */}
      <ul>{listItems}</ul>

      {/* 响应事件 */}
      <button onClick={handleClick}>Click me</button>

      {/* useState */}
      <div>APP button</div>
      <button onClick={handleClick2}>You clicked {count} times</button>

      {/* 组件间共享数据 */}
      <B2 />{/* 不共享数据，则useState() 状态不会被共享 */}
      <br />
      <B1 count={count} onClick={handleClick2} />
      <br />
      <MyButton count={count} onClick={handleClick} />
    </>

  );
}

// 条件渲染
function IfSsr() {
  const list = [
    { id: 1, name: '小吴' },
    { id: 2, name: '小李' },
    { id: 3, name: '小花' }]

  const listContent = list.map(item => (
    <li key={item.id}>{item.name}</li>
  ))

  return (
    <>
      <ul>{listContent}</ul>
    </>
  )
}

// 条件渲染Fragment
function IFSSR() {
  const list = [
    { id: 1, name: '小吴' },
    { id: 2, name: '小李' },
    { id: 3, name: '小花' }]

  const listContent = list.map(item => (
    <Fragment key={item.id}> {/* key给谁，谁就会被执行渲染 */}
      <li>{item.name}</li>
      <li>-----------</li>
    </Fragment>
  ))

  return (
    <>
      <ul>{listContent}</ul>
    </>
  )
}

// 事件操作
function EventApp() {
  function handleClick() {
    alert('You clicked me!')
  }

  return (
    <button onClick={handleClick}>Click me</button>
  )
}

// useState状态处理
function UseState() {
  // 无法响应
  let context = '点击后无法响应'
  const handleClick = () => {
    context = '响应内容'
  }

  const [contextable, setcontextable] = useState(context)
  function handleClick2() {
    setcontextable('新内容')
  }
  return (
    <>
      <div>{context}</div> <div>{contextable}</div>
      <button onClick={handleClick}>改变状态1</button >
      <button onClick={handleClick2}>改变状态2</button>
    </>
  )
}

// useState对象操作注意特点
function StateObj() {
  const [data, setData] = useState({
    title: '默认标题',
    content: '默认内容'
  })

  function handleClick1() {
    setData({
      title: '新标题'
    })
  }

  function handleClick2() {
    setData({
      title: '新标题',
      content: '新内容'
    })
  }

  function handleClick3() {
    setData({
      ...data,// 先使用扩展运算符将值赋给当前{对象},最后再用新值覆盖旧值
      content: '新内容',
    })
  }

  return (
    <>
      {/* 非正确使用1 */}
      {/* <div>{data}</div> */}

      {/* 非正确使用2 */}
      <div title={data.title}>{data.content}</div>
      {/* 这里的点击按钮后的setData操作不是将原来的属性更改成新属性,而是直接替换成你设置的新的内容 */}
      <button onClick={handleClick1}>改变对象状态</button>

      {/* 正确使用1 */}
      <div title={data.title}>{data.content}</div>
      <button onClick={handleClick2}>改变对象状态</button>

      {/* 正确使用2 */}
      <div title={data.title}>{data.content}</div>
      <button onClick={handleClick3}>改变对象状态</button>
    </>
  )
}

// 数组形式的状态
function ArrState() {
  const [data, setData] = useState(
    [
      { id: 1, name: '一号玩家' },
      { id: 2, name: '二号玩家' },
      { id: 3, name: '三号玩家' },
    ]
  )

  let id = 3;
  function addHandleClick() {
    // 往数组中添加内容
    setData([
      ...data,
      { id: ++id, name: '四号玩家' }
    ])
  }

  function deleteHandleClick() {
    // 使用 数组过滤
    setData(data.filter(item => item.id != 2))/* 希望过滤掉数组后是没有2的新数组 */
  }

  const listData = data.map(item => (
    <li key={item.id}>{item.name}</li>
  ))

  return (
    <>
      <div>{listData}</div>
      <button onClick={addHandleClick}>新增四号玩家</button>
      <button onClick={deleteHandleClick}>删除二号玩家</button>

    </>
  )
}

function app() {
  return (
    <>
      <ArrState />
      {/* <StateObj /> */}
      {/* <UseState /> */}
      {/* <EventApp></EventApp>
      <IFSSR></IFSSR>
      <IfSsr /> */}
      {/* <MyButton />
      <App /> */}
    </>
  )
}

export default app;
