//引入db模块
const db = require("../utils/db-utils");

//lagopro > positions(集合)
//进行约束
const positionSchema = db.Schema({
    //required:表示是否要插入到数据库当中，true表示必须,false表示不必须
    companyName:{type:String,required:true},
    positionName:{type:String,required:true},
    city:{type:String,required:true},
    salary:{type:String,required:true},
    type:{type:String,required:true},  
    experience:{type:String,required:true},
    degree:{type:String,required:true},
    description:{type:String,required:true},
    createTime:{type:String,required:true}
})

//创建集合
const Position = db.model("positions",positionSchema); 

//进行插入操作,这样拿不到返回值
// const add = (data)=>{
//     return Position.insertMany(data,(err)=>{
//         if(err){
//             console.log("插入数据失败!");
//             return false;
//         }else{
//             console.log("插入数据成功!");
//             return true;
//         }
//     })
// }


//进行插入操作  ,return返回promise对象 
const add = (data)=>{
    return Position.insertMany(data).then(res=>{
        return true;
    }).catch(err=>{
        return false;
    })
}

//查询所有职位的方法
const find = ()=>{
    return Position.find()
}

//根据id查询对应的职位信息
const findById = id=>{
    return Position.findById(id);
}

//根据传入的id修改数据
const findByIdAndUpdate = (id,data)=>{
    return Position.findByIdAndUpdate(id,data)
                   .then(res=>{
                       return true;
                   })
                   .catch(err=>{
                       return false;
                   })
}



const findByIdAndRemove = (id,data)=>{
    return Position.findByIdAndDelete(id,data)
    .then(res=>{
        return true;
    })
    .catch(err=>{
        return false;
    })
}

module.exports = {
    add,find,findById,findByIdAndUpdate,findByIdAndRemove
}


