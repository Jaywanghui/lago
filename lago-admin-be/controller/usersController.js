const usersModel = require("../model/usersModel");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
//注册模块的逻辑
const loginup = async (req,res,next)=>{
    
    let flag = await usersModel.findUser({username:req.body.username});
    if(flag){//数据库存在此用户
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"用户已经存在，请重新注册"})
        });
    }else{//不存在这用户
        let flag = await usersModel.add(req.body);
        flag ? res.render("api.success.ejs",{
            data:JSON.stringify({message:"注册成功"})
        })
            : res.render("api.fail.ejs",{
                data:JSON.stringify({message:"注册失败"})
            })
            
    }
    
    // console.log("flag",flag) ;
    res.end("进入users/loginup哈");
}
//登录模块的逻辑
const loginin = async (req,res,next)=>{
    let flag = await usersModel.findUser(req.body);
    if(flag){
        //用户登录成功，服务端生成token令牌 
        let token = genToken({username:req.body.username});
        res.render("api.success.ejs",{
            data:JSON.stringify({username:req.body.username,token})
        });
    }else{
        res.render("api.fail.ejs",{
            data:JSON.stringify({message:"用户名或者密码输入错误!"})
        });
    }
}   


//生成token令牌
function genToken(payload){
    //payload，负载,就是谁要生成token,//private私钥.//加密算法,设置过期时间//回调函数,用不到不写了
    //非对称加密,生成token的时候，私密加钥
    //后续前端每次请求的时候，需要携带token传递给后端,后端再去对token进行公钥解密
    //生成私钥  ssh-keygen -t rsa -b 2048 -f private.key
    //生成公钥  openssl rsa -in private.key -pubout -outform PEM -out public.key
    //定义私钥
    let privateKey = fs.readFileSync(path.resolve(__dirname,"../keys/private.key")) 
    let token = jwt.sign(payload,privateKey,{algorithm:'RS256',expiresIn:'1h'})
    return token;
}


//验证用户身份，前端请求头上面传递来的token
const isloginin = async(req,res,next)=>{
    res.render("api.success.ejs",{
        data:JSON.stringify({username:req.username})
    });
    // let token = req.header("X-Access-Token");
    // // console.log(token);
    // //进行公钥解密
    // let cert = fs.readFileSync(path.resolve(__dirname,"../keys/public.key"));
    // jwt.verify(token,cert,function(err,decoded){
    //     console.log(err);
    //     if(!err){ba
    //         res.render("api.success.ejs",{
    //             data:JSON.stringify({username:decoded.username})
    //         });
    //     }else{
    //         res.render("api.fail.ejs",{
    //             data:JSON.stringify({message:"验证失败！"})
    //         });  
    //     }
    // }); 
}


module.exports = {
    loginup,loginin,isloginin
} 