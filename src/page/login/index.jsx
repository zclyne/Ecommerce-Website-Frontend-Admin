'use strict';

import React from 'react';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import './index.scss';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        };
    }
    componentWillMount() {
        document.title = '登录 - MMALL ADMIN';
    }
    // 当用户名或密码发生改变时，更新state中对应的变量
    onInputChange(e) {
        let inputName = e.target.name;
        let inputValue = e.target.value;
        this.setState({
            // ES6中新增了对于键为变量的支持，方法是把变量名用中括号包裹起来
            [inputName]: inputValue
        });
    }
    onInputKeyUp(e) {
        if (e.keyCode === 13) { // 如果是回车键，尝试进行登录
            this.onSubmit();
        }
    }
    // 登录按钮的点击事件，提交表单
    onSubmit(e) {
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        };
        // 表单验证
        let checkResult = _user.checkLoginInfo(loginInfo);
        if (checkResult.status) { // 验证通过，执行登录
            // 登录
            _user.login(loginInfo).then((res) => { // resolve，跳转回先前的页面
                // 把登录的用户信息放入本地存储中，从而能够在navb-bar上显示用户名
                _mm.setStorage('userInfo', res);
                // this.props.history是由react-router提供的
                this.props.history.push(this.state.redirect);
            }, (errMsg) => { // reject
                _mm.errorTips(errMsg);
            });
        } else { // 验证失败
            _mm.errorTips(checkResult.msg);
        }
    }
    render() {
        return (
            // col-md-offset-4是bootstrap提供的，作用是在左边空出4列
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                {/*name字段是由react提供的，增加这个字段后，就可以在对应函数中获取到name的值*/}
                                <input type="text" className="form-control"
                                       name="username"
                                       placeholder="用户名"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"
                                       name="password"
                                       placeholder="密码"
                                       onKeyUp={e => this.onInputKeyUp(e)}
                                       onChange={e => this.onInputChange(e)}/>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block"
                                    onClick={e => {this.onSubmit(e)}}>登录</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;