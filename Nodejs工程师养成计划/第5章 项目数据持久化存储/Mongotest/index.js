const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://127.0.0.1:27017');

const clientFun = async function (c) {
    await client.connect();
    const db = client.db('mytest');
    return db.collection(c);
}

const main = async () => {
    try {
        const cc = await clientFun('cc');
        // 添加数据
        /* const d = await cc.insertMany([
            { username: 'monica', age: 18 },
            { username: 'caca', age: 20 }
        ]); // 传入一个数组 */

        // 更新数据
        /* const d = await cc.updateOne(
            { username: 'monica' },
            { $set: { age: 19 } }
        ); */

        // 查找数据
        /* const d = await cc.find({ username: 'monica' });
        console.log(await d.toArray()); */

        // 删除数据
        /* const d = await cc.deleteOne({ username: 'monica' });
        console.log(d); */

    } catch (error) {
        console.error('Error inserting documents:', error);
    }
}

main().finally(() => client.close());
