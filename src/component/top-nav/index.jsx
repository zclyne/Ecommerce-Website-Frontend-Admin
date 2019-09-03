'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
const _user = new User();

class TopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
    }
    onLogout() { // 退出登录
        _user.logout().then(res => { // 退出登录成功，跳转到登录页并删除本地存储
            // this.props.history.push('/login');
            window.location.href = '/login';
            _mm.removeStorage('userInfo');
        }, errMsg => { // 退出登录失败
            _mm.errorTips(errMsg);
        });
    }
    render() {
        return (
            <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" href="index.html" to="/"><b>HAPPY</b>MMALL</Link>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" href="javasciprt:;">
                            <i className="fa fa-user fa-fw"></i>
                            {
                                // 如果存在username，则显示欢迎，[用户名]
                                // 否则，显示欢迎您
                                this.state.username
                                    ? <span>欢迎，{this.state.username}</span>
                                    : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li>
                                <a onClick={() => this.onLogout()} href="#">
                                    <i className="fa fa-sign-out fa-fw"></i>
                                    <span>退出登录</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        );
    }
}

export default TopNav;