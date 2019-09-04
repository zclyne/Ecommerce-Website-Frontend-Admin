'use strict';
import React from 'react';
import {Link} from 'react-router-dom';
import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], // 必须在这里先对list做初始化，否则之后无法调用.map
            pageNum: 1,
            firstLoading: true // 用于判断是否是第一次加载
        };
    }
    componentDidMount() {
        this.loadUserList();
    }
    loadUserList() { // 从后端获取用户列表信息
        _user.getUserList(this.state.pageNum).then(res => { // 成功
            this.setState(res, () => { // 在用户列表加载完成后，把firstLoading标记位置为false
                this.setState({
                    firstLoading: false
                })
            });
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
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    {
                        this.state.firstLoading ? '正在加载数据...' : '没有找到相应的结果~'
                    }
                </td>
            </tr>
        );
        let tableBody = this.state.list.length > 0 ? listBody : listError;

        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表" />
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>注册时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
            </div>
        );
    }
}

export default UserList;