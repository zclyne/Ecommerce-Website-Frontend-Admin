'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

// 生命周期
// 初始输出顺序：constructor, componentWillMount, render, componentDidMount
class Component extends React.Component {
    // constructor在组件的生命周期的最初时执行
    constructor(props) {
        super(props);
        this.state = {
            data: 'Old State'
        };
        console.log('Component constructor');
    }
    // componentWillMount在组件将要被加载时执行
    // 异步的方法可以放在这里执行
    componentWillMount() {
        console.log('componentWillMount');
    }
    // componentDidMount在组件被加载完成后执行
    componentDidMount() {
        console.log('componentDidMount');
    }
    // 将要接收父组件传来的props
    // 在点击父组件的按钮后，这个函数会最先被执行
    componentWillReceiveProps(nextProps, nextContext) {
        console.log('componentWillReceiveProps');
    }
    // 判断子组件是否应该更新
    // 在通过点击按钮更新state后，该函数会先被触发，然后触发componentWillUpdate，最后触发render
    // 如果return false，即使数据发生变化，页面也不会改变
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        return true;
    }
    // 组件将要更新
    // 若shouldComponentUpdate为true，此函数将被触发，然后触发render
    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate');
    }
    // 组件更新完成
    // 在点击按钮更改state后，在render之后被触发
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
    }
    // 组件即将销毁
    // 常用于销毁组件上的定时器等
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    // 处理点击事件
    handleClick() {
        console.log('开始更新数据');
        this.setState({
            data: 'New State'
        });
    }
    // render在componentWillMount和componentDidMount之间执行
    render() {
        console.log('render');
        return (
            <div>
                <div>Props: {this.props.data}</div>
                <button onClick={() => {this.handleClick()}}>更新组件</button>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'Old Props',
            hasChild: true
        };
        console.log('App constructor');
    }
    onPropsChange() {
        console.log('开始更新props');
        this.setState({
            data: 'New Props'
        });
    }
    onDestroyChild() {
        console.log('开始销毁子组件');
        this.setState({
            hasChild: false
        });
    }
    render() {
        return (
            <div>
                {
                    this.state.hasChild ? <Component data={this.state.data} /> : null
                }
                <button onClick={() => {this.onPropsChange()}}>改变props</button>
                <button onClick={() => {this.onDestroyChild()}}>销毁子组件</button>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app'));