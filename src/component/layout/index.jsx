'use strict';

import React from 'react';

import TopNav from 'component/top-nav/index.jsx';
import SideNav from 'component/side-nav/index.jsx';

import './theme.css';

class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id="wrapper">
                {/*头部导航*/}
                <TopNav />
                {/*侧边导航*/}
                <SideNav />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;