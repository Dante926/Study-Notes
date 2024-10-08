// 需求：希望有个服务，可以根据请求的接口内容返回相应的数据

const express = require('express');
import {DataStore} from './data';

console.log(DataStore.list);


const app = express();

app.get('/',(req:any,res:any)=>{
    // res.end('hello world')
    res.json(DataStore.list);
});

app.listen(8848,()=>{
    console.log('server is running at port 8000');
});