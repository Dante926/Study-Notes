const fs = require('fs');
const { promisify } = require('util');// 这种用{}的是按需调用
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
exports.getDb = async () => {
    let data = await readFile('./db.json', 'utf-8')
    return JSON.parse(data)
}

exports.serveDb = async (data) => {
    let stringData = JSON.stringify(data)
    return await writeFile('./db.json', stringData)
}