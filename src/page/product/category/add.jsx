'use strict';

import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            parentId: 0,
            categoryName: ''
        };
    }
    componentDidMount() {
        this.loadCategoryList();
    }
    loadCategoryList() { // 加载一级品类列表，用于显示父品类列表
        _product.getCategoryList().then(res => { // 成功
            this.setState({
                categoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    onValueChange(e) { // 表单的值发生变化，更新state
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]: value
        });
    }
    onSubmit(e) { // 提交
        let categoryName =  this.state.categoryName.trim();
        if (categoryName) { // 若品类名称不为空，提交
            _product.saveCategory({
                parentId: this.state.parentId,
                categoryName: this.state.categoryName
            }).then((res) => { // 提交成功
                _mm.successTips(res);
                this.props.history.push('/product-category/index'); // 跳转回首页
            }, (errMsg) => { // 提交失败
                _mm.errorTips(errMsg);
            });
        } else {
            _mm.errorTips('请输入品类名称');
        }
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="新增品类" />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属品类</label>
                                <div className="col-md-5">
                                    <select name="parentId"
                                            className="form-control"
                                            onChange={(e) => this.onValueChange(e)}>
                                        <option value="0">根品类/</option>
                                        {
                                            this.state.categoryList.map((category, index) => {
                                                return <option value={category.id} key={index}>根品类/{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"
                                           name="categoryName"
                                           value={this.state.categoryName}
                                           onChange={(e) => this.onValueChange(e)}
                                           placeholder="请输入品类名称" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button className="btn btn-primary"
                                            onClick={(e) => {this.onSubmit(e)}}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryAdd;