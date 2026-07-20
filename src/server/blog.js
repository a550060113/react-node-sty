import request from './request';

/**
 * 分页获取文章列表
 */
export function getBlogByPage(params) {
    return request('/api/blog', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}

export function delBlog(id) {
    return request('/api/blog/'+id, {
        method: 'DELETE',
    });
}


export function getBlogType() {
    return request('/api/blogType', {
        method: 'GET',
    });
}

export function addBlog(data) {
    return request('/api/blog', {
        method: 'POST',
        data
    });
}


export function uploadImg(data) {
    return request('/api/upload', {
        method: 'POST',
        data
    });
}

