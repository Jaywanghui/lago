//引入posModel
const posModel = require("../model/posModel");
const moment = require("moment");
const add = async (req,res,next)=>{
    // res.set("Content-Type","application/json;charset=utf-8");
    //设置日期格式2019-10-3
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm:ss")
    let  flag = await posModel.add(req.body);
    if(flag){//添加职位成功
        res.render("api.success.ejs",{
            data:JSON.stringify({
                "message":"success"
            })
        });
    }else{//添加职位失败
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                "message":"fail"
            })  
        });
    }
}

//写一下find方法,执行查询操作
const find = async (req,res,next)=>{
    //要调用posModel里面的数据库查询方法
    let result = await posModel.find();
    res.render("api.success.ejs",{
        data:JSON.stringify(result)  
    });
}


//根据id查询职位操作信息
const findById = async(req,res,next)=>{
    let result = await posModel.findById(req.params.id);
    //渲染一下
    res.render("api.success.ejs",{
        data:JSON.stringify(result)  
    });
}

//更新操作  id
const update = async(req,res,next)=>{
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm:ss")
    //req.body.id就是获取id,req.body就是修改后的所有内容了
    let flag = await posModel.findByIdAndUpdate(req.body.id,req.body);
    if(flag){
        res.render("api.success.ejs",{
            data:JSON.stringify({
                "message":"success"
            })
        });
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                "message":"fail"
            })  
        });
    } 
}


//删除操作
const deletes = async (req,res,next)=>{
    // console.log(req.params.id);
    let flag = await posModel.findByIdAndRemove(req.params.id);
    
    if(flag){
        res.render("api.success.ejs",{
            data:JSON.stringify({
                "message":"success"
            })
        });
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({
                "message":"fail"
            })  
        });
    } 

}

module.exports = {  
    //key和value相同可以只写add
    add,find,findById,update,deletes
}


  

