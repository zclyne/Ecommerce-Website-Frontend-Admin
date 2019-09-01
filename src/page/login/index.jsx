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
            password: ''
        };
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
    // 登录按钮的点击事件，提交表单
    onSubmit(e) {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => { // resolve

        }, (err) => { // reject

        });
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
                                       onChange={e => this.onInputChange(e)}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control"
                                       name="password"
                                       placeholder="密码"
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