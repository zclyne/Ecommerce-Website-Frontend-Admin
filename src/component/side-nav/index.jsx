'use strict';

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        <li>
                            {/*NavLink是由react-router提供的，当页面的当前路径与NavLink的路径匹配时，就会加上activeClassName中指定的class*/}
                            {/*此处必须要加exact，否则所有的路径都会匹配到/，导致首页总是active*/}
                            <NavLink exact to="/" activeClassName="active-menu">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>

                        <li className="active">
                            {/*具有二级菜单的link没有active状态，所以不需要用NavLink*/}
                            <Link to="/product">
                                <i className="fa fa-sitemap"></i>
                                <span>商品</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/order">
                                <i className="fa fa-sitemap"></i>
                                <span>订单</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-sitemap"></i>
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                            </ul>
                        </li>

                    </ul>

                </div>

            </div>
        );
    }
}

export default SideNav;