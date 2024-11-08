import { useState } from "react";

function B1({counts, onClicks}) {
    const [count, setCount] = useState(0);  // useState 必须在组件内调用

    const handleClick = () => {
        setCount(count + 1); // 点击按钮时更新计数
    };

    return (
        <>
            <div>
                <div>B1</div>
                <p>You clicked {count} times</p>
                <button onClick={handleClick}>Click me</button>
            </div>

            <div>APP - B1</div>
            <button onClick={onClicks}>
                Clicked {counts} times
            </button>
        </>
    );
}

export default B1;
