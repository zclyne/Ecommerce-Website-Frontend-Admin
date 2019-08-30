'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';



// 基础jsx和样式
let style = {
    color: 'r' + 'ed'
};
let jsx = <div className="jsx" style={style}>jsx...</div>;

ReactDOM.render(
    jsx,
    document.getElementById('app'));



// 在jsx中使用变量和条件判断
let name = 'Yifan';
let names= ['Kaori', 'Inori', 'Asuna'];
let flag = false;
let jsx = (
    <div>
        {/*变量使用*/}
        <p>我是{name}</p>

        {/*条件判断*/}
        {
            flag ? <p>I am {name}</p> : <p>I am not {name}</p>
        }

        {/*数组循环*/}
        {
            names.map((name, index) => <p key={index}>Hello, I am {name}</p>)
        }
    </div>
);

ReactDOM.render(
    jsx,
    document.getElementById('app'));


