import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Statistic {
    getHomeCount() { // 获取首页上的统计信息
        return _mm.request({
            url: '/manage/statistic/base_count.do'
        });
    }
}

export default Statistic;