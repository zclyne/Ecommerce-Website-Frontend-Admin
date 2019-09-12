'use strict';

import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

// 通用富文本编辑器，依赖jQuery
class RichEditor extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps) { // 回填商品详情
        if (this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail);
        }
    }
    loadEditor() {
        // 在this.refs中通过元素上定义的ref取到元素
        let element = this.refs['textarea'];
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入内容',
            upload: {
                url: '/manage/product/richtext_img_upload.do', // 富文本中的图片上传地址
                defaultImage: '',
                fileKey: 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    bindEditorEvent() { // 初始化富文本编辑器的事件
        // 在富文本中内容发生变化时，取出内容并传递给父组件
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue());
        });
    }
    render () {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor;