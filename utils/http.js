//封装axios

import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://120.79.137.221:801';

//封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装put请求
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//封装delete请求
export function deleteDate(url) {
    return new Promise((resolve, reject) => {
        axios.delete(url)
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//请求成功提示消息
export function success(str) {
    return this.$message({
        message: str,
        type: 'success'
    })
}

//请求失败提示消息
export function fail(str) {
    return this.$message({
        message: str,
        type: 'error'
    })
}

//处理时间格式
export function handleTime(str) {
    if (str) {
        let a = str.substring(0, 19);
        return a.replace("T", ' ');
    }
}