const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    let token = req.header("X-Access-Token");
    // console.log(token);
    //进行公钥解密
    let cert = fs.readFileSync(path.resolve(__dirname,"../keys/public.key"));
    jwt.verify(token,cert,function(err,decoded){
        console.log(err);
        if(!err){
            // res.render("api.success.ejs",{
            //     data:JSON.stringify({username:decoded.username})
            // });
            req.username = decoded.username;
            next();
        }else{
            res.render("api.fail.ejs",{
                data:JSON.stringify({message:"验证失败！"})
            });  
        }
    }); 
}