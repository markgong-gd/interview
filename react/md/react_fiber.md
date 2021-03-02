在react16之前，react存在一个痛点：
    
    react渲染和虚拟DOM对比，找出它们的增删改节点，同步更新它们，这一过程是一气呵成的。

    如果有一个复杂的复合组件，当我们更改顶层组件状态，这时它将会有一个庞大的同步计算，js会阻塞浏览器的主线程，导致事件无法及时响应、掉帧等情况。

react官方对此做出了优化

    将找出它们的增删改，同步更新这一过程分成一个个最小任务单元，我将这些任务单元叫做fiber。

fiber执行分为两个阶段：

    reconciliation（协调）
        这一阶段会找出所有变更节点，例如增删改等等，这些变更被称作为react effect。这一阶段是可中断可恢复的。

    commit（提交）
        这一阶段将计算出来需要执行的副作用一次性执行。这一极端不可被打断。

reconciliatioin协调：

    浏览器调度策略和渲染是按帧执行的，16.66ms一次。每一帧包含脚本执行、样式计算、重绘、合成、空余时间

    这些fiber构建成fiber tree，开始从根节点遍历这些fiber按优先级执行，优先级高的放入主流程执行，优先级低的放入空余时间执行。

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

