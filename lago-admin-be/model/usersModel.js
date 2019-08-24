 //引入db模块
const db = require("../utils/db-utils");

//lagopro > users(集合)
//进行约束
const usersSchema = db.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

const Users = db.model("users",usersSchema);


//添加用户到数据库的操作
const add = (data)=>{
    //下面两种写法都行
    return Users.insertMany(data)
                .then(res=>true)
                .catch(res=>{
                    return false
                })
}

//根据用户名查询用户是否存在
const findUser = data=>{
    //findOne方法能根据你传的对象过来看看数据库里有没有
    return Users.findOne(data)
}


module.exports = {
    add,findUser
}
