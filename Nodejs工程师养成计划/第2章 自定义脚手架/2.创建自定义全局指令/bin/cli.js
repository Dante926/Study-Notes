#! /usr/bin/env node

/* 
    #! /usr/bin/env node 意为调用电脑中的node环境执行脚本文件
*/
// console.log('mycli');

// 获取命令行参数
// console.log(process.argv);
if (process.argv[2] === '--help') {
    console.log('获取到了命令参数');
    /* 
       虽然我们可以获取参数，
       但是要处理这些参数过于冗余麻烦，
       推荐使用commander(第三方包)命令行参数处理工具
    */
}

