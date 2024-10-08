const http = require('http');

let server = http.createServer((req,res)=>{
    // 针对请求和响应做处理
    console.log('111');
});

server.listen(3000,()=>{
    console.log('服务启动了...');
});