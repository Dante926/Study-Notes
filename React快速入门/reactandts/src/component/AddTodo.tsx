import { useState } from "react"

interface AddTodoProps {
    addTodo: (text: string) => void //无返回值
}

const AddTodo = function ({ addTodo }: AddTodoProps) {// 接收一个addTodo函数作为Props
    const [text, setText] = useState('')
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        /**
         * @ReactFormEvent  是form的事件的事件对象
         * @HTMLFormElement 是一种类型，是form元素的类型
         */
        e.preventDefault()// 阻止默认行为,现在我还不想让你提交表单提交,
        if (text.trim() === '') {// 判断是否为空,是则返回出去
            return
        }
        addTodo(text)
        setText('')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                />
                <button>新建事项</button>
            </form>
        </div>
    )
}

export default AddTodo