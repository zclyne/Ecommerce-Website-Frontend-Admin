import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User {
    login(loginInfo) { // 用户登录
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        });
    }
    checkLoginInfo(loginInfo) { // 检查登录接口的数据是否合法
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: '用户名不能为空！'
            };
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: '密码不能为空！'
            };
        }
        return {
            status: true,
            msg: '验证通过'
        };
    }
}

export default User;