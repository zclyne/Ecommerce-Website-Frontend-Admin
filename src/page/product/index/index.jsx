'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from "component/page-title/index.jsx";
import ListSearch from "./index-list-search.jsx";
import Pagination from "util/pagination/index.jsx";
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], // 必须在这里先对list做初始化，否则之后无法调用.map
            pageNum: 1,
            listType: 'list' // 表明列表中的结果是由list得到还是search得到
        };
    }
    componentDidMount() {
        this.loadProductList();
    }
    loadProductList() { // 加载商品列表
        let listParam = {
            listType: this.state.listType,
            pageNum: this.state.pageNum
        };
        // 如果是搜索操作，传入搜索类型和搜索关键字
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        // 请求接口
        _product.getProductList(listParam).then(res => { // 成功
            this.setState(res);
        }, errMsg => { // 失败，清空list并显示错误信息
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }
    onSearch(searchType, searchKeyword) { // 搜索
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => { // 在回调中重新加载列表
            this.loadProductList();
        });
    }
    onPageNumChange(pageNum) { // 页数发生变化，更新state中的pageNum
        this.setState({
            pageNum: pageNum
        }, () => { // setState是异步的，这里的第二个参数是回调函数
            this.loadProductList();
        });
    }
    onSetProductStatus(e, productId, currentStatus) { // 改变商品状态，上架/下架
        let newStatus = currentStatus === 1 ? 2 : 1,
            confirmTips = currentStatus === 1
                ? '确定要下架该商品吗？' : '确定要上架该商品吗？';
        // 防止误操作
        if (window.confirm(confirmTips)) {
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => { // 成功，重新加载商品列表
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render() {
        let tableHeads = [
            {name: '商品ID', width: '10%'},
            {name: '商品信息', width: '50%'},
            {name: '价格', width: '10%'},
            {name: '状态', width: '15%'},
            {name: '操作', width: '15%'}
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status === 1 ? '在售' : '已下架'}</p>
                                        <button className="btn btn-warning btn-xs"
                                                onClick={(e) => this.onSetProductStatus(e, product.id, product.status)}>
                                            {/*若商品已上架，按钮执行下架操作，反之上架*/}
                                            {product.status === 1 ? '下架' : '上架'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="opera" to={`/product/detail/${product.id}`} >详情</Link>
                                        <Link className="opera" to={`/product/save/${product.id}`} >编辑</Link>
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

export default ProductList;