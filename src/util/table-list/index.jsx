'use strict';

import React from 'react';

// 通用列表
class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstLoading: true
        }
    }
    componentWillReceiveProps() { // 列表只有在第一次加载时，isFirstLoading为true，其他情况为false
        this.setState({
            isFirstLoading: false
        });
    }
    render () {
        // 表头信息，this.props.tableHeader是数组，通过循环取出其中的内容
        let tableHeader = this.props.tableHeads.map((tableHead, index) => {
            if (typeof tableHead === 'object') {
                return <th key={index} width={tableHead.width}>{tableHead.name}</th>;
            } else if (typeof tableHead === 'string') {
                return <th key={index}>{tableHead}</th>;
            }
        });
        // 列表内容。是在使用组件时放在起始标签和结束标签之间的部分
        let listBody = this.props.children;
        // 列表的信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {
                        this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'
                    }
                </td>
            </tr>
        );
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableList;