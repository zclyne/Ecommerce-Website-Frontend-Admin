'use strict';

class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success: res => {
                    if (0 === res.status) { // 请求成功
                        // 若resolve的类型是function，则执行resolve
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (10 === res.status) { // 未登录
                        this.doLogin(); // 跳转到登录页
                    } else { // 错误
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    doLogin() { // 跳转到登录页面
        // 配置redirect是为了登录完成后跳转回来
        // 使用encodeURIComponent是为了防止url中存在特殊字符
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    getUrlParam(name) { // 获取url参数
        // xxx.com?param=123&param1=456
        // window.location.search是包含问号和参数的字符串
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        // result形如：['param=123', '', '123', '&']
        return result ? decodeURIComponent(result[2]) : null;
    }
    errorTips(errMsg) { // 错误提示
        alert(errMsg || '好像哪里不对了~');
    }
    successTips(successMsg) { // 成功提示
        alert(successMsg || '操作成功！');
    }
    setStorage(name, data) { // 把data放入本地存储
        let dataType = typeof data;
        if (dataType === 'object') { // 若data是对象，做JSON序列化后保存
            window.localStorage.setItem(name, JSON.stringify(data));
        } else if (['number', 'string', 'boolean'].indexOf(dataType) >= 0) { // data是基础类型，直接存储
            window.localStorage.setItem(name, data);
        } else { // 其他不支持的类型
            alert('该类型不能用于本地存储');
        }
    }
    getStorage(name) { // 从本地存储中取出内容
        let data = window.localStorage.getItem(name);
        if (data) { // data存在
            return JSON.parse(data);
        } else {
            return '';
        }
    }
    removeStorage(name) { // 从本地存储中删除内容
        window.localStorage.removeItem(name);
    }
}

export default MUtil;