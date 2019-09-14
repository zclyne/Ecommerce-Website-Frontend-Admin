'use strict';

import React from 'react';
import PageTitle from "component/page-title/index.jsx";
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

import './save.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 // 商品状态1为在售
        }
    }
    componentDidMount() {
        this.loadProduct();
    }
    loadProduct() { // 加载商品详情
        if (this.state.id) { // 如果id存在，表明是编辑已有的商品，需要表单回填
            _product.getProduct(this.state.id).then((res) => { // 获取商品成功
                let images = res.subImages ? res.subImages.split(',') : [];
                res.subImages = images.map((imgUri) => {
                    return {
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    };
                });
                res.defaultDetail = res.detail;
                this.setState(res);
            }, (errMsg) => { // 获取商品失败
                _mm.errorTips(errMsg);
            });
        }
    }
    onCategoryChange(categoryId, parentCategoryId) { // 子组件品类选择器在选择品类后的回调函数
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        });
    }
    onUploadSuccess(res) { // 上传图片成功
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages: subImages
        });
    }
    onUploadError(errMsg) { // 上传图片失败
        _mm.errorTips(errMsg);
    }
    onImageDelete(e) { // 删除图片
        // 获取index
        let index = parseInt(e.target.getAttribute('index')),
            subImages = this.state.subImages;
        subImages.splice(index, 1); // 从下标index开始删除一个元素
        this.setState({
            subImages: subImages
        });
    }
    onDetailValueChange(value) { // 商品详情的变化事件
        this.setState({
            detail: value
        });
    }
    onValueChange(e) { // 普通字段的内容改变，如商品名称、描述、价格等
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]: value
        });
    }
    getSubImagesString() {
        return this.state.subImages.map((image) => image.uri).join(',');
    }
    onSubmit(e) { // 提交表单
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            stock: parseInt(this.state.stock),
            status: this.state.status,
            price: parseFloat(this.state.price)
        };
        if (this.state.id) {
            product.id = this.state.id;
        }
        let productCheckResult = _product.checkProduct(product);
        if (productCheckResult.status) { // 表单验证成功
            _product.saveProduct(product).then((res) => { // 新增商品成功，提示并跳回商品列表页
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, (errMsg) => { // 新增商品失败
                _mm.errorTips(errMsg);
            });
        } else { // 表单验证失败
            _mm.errorTips(productCheckResult.msg);
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id ? '编辑商品' : '添加商品'} />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   name="name"
                                   value={this.state.name}
                                   onChange={(e) => this.onValueChange(e)}
                                   placeholder="请输入商品名称" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   name="subtitle"
                                   value={this.state.subtitle}
                                   onChange={(e) => this.onValueChange(e)}
                                   placeholder="请输入商品描述" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => {
                                this.onCategoryChange(categoryId, parentCategoryId)
                            }}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       name="price"
                                       value={this.state.price}
                                       onChange={(e) => this.onValueChange(e)}
                                       placeholder="价格" />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       name="stock"
                                       value={this.state.stock}
                                       onChange={(e) => this.onValueChange(e)}
                                       placeholder="库存" />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => (
                                        <div className="img-con" key={index}>
                                            <img src={image.url} className="img" />
                                            <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                        </div>
                                    ))
                                    : (<div>请上传图片</div>)
                            }
                        </div>
                        <div className="col-md-10 col-md-offset-2 file-upload-con">
                            <FileUploader onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg) => this.onUploadError(errMsg)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor
                                detail={this.state.detail}
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)}/>
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
        );
    }
}

export default ProductSave;