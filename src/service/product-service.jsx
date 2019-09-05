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