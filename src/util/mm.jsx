'use strict';

class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success(res) {
                    if (0 === res.status) { // 请求成功
                        // 若resolve的类型是function，则执行resolve
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (10 === res.status) { // 未登录
                        this.doLogin(); // 跳转到登录页
                    } else { // 错误
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error(err) {
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
}

export default MUtil;