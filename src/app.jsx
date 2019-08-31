'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

// 页面
// page是在webpack.config.js中配置的alias，其路径是__dirname + '/src/page'
import Home from 'page/home/index.jsx';
// 布局
import Layout from 'component/layout/index.jsx';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout>
                    {/*外层用Switch，使得只匹配第一个匹配到的项*/}
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/product" component={Home} />
                        <Route exact path="/product.category" component={Home} />
                    </Switch>
                </Layout>
            </Router>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'));