import { useEffect, useImperativeHandle, useReducer, useState } from "react";
import React, { useRef, forwardRef } from 'react';

// Reducer 统一管理状态的操作方式(和useState时一样的,看个人喜好选择)
function countReducer(state, action) {
    switch (action.type) {
        case "inc": return state + 1;
        case "dec": return state - 1;
        default:
            throw new Error()
    }

}
function AppReducer() {
    const [state, dispatch] = useReducer(countReducer, 0)
    const handInc = () => dispatch({ type: "inc" })
    const handDec = () => dispatch({ type: "dec" })

    return (
        <>
            <button onClick={handInc}>+</button>
            <span>{state}</span>
            <button onClick={handDec}>-</button>
        </>
    )
}


// useRef Hooks
// useRef获取DOM引用
/* 
    谁绑定了这个Ref,Ref就可以调用谁的DOM元素方法
*/
function MyComponent() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        // 通过 inputRef 访问 DOM 元素并调用 focus() 方法
        inputRef.current.focus();
    };
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={handleFocus}>Focus Input</button>
        </div>
    );
}


// useRef获取子组件
/* 不可以直接用函数的形式定义,要使用函数表达式的形式去定义.并且需要使用 React的 forwardRed 函数来包裹 */
/* const Child = forwardRef(function (props, ref) {
    // 使用这些方法后,我们子组件的内部功能可以被父组件使用,但是需要以下格式
    useImperativeHandle(ref, () => ({
        ChildFn: () => {
            console.log('子组件的方法');
        }
    }))

    return (
        <>
            <div>子组件</div>
        </>
    )
}) */

// useEffect 副作用函数hooks

function App() {
    // useRef 获取子组件? 
    const childRef = useRef()/* 不能像DOM一样来直接做Ref读取操作. 子组件默认不对外开放内部功能 */
    function handleClick() {
        childRef.current.ChildFn()
    }

    // useEffect 副作用函数hooks
    useEffect(() => {// 当组件渲染时重新执行,当没有第二个参数时.默认对每个函数组件执行两次,以检查是否出现函数不纯的情况.如果传递了第二个参数 [](以数组的形式),那么useEffect只会在[?] ?的数据变更时才会重新调用
        console.log('useEffect');
    }, [])
    const [count, setCount] = useState(0)
    function handEffect() {
        setCount(count + 1)
    }

    return (
        <>
            {/* useMemo */}

            {/* useEffect */}
            {/* <button onClick={handEffect}>{count}</button> */}

            {/* useRef获取子组件 */}
            {/* <Child ref={childRef}></Child> */}
            {/* <button onClick={handleClick}>按钮</button> */}

            {/* <MyComponent></MyComponent> */}
            {/* <AppReducer></AppReducer> */}
        </>
    )
}

export default App