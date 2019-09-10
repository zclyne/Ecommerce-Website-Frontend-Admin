'use strict';

import React from 'react';
import ReactFileupload from './react-fileupload.jsx';

class FileUploader extends React.Component {
    render() {
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError: (err) => {
                this.props.onError(err.message || '上传图片出错啦');
            }
        };
        return (
            <ReactFileupload options={options}>
                <button ref="chooseAndUpload" className="btn btn-xs btn-default">选择图片</button>
            </ReactFileupload>
        )
    }
}

export default FileUploader;