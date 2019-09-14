'use strict';

import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from "page/product/index/detail.jsx";
import CategoryList from "page/product/category/index.jsx";

// 分路由，用于在进入了product后，路由到商品列表或品类管理页面
class ProductRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/product/index" component={ProductList} />
                {/*加问号表示是可选的参数*/}
                <Route path="/product/save/:pid?" component={ProductSave} />
                <Route path="/product/detail/:pid" component={ProductDetail} />
                <Route path="/product-category/index/:categoryId?" component={CategoryList} />
                <Redirect exact from="/product" to="/product/index" />
                <Redirect exact from="/product-category" to="/product-category/index" />
            </Switch>
        );
    }
}

export default ProductRouter;