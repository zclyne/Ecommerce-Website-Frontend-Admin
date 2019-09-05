'use strict';

import React from 'react';
import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], // 必须在这里先对list做初始化，否则之后无法调用.map
            pageNum: 1
        };
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() { // 从后端获取用户列表信息
        _user.getUserList(this.state.pageNum).then(res => { // 成功
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }
    onPageNumChange(pageNum) { // 页数发生变化，更新state中的pageNum
        this.setState({
            pageNum: pageNum
        }, () => { // setState是异步的，这里的第二个参数是回调函数
            this.loadUserList();
        });
    }
    render() {
        let listBody = this.state.list.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    {/*直接取到的createTime是时间戳，要转换成可阅读的时间*/}
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
            </div>
        );
    }
}

export default UserList;