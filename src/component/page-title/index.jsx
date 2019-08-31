'use strict';

import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() { // 在组件将要加载时，修改标签页的标题
        document.title = this.props.title + ' - HAPPYMMALL';
    }

    render() {
        return (
            <div id="wrapper">
                <h1 className="page-header">{this.props.title}</h1>
                {this.props.children}
            </div>
        );
    }
}

export default PageTitle;