const TodoItem = function ({ todo, toggleTodo, deleteTodo }: any) {
    return (
        <>
            <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {/* textDecoration 为 line-through 是文本带删除线, none 为默认保持正常 */}
                {todo.text}
                <button onClick={() => toggleTodo(todo.id)}>切换</button>
                <button onClick={() => deleteTodo(todo.id)}>删除</button>
            </li>

        </>
    )
}

export default TodoItem
