'use strict';

import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css';

// 通用分页组件
class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    {/*...是ES6新语法，表示解构函数，即把this.props中的每一项单独放到这里*/}
                    {/*其效果类似于：current={this.props.current} total={this.props.total}*/}
                    <RcPagination {...this.props} hideOnSinglePage showQuickJumper />
                </div>
            </div>
        )
    }
}

export default Pagination;