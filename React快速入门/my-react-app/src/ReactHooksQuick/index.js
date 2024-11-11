import { useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useState, memo } from "react";
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
/* 
    useEffect
*/

// useMemo
/* 
    是一种用来进行数据缓存的钩子,
    为什么会有这个钩子？ 是因为,假设我们这个函数组件在父组件中被引入,并且传递数据给当前组件进行复杂计算,
    只要我们当前这个组件(子组件)重新被调用就会重新进行一次复杂计算,并渲染。但是,
    如果父组件中有其他方法使得整个页面要重新渲染，那么就会导致该 子组件也会重新渲染,渲染之前又要重新执行一次复杂运算。
*/
// function DoSomeMath({ value }) {
//     console.log('DoSomeMath重新执行了');
//     let result = 0;
//     for (let i = 0; i < 100000; i++) {
//         result += value * 2
//     }

//     // s使用useMemo 记录value变化，如果有变化才重新执行
//     /* const result = useMemo(() => {
//         console.log('DoSomeMath重新执行了');
//         let result = 0;
//         for (let i = 0; i < 100000; i++) {
//             result += value * 2
//         }
//         return result;
//     }, [value]) */

//     return (
//         <div>
//             <p>输入内容:{value}</p>
//             <p>经过复杂运算得到:{result}</p>
//         </div>
//     )
// }

// function ShowDSM({ }) {
//     const [count, setCount] = useState(0)
//     const [inputValue, setinputValue] = useState(5)
//     return (
//         <div>
//             <p>count的值为:{count}</p>
//             <br />
//             <button
//                 onClick={() => { setCount(count + 1) }}
//             >点击更新</button>
//             <br />
//             <input type="number"
//                 value={inputValue}
//                 onChange={(e) => setinputValue(parseInt(e.target.value))}
//             />
//             <DoSomeMath value={inputValue}></DoSomeMath>
//         </div>
//     )
// }

// useCallBack
const Button = memo(function ({ onClick }) {
    console.log('Button渲染了');
    return (
        <>
            <button onClick={onClick}>子组件</button>
        </>
    )
})


function ShowUCB() {
    const [count, setCount] = useState(0);
    const handleClick = useCallback(() => {
        console.log('点击按钮');
    }, [])

    const handleUpdate = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <p>Count:{count}</p>
            <button onClick={handleUpdate}>点击</button>
            <br />
            <Button onClick={handleClick} />
        </div>
    )
}

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
            {/* useCallBack 函数缓存 */}
            <ShowUCB />

            {/* useMemo 数据缓存*/}
            {/* <ShowDSM></ShowDSM> */}

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