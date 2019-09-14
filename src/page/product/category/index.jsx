'use strict';

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], // 必须在这里先对list做初始化，否则之后无法调用.map
            parentCategoryId: this.props.match.params.categoryId || 0
        };
    }
    componentDidUpdate(prevProps, prevState) { // 在点击查看子品类后，更新列表中的内容
        // 根据前后的path判断路径是否发生变化
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            });
        }
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    loadCategoryList() { // 从后端获取品类列表信息
        _product.getCategoryList(this.state.parentCategoryId).then(res => { // 成功
            this.setState({
                list: res
            });
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }
    onUpdateName(categoryId, categoryName) { // 更新品类名称
        let newName = window.prompt('请输入新的品类名称', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => { // 成功更新品类名称，重新加载列表
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }
    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opera" onClick={(e) => this.onUpdateName(category.id, category.name)}>修改名称</a>
                        {
                            category.parentId === 0
                            ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                            : null
                        }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表" />
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID', '品类名称', '操作']}>
                    {listBody}
                </TableList>
            </div>
        );
    }
}

export default CategoryList;