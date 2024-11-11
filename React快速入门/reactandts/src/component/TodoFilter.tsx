interface TodoFilterProps {
    setFilter: (filter: string) => void;
    /**
     * @filter 表示setFilter的参数,是字符串类型 
     * @void   表示setFilter的返回值,是void类型(不返回值)
     */
}

const TodoFilter = function ({ setFilter }: TodoFilterProps) {
    return (
        <>
            <div>
                <button onClick={() => setFilter('all')}>All</button>
                <button onClick={() => setFilter('active')}>Active</button>
                <button onClick={() => setFilter('completed')}>Completed</button>
            </div>
        </>
    )
}

export default TodoFilter