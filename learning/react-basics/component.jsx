import React from "react";
import ReactDOM from "react-dom";

// react组件基础
function Component() {
    return <h1>I am Yifan</h1>;
}

class ES6Component extends React.Component {
    render() { // render()方法是react规定的
        return <h1>I am Yifan from ES6</h1>;
    }
}


ReactDOM.render( // render第一个参数只能传入一个元素，所以要放两个组件时，要用div包裹起来
    <div>
        {/*因为Component是组件，所以要用下面这种写法*/}
        <Component/>
        <ES6Component/>
    </div>,
    document.getElementById('app'));



// state和props的用法
// react组件
class Component extends React.Component {
    constructor(props) { // 变量在构造函数中定义，props用于从父组件向子组件中传参数，只读，在子组件中只能使用，无法改变
        super(props); // 必须要先调用super
        this.state = {
            name: 'Yifan'
        }
    }
    render() { // render()方法是react规定的
        // 从state中获取数据
        setTimeout(() => { // 设定定时函数，2秒后执行
            this.setState({
                name: 'Yifan Test'
            });
        }, 2000);
        return <h1>I am {this.state.name} from ES6</h1>;

        // 获取从props中传来的name参数
        return <h1>I am {this.props.name} from ES6</h1>;
    }
}

ReactDOM.render( // render第一个参数只能传入一个元素，所以要放两个组件时，要用div包裹起来
    <div>
        {/*因为Component是组件，所以要用下面这种写法*/}
        <Component name="Yifan from props"/>
    </div>,
    document.getElementById('app'));



// 事件处理方式1
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Yifan',
            age: 21
        };
        // 下面这句话的作用是把handleClick的this修正为当前这个component
        // 如果不加这句话，this将是触发了点击的button
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() { // 按钮的点击事件
        this.setState({ // 加一岁
            age: this.state.age + 1
        });
    }
    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                <button onClick={this.handleClick}>加一岁</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app'));



// 事件处理方式2
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Yifan',
            age: 21
        };

    }
    handleClick() { // 按钮的点击事件
        this.setState({ // 加一岁
            age: this.state.age + 1
        });
    }
    onValueChange(e) { // 输入内容改变事件
        this.setState({
            age: e.target.value // e.target.value就是输入框中的内容
        });
    }
    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                {/*因为箭头函数没有作用域，所以用下面这种写法时*/}
                {/*handleClick()中的this就是component，而不是这个button*/}
                <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
                <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Component/>,
    document.getElementById('app'));



// 组件间的两种组合关系
class Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Yifan',
            age: 21
        };

    }
    handleClick() { // 按钮的点击事件
        this.setState({ // 加一岁
            age: this.state.age + 1
        });
    }
    onValueChange(e) { // 输入内容改变事件
        this.setState({
            age: e.target.value // e.target.value就是输入框中的内容
        });
    }
    render() {
        return (
            <div>
                <h1>I am {this.state.name}</h1>
                <p>I am {this.state.age} years old!</p>
                {/*因为箭头函数没有作用域，所以用下面这种写法时*/}
                {/*handleClick()中的this就是component，而不是这个button*/}
                <button onClick={(e) => {this.handleClick(e)}}>加一岁</button>
                <input type="text" onChange={(e) => {this.onValueChange(e)}}/>
            </div>
        );
    }
}
class Title extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // this.props.children就是该组件所包含的所有内容
            // 在App的<Title></Title>内部指定
            <h1>{this.props.children}</h1>
        );
    }
}
class App extends React.Component {
    render() {
        return (
            <div>
                {/*这是容器式的组件关系*/}
                <Title>
                    <span>App Span</span>
                    <a href="">Link</a>
                </Title>
                <hr/>
                {/*单纯组件*/}
                {/*在App组件中直接使用Component组件*/}
                <Component/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app'));



// 在子组件中操作父组件数据
// 子组件
class Child extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() { // 按钮的点击事件
        // 不能通过修改props来直接改变父组件颜色，因为props是只读的
        // 从props中获得changeColor
        this.props.changeColor('red');
    }
    render() {
        return (
            <div>
                <h1>父组件的背景色 {this.props.bgColor}</h1>
                <button onClick={(e) => {this.handleClick(e)}}>改变父组件颜色</button>
            </div>
        );
    }
}
class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '#999'
        }
    }
    onBgColorChange(color) {
        this.setState({
            bgColor: color
        })
    }
    render(props) {
        // 把父组件的bgColor传到子组件，子组件从props中获取
        return (
            // 注意这里有2个大括号，外层大括号表示是一个表达式，内层大括号表示json数据结构
            <div style={{background: this.state.bgColor}}>
                {/*onBgColorChange是一个回调，设置在父组件中*/}
                {/*子组件可以通过this.props.changeColor来调用onBgColorChange*/}
                <Child bgColor={this.state.bgColor} changeColor={(color) => this.onBgColorChange(color)}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Father/>,
    document.getElementById('app'));



// 操作兄弟组件的数据
// 状态提升：把Child2中的属性放到其father上，这样father的其他子组件就可以操作Child2
// 改变兄弟组件的数据的方法：
// 方法1：传递到父组件，然后父组件再传递到对应子组件
class Child1 extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick() { // 按钮的点击事件
        this.props.changeChild2Color('red');
    }
    render() {
        return (
            <div>
                <h1>Child1 {this.props.bgColor}</h1>
                <button onClick={(e) => {this.handleClick(e)}}>改变Child2背景颜色</button>
            </div>
        );
    }
}
class Child2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{background: this.props.bgColor}}>
                <h1>Child2背景颜色 {this.props.bgColor}</h1>
            </div>
        );
    }
}
class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            child2BgColor: '#999'
        };
    }
    onChild2BgColorChange(color) {
        this.setState({
            child2BgColor: color
        });
    }
    render(props) {
        return (
            <div>
                <Child1 changeChild2Color={(color) => {this.onChild2BgColorChange(color)}}/>
                <Child2 bgColor={this.state.child2BgColor}/>
            </div>
        );
    }
}

ReactDOM.render(
    <Father/>,
    document.getElementById('app'));



// 另外，在react中还可以使用发布订阅的方式实现组件间的数据操作，这是一种观察者模式
// 还可以使用redux单向数据流的方式，它把所有数据都放在一个根组件（即redux的Store）zhong，也是一种状态提升