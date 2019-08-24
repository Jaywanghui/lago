//引入mongoose
const mongoose = require("mongoose");
//连接  数据库名为lagopro
mongoose.connect("mongodb://localhost:27017/lagopro",{useNewUrlParser:true});
//对外暴露
module.exports = mongoose;

//mvc   model