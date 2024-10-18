# 接口说明
·基于RESTful API 接口规范
·基于JWT身份认证
·使用CORS跨域
·接口请求地址：'http://127.0.0.1:3000/api/v1'
·使用JSON格式进行数据通信


## 用户注册
`path`:[/user/registers](http://127.0.0.1:3000/api/v1/user/register)
`method`:POST
是否认证：否

>请求体
```json
{
    "username":"Dante",
    "password":"123456",
    "email":"dante@163.com",
    "phone":"12345678910"
}
```
| 字段名 | 字段类型 | 是否必须 |\- |
| --- | --- | --- | --- |
| username | string | 是 |
| email | string | 是 | 
| phone | string | 是 |

>请求示例
```json
{
    "username":"Dante",
    "password":"123456",
    "email":"dante@163.com",
    "phone":"12345678910",
    "age":18
}
```

>响应示例
```json
// success
{
    "cb": {
        "username": "Dante",
        "email": "dante@163.com",
        "age": 18,
        "phone": "12345678910",
        "createTime": "2024-10-17T02:11:38.685Z",
        "updateTime": "2024-10-17T02:11:38.685Z",
        "_id": "6710725bba841a7b87c8a1ca",
        "__v": 0
    }
}
```

```json
// error
{
    "error": [
        {
            "type": "field",
            "value": "12345678910",
            "msg": "手机号已被注册",
            "path": "phone",
            "location": "body"
        },
    ]
}
```