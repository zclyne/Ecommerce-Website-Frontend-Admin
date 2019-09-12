'use strict';

import React from 'react';

import './category-selector.scss';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

// 品类选择器
class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        };
    }
    componentWillReceiveProps(nextProps) { // 在props发生改变时触发，用于编辑商品时回填分类信息
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if (!categoryIdChange && !parentCategoryIdChange) { // 如果品类没有改变，直接return
            return;
        }
        if (nextProps.parentCategoryId === 0) { // 若只有一级品类
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            });
        } else { // 有二级品类
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => { // 在回调中更新二级品类列表
                parentCategoryIdChange && this.loadSecondCategory();
            });
        }
    }
    componentDidMount() {
        // 组件加载完毕，开始加载一级分类
        this.loadFirstCategory();
    }
    loadFirstCategory() { // 加载一级品类
        _product.getCategoryList().then(res => { // 成功
            this.setState({
                firstCategoryList: res
            });
        }, errMsg => { // 失败
            _mm.errorTips(errMsg);
        });
    }
    loadSecondCategory() { // 加载二级品类
        _product.getCategoryList(this.state.firstCategoryId).then(res => { // 成功
            this.setState({
                secondCategoryList: res
            });
        }, errMsg => { // 失败
            _mm.errorTips(errMsg);
        });
    }
    onFirstCategoryChange(e) { // 选择一级品类
        if (this.props.readOnly) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId: newValue,
            // 重新选择一级分类后，要把二级分类清空
            secondCategoryId: 0,
            secondCategoryList: [],
        }, () => { // 在setState的回调中加载二级品类，并把结果传给父组件
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        });
    }
    onSecondCategoryChange(e) { // 选择二级品类
        if (this.props.readOnly) {
            return;
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue
        }, () => { // 把结果传给父组件
            this.onPropsCategoryChange();
        });
    }
    onPropsCategoryChange() { // 传给父组件选中的结果
        // 判断props里的回调函数是否存在
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        if (this.state.secondCategoryId) { // 若有二级品类
            categoryChangeable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else { // 如果只有一级品类
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }
    render() {
        return (
            <div className="col-md-10">
                <select className="form-control cate-select"
                        value={this.state.firstCategoryId}
                        onChange={(e) => this.onFirstCategoryChange(e)}
                        readOnly={this.props.readOnly}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList
                            .map((category, index) =>
                                <option value={category.id} key={index}>{category.name}</option>)
                    }
                </select>
                {/*只有二级品类列表长度大于0时才显示二级品类选择器*/}
                {this.state.secondCategoryList.length ?
                    (<select className="form-control cate-select"
                             value={this.state.secondCategoryId}
                             onChange={(e) => this.onSecondCategoryChange(e)}
                             readOnly={this.props.readOnly}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.secondCategoryList
                                .map((category, index) =>
                                    <option value={category.id} key={index}>{category.name}</option>)
                        }
                    </select>)
                    : ''
                }

            </div>
        );
    }
}

export default CategorySelector;