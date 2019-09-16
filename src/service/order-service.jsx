import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Order {
    getOrderList(listParam) { // 获取订单列表信息
        let url = '',
            data = {};
        if (listParam.listType === 'list') { // 如果是列举
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') { // 如果是搜索
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    getOrderDetail(orderNumber) { // 获取订单详情
        return _mm.request({
            url: '/manage/order/detail.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
    sendGoods(orderNumber) { // 订单发货
        return _mm.request({
            url: '/manage/order/send_goods.do',
            data: {
                orderNo: orderNumber
            }
        });
    }
}

export default Order;