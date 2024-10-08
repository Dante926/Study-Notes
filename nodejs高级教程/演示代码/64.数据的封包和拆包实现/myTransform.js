class MyTransform {
    constructor(options) {
        this.packageHeaderLen = 4;// 包头长度
        this.serialNum = 0;// 包序号
        this.serialLen = 2// 想要获取数据长度
    }

    // 编码
    encode(data, serialNum) {
        const body = Buffer.from(data);// 将编码数据转换成buffer二进制数据

        // 01 先安装指定长度申请一片内存空间作为header来使用
        const headerBuf = Buffer.alloc(this.packageHeaderLen);

        // 02 
        headerBuf.writeInt16BE(serialNum || this.serialNum);// 

        headerBuf.writeInt16BE(body.length, this.serialLen)

        if (serialNum === undefined) {
            serialNum++
        }

        return Buffer.concat([headerBuf, body]);
    }

    // 解码
    decode(buffer) {
        const headerBuf = buffer.slice(0, this.packageHeaderLen);
        const bodyBuf = buffer.slice(this.packageHeaderLen);

        return {
            serialNum: headerBuf.readInt16BE(),
            bodyLength: headerBuf.readInt16BE(this.serialLen),
            body: bodyBuf.toString()
        }
    }

    // 获取包长度方法
    gtePackageLen(buffer) {
        if (buffer.length < this.packageHeaderLen) {
            return 0;
        } else {
            return buffer.readInt16BE(this.serialLen) + this.packageHeaderLen;
        }
    }
}

module.exports = MyTransform;