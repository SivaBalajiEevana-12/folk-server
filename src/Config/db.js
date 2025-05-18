const mongoose = require('mongoose');

const Connection = ()=>{
    return mongoose.connect("mongodb+srv://techiskconhubli:1Ks6XBK8BrT0b9lq@cluster1.tsna8cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
}

module.exports = {Connection}