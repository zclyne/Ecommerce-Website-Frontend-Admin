'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

// 页面
// page是在webpack.config.js中配置的alias，其路径是__dirname + '/src/page'
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ErrorPage from 'page/error/index.jsx';

class App extends React.Component {
    render() {

        let LayoutRouter = (
            <Layout>
                {/*外层用Switch，使得只匹配第一个匹配到的项*/}
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/product" component={Home}/>
                    <Route path="/product-category" component={Home}/>
                    <Route path="/user/index" component={UserList}/>
                    <Redirect exact from="/user" to="/user/index"/>
                    {/*若走到下面这条，说明全部都没有匹配到，则进入ErrorPage*/}
                    <Route component={ErrorPage}/>
                </Switch>
            </Layout>
        );

        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={props => LayoutRouter}></Route>
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'));