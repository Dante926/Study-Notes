/* 
    - 两种组件 React DOM组件 和 React组件
        -- DOM组件指的是React支持的所有HTML和SVG标签
*/
import { createContext, useContext, useState } from 'react';
import image from '../logo.svg'
import './CCAS'

// ReactDOM 
function ReactDOM() {
    return (
        <>
            <div>
                <img
                    src={image}
                    alt=""
                />
                {/* 
                    再React中 这些HTML标签的不是纯HTML写法
                    ,这些像属性的功能在React中称为是 "Props"
                    ,可以将其理解为"道具",也可以理解为属性
                    ,不一样的地方有很多,如 HTML中的class 在这里是className
                */}
            </div>
        </>
    )
}

//  DOM组件的类属性
function ClassName() {
    const imgStyleObj = {
        width: 200,
        height: 200,
        backgroundColor: 'grey'
    }

    return (
        <div>
            <img
                src={image}
                alt=""
                className="small"
                /* style={{
                    width: '200px',
                    height: '200px', // 设置明确的高度
                    objectFit: 'cover' // 确保图片填充区域并裁剪
                }} */
                style={imgStyleObj}
            />
        </div>
    );
}

// JSX的展开语法
function EXJSX() {
    const imgData = {
        className: "small",
        /* style={{
            width: '200px',
            height: '200px', // 设置明确的高度
            objectFit: 'cover' // 确保图片填充区域并裁剪
        }} */
        style: {
            width: 200,
            height: 200,
            backgroundColor: 'grey'
        },

    }

    return (
        <div>
            <img
                src={image}
                alt="" // alt不能单独的定义,必须要在img中存在这个属性

                {...imgData}
            /* 
                这里的{}是JSX语法标记,和对象{}无关.
                这里的...不是ES6中的扩展运算符,
                ES6中的...扩展运算符是将一个对象中的键值直接拿出来用的(是不能在没有容器的地方单独使用的),
                这里的{...}是JSX的功能支持
            */
            />
        </div>
    );
}

// React(自定义的Props)
const HttpData = [
    {
        id: 1,
        title: '请求标题',
        content: '请求内容'
    },
    {
        id: 2,
        title: '请求标题',
        content: '请求内容'
    },
]
function Article({ title, content, active }) {
    return (
        <div>
            <h2>{title ? title : '默认标题'}</h2>
            <p> {content ? content : '默认内容'} </p>
            <p> {active ? '显示中' : '隐藏'} </p>
        </div>
    )

}

// 在React组件中展开Props的使用场景
function Detail({ content, active }) {
    return (
        <>
            <p>{content}</p>
            <p>状态:{active ? '显示中' : '已隐藏'}</p>
        </>
    )
}
const HTtpData = {
    title: '请求标题1',
    DetailData: {
        content: '内容1',
        activ: true
    }
}
function RP({ title, DetailData }) {
    return (
        <div>
            <h2>{title}</h2>
            <Detail {...DetailData} />
        </div>
    )

}

// 将JSX作为Props传递(组件插槽)
function List({ children }) { // 传递过来的子元素是children Props
    return (
        <>
            <ul>
                {children}
            </ul>
        </>
    )
}

// 想多个位置传递JSX如何实现?
/* 
    有这个问题是因为children属性已经被预定义了,children是一定由组件<></>非闭合部分传递进来的.
    如果父组件想要传递其他JSX给子组件,则可以(比如我们想在一个子组件的头部传入JSX, 也想在内容区传入JSX,还想再页脚传入JSX)
*/
function MultipleList({ title, footer = <div>默认底部</div>, children }) {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {children}
            </ul>
            <div>
                {footer}
            </div>
        </>
    )
}

// 子组件向父组件传值
function Children({ onActive }) {
    const [status, setStatus] = useState(false)
    function handClick() {
        setStatus(!status)
        onActive(status)
    }

    return (
        <>
            <div>
                {/* <p style={{
                    display: status ? 'block' : 'none'
                }}
                >Children 的内容</p> */}
                <button onClick={handClick}>子传父</button>
            </div>
        </>
    )
}

// 同级或多级间通信(多级嵌套钩子)
const LevelContext = createContext(0)
function Section({ children }) {
    // Section 接收的是Heading这个组件并渲染它
    const level = useContext(LevelContext)
    return (
        <section className='section'>
            <LevelContext.Provider value={level + 1}>{/* 使用这个组件才能向子组件中传值 */}
                {children}
            </LevelContext.Provider>
        </section>
    )
}
// function Heading({ level, children }) {
function Heading({ children }) {
    // Heading 接收的是 children的内容,并根据level渲染它

    // 使用useContext时,再Heading中确定层级
    const level = useContext(LevelContext)
    switch (level) {
        case 1: return <h1>{children}</h1>
        case 2: return <h2>{children}</h2>
        case 3: return <h3>{children}</h3>
        case 4: return <h4>{children}</h4>
        case 5: return <h5>{children}</h5>
        case 6: return <h6>{children}</h6>
    }
}

function App() {
    // 子传父 
    /* const [fStatus, setFstatus] = useState(true)
    function handActive(status) {
        setFstatus(status)
    } */

    return (
        <>
            {/* 同级或多级间通信 */}
            {/* 这里有个问题,如果层级过多一直嵌套,则书写起来也会麻烦冗余. 要解决这个问题可以使用React多级嵌套穿透钩子 */}
            {/* <Section> 
                <Heading level={1}>
                    1级
                </Heading>
                <Section>
                    <Heading level={2}>
                        2级
                    </Heading>
                    <Section>
                        <Heading level={3}>
                            3级
                        </Heading>
                        <Section>
                            <Heading level={4}>
                                4级
                            </Heading>
                        </Section>
                    </Section>
                </Section>
            </Section> */}
            {/* 上述代码优化 */}
            <Section>
                <Heading>
                    1级
                </Heading>
                <Section>
                    <Heading >
                        2级
                    </Heading>
                    <Section>
                        <Heading >
                            3级
                        </Heading>
                        <Section>
                            <Heading >
                                4级
                            </Heading>
                        </Section>
                    </Section>
                </Section>
            </Section>

            {/* 组件通信:子传父 */}
            {/* <p
                style={{
                    display: fStatus ? 'block' : 'none'
                }}
            >
                父组件内容
            </p>
            <Children
                onActive={handActive}
            /> */}

            {/* // 想多个位置传递JSX如何实现? */}
            {/* <MultipleList
                title='父传子标题'
                footer={
                    <>
                        <p>这是底部页脚</p>
                    </>
                }
            >
                <li>列表项</li>
                <li>列表项</li>
                <li>列表项</li>
            </MultipleList>
            <MultipleList
                title='父传子标题'
            >
                <li>列表项</li>
                <li>列表项</li>
                <li>列表项</li>
            </MultipleList> */}

            {/* JSX作为Props传递(组件插槽) */}
            {/* <List>
                <li>列表项</li>
                <li>列表项</li>
                <li>列表项</li>
            </List> */}

            {/* <RP {...HTtpData} /> */}

            {/* 
                在进行组件复用时,通常只是我们的 结构 样式 复用,内容是不可能也复用的.
                这样我们就有个需求,就是对我们组件中的一些内容进行定制

                步骤:
                1.请求功能所需的数据(如文章列表等信息)
            */}
            {/* <Article
                title={HttpData[0].title}
                content={HttpData[0].content}
                active // 用于表示状态,不需要给值(默认是布尔值
            />
            <Article />
            <Article /> */}

            {/* <EXJSX /> */}

            {/* <ReactDOM /> */}

            {/* <ClassName /> */}
        </>
    )
}

export default App