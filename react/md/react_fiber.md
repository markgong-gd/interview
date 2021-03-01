在react16之前，react存在一个痛点：
    
    在每次更新DOM时，react都会通过DIFF算法对比新旧VDOM，来完成一次性的同步更新，这个更新时一次完成不可被打断的。

    如果有一个复杂的复合组件，当我们更改顶层state，这时它将会有一个庞大的同步计算，会阻塞浏览器的主线程，导致事件无法及时响应、掉帧等情况。

react官方对此做出了优化

    将对DOM增删改到同步更新这一过程分成两部分，reconciliation（和解）和commit（提交）。reconciliation阶段是可中断可恢复调用；commit阶段将计算好的vDOM一次性提交渲染。

reconciliation：

    这个阶段触发钩子函数
        componentWillMount（被废除）

        componentWillReceiveProps
            被getDerivedStateFromProps代替，这是一个static方法，如果在里面比较props，需要先在state中维护。

        shouldComponentProps

        componentWillUpdate
            被getSnapshotBeforUpdate代替，它的返回值将作为componentDidUpdate第三个参数传入。

    这个阶段钩子函数有可能执行多次，尽量避免使用

    -------------------

    在这个阶段

comment:

    这个阶段触发钩子函数
        componentDidMount
        componentDidUpdate
        componentWillUnMount
        
初始化时触发函数

    constructor
    getDerivedStateFromProps
    render
    componentDidMount

更新时触发函数

    getDerivedStateFromProps
    shouldComponentUpdate
    render
    getSnapshotBeforeUpdate
    componentDidUpdate

卸载阶段

    componentWillUnMount

异常处理

    getDerivedStateFromError
    componentDidCatch

