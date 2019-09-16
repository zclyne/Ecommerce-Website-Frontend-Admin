'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "component/page-title/index.jsx";
import ListSearch from "./index-list-search.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], // 必须在这里先对list做初始化，否则之后无法调用.map
            pageNum: 1,
            listType: 'list' // 表明列表中的结果是由list得到还是search得到
        };
    }
    componentDidMount() {
        this.loadOrderList();
    }
    loadOrderList() { // 加载商品列表
        let listParam = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        };
        // 如果是搜索操作，传入要搜索的订单号
        if (this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNumber;
        }
        // 请求接口
        _order.getOrderList(listParam).then(res => { // 成功
            this.setState(res);
        }, errMsg => { // 失败，清空list并显示错误信息
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }
    onSearch(orderNumber) { // 搜索
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber,
        }, () => { // 在回调中重新加载列表
            this.loadOrderList();
        });
    }
    onPageNumChange(pageNum) { // 页数发生变化，更新state中的pageNum
        this.setState({
            pageNum: pageNum
        }, () => { // setState是异步的，这里的第二个参数是回调函数
            this.loadOrderList();
        });
    }
    render() {
        let tableHeads = ['订单号', '收件人', '订单状态', '订单总价', '创建时间', '操作'];
        return (
            <div id="page-wrapper">
                <PageTitle title="订单列表" />
                <ListSearch onSearch={(orderNo) => {this.onSearch(orderNo)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`} >
                                            {order.orderNo}
                                        </Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`} >详情</Link>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total}
                            onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
            </div>
        );
    }
}

export default OrderList;