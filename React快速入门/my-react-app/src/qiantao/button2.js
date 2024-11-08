import { useState } from "react";

function B2() {
    const [count, setCount] = useState(0);  // useState 必须在组件内调用

    const handleClick = () => {
        setCount(count + 1); // 点击按钮时更新计数
    };

    return (

        <>
            <div>
                <div>B2</div>
                <p>You clicked {count} times</p>
                <button onClick={handleClick}>Click me</button>
            </div>
        </>
    );
}

export default B2;
