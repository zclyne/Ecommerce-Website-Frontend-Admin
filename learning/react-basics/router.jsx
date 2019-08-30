'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// 页面路由
// 对应react-router中的<BrowserRouter>
window.location.href = 'http://www.google.com';
// 回退
history.back();

// 哈希路由
// 对应react-router中的<HashRouter>
window.location = '#hash';
window.onhashchange = () => {
    console.log('current hash: ', window.location.hash);
};

// h5路由
// 推进一个状态，会在栈中增加一项
history.pushState('name', 'title', '/path');
// 替换一个状态，不会在栈中增加新的一项
history.replaceState('name', 'title', '/path');
// 弹出一个状态
window.onpopstate = () => {
    // TODO: 学习以下四个location中的变量
    console.log(window.location.href);
    console.log(window.location.pathname);
    console.log(window.location.hash);
    console.log(window.location.search);
};



// react router
class A extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                Component A
                {/*在子组件中再次定义route*/}
                {/*在Switch里，第一个符合条件的路径会被匹配到*/}
                <Switch>
                    {/*如果匹配到的路径中没有参数，则渲染以下内容*/}
                    {/*这里必须要加上exact，否则形如/a/123的路径也会先匹配到第一条，而不会进入第二条*/}
                    <Route exact path={`${this.props.match.path}`}
                           render={(route) => {
                               return <div>当前组件是不带参数的A</div>
                           }} />
                    {/*在访问/a/sub时，会匹配到这条Route，而不会匹配到再下面那一条Route*/}
                    <Route path={`${this.props.match.path}/sub`}
                           render={(route) => {
                               return <div>当前组件是Sub A</div>
                           }} />
                    {/*如果匹配到的路径中带有参数id，则渲染以下内容*/}
                    {/*一般把通配的放在最后，从而解决冲突问题*/}
                    <Route path={`${this.props.match.path}/:id`}
                           render={(route) => {
                               // match是由react-router加在props中的变量，可以通过它来获取路径中的参数
                               // return <div>参数是：{this.props.match.params.id}</div>
                               // 由于route作为参数传入了该函数，所以也可以直接从route中取match
                               return <div>当前组件是带参数的A，参数是：{route.match.params.id}</div>
                           }} />
                </Switch>
            </div>

        );
    }
}
class B extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>Component B</div>
        );
    }
}
class Wrapper extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {/*这里的Link会跳转到相应路径，然后Route中就会匹配到，从而渲染出相应的组件*/}
                <Link to="/a">组件A</Link>
                <br/>
                <Link to="/a/sub">/a/sub</Link>
                <br/>
                <Link to="/a/123">带参数的组件A</Link>
                <br/>
                <Link to="/b">组件B</Link>
                {/*children是react预留的字段，表示它的起始标签和闭合标签之间包含的内容*/}
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render(
    <Router>
        <Wrapper>
            {/*当匹配到路径为/a时，渲染A组件*/}
            {/*/:id表示接收参数*/}
            {/*<Route  path="/a/:id" component={A}/>*/}
            <Route  path="/a" component={A}/>
            {/*当匹配到路径为/b时，渲染B组件*/}
            <Route  path="/b" component={B}/>
        </Wrapper>
    </Router>,
    document.getElementById('app'));