import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {
    getProductList(listParam) { // 获取商品列表信息
        let url = '',
            data = {};
        if (listParam.listType === 'list') { // 如果是列举
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') { // 如果是搜索
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });
    }
    setProductStatus(productInfo) { // 变更商品销售状态
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }
    checkProduct(product) { // 检查保存商品的表单数据
        let result = {
            status: true,
            msg: '验证通过'
        };
        if (typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空！'
            };
        }
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空！'
            };
        }
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类！'
            };
        }
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            };
        }
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            };
        }
        return result; // 验证成功
    }
    saveProduct(product) { // 保存商品
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        });
    }
    getProduct(productId) { // 获取商品信息
        return _mm.request({
            url: '/manage/product/detail.do',
            data: {
                productId: productId || 0
            }
        });
    }


    // 品类相关

    getCategoryList(parentCategoryId) { // 获取子品类列表
        return _mm.request({
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        });
    }
}

export default Product;