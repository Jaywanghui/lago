const homeTpl = require("./views/home.html");
const posTpl = require("./views/position.html");
const posAddTpl = require("./views/position.add.html");
const posUpdateTpl = require("./views/position.update.html");
const userInfoTpl = require("./views/userInfo.html");

$(".content").html(homeTpl);

//点击左侧的首页列表进行切换
$(".sidebar-menu li").on("click",function(){
    //实现active的样式切换
    $(this).addClass("active").siblings().removeClass("active");
    let linkAttr = $(this).attr("link");
    //用if..else也可以    
    switch(linkAttr){
        case "home":
            $(".content").html(homeTpl);
            break;
        case "position":
            getPosTable()
        break;
    }
})

//点击添加，打开添加职位的界面,用事件委托,因为这个模版是后续添加的
//content肯定是存在的
$(".content").on("click","#addbtn",e=>{
    $(".content").html(posAddTpl);
})

//点击返回, 返回职位列表

$(".content").on("click","#posback",e=>{
    getPosTable()
})


//显示职位方法
function getPosTable(){
    // $(".content").html(posTpl);
    let token = localStorage.getItem("token");
    $.ajax({
        url:"/api/position/find",
        dataType:"json",
        headers:{
            "X-Access-Token":token
        },
        success:data=>{
            if(data.flag){
                //artTemplate
                //第一个参数渲染那个模板,第二个参数是对象传参数,返回值是生成新的html
                //给posTpl传一个参数data数组,
                var html = template.render(posTpl,{
                    data:data.data
                });
                $(".content").html(html);
            }
        }
    })
}









// function getPosTable(){
//     $(".content").html(posTpl);
//     $.ajax({
//         url:"/api/position/find",
//         dataType:"json",
//         success:data=>{
//             // console.log("data",data);
//             if(data.flag){
//                 //data.data拿到数组，然后map遍历一下
//                 //为什么要用map,因为map是有返回值的，对比一下for.. each
//                 //item代表上述浏览器控制台数组data里面的每一个对象  ,index是索引,从0开始的
//                 let arr = data.data.map((item,index)=>{
//                     return `
//                         <tr>
//                             <td>${index+1}</td>
//                             <td><img width="50" height="50"
//                                     src="https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg" alt="">
//                             </td>
//                             <td>${item.companyName}</td>
//                             <td>${item.positionName}</td>
//                             <td>${item.city}</td>
//                             <td>${item.createTime}</td>
//                             <td>${item.salary}</td>
//                             <td>
//                                 <button class="btn btn-sm btn-primary pos-edit" posid="{{$value._id}}"><span
//                                         class="fa fa-edit"></span> 修改</button>
//                                 <button class="btn btn-sm btn-danger pos-remove" posid="{{$value._id}}"
//                                     filename="{{$value.companyLogo}}"><span class="fa fa-remove"></span> 删除</button>
//                             </td>
//                         </tr>
//                     `
//                 })
//                 $(".table-bordered").append(arr);
//             }
//         }
//     })
// }




//修改职位  后添加的节点事件委托
$(".content").on("click",".pos-edit",function(e){
    let posId = $(this).attr("posid");
    $.ajax({
        //注意：id是动态参数，后台的接口要加:
        url:"/api/position/"+posId,          //api/position/:id
        dataType:"json",
        success:data=>{
            // console.log(data);
            var html = template.render(posUpdateTpl,{
                data:data.data,
            })
            $(".content").html(html);
        }
    })
    // $(".content").html(posUpdateTpl);

})


//点击提交，提交我们的表单数据到后端    ,然后有$(this)不能用箭头函数
$(".content").on("click","#possubmit",function(e){
    let data  = $("#possave").serialize();
    let url = $(this).attr("from") === "add"?"/api/position/add":"/api/position/update"
    $.ajax({
        url,    //url:url可以省略
        data,
        type:"post",
        dataType:"json",
        success:data=>{
        //    console.log(JSON.parse(data));
            if(data.flag){
                getPosTable()
            }else{
                alert("职位操作失败!");
            }
        }
    })
})



//点击删除,提交数据到后端
$(".content").on("click",".pos-remove",function(){
    let posId = $(this).attr("posid");
    // console.log(posId);
    $.ajax({
        url:"/api/position/delete/" + posId,    //url:url可以省略
        // data,
        // type:"post",
        dataType:"json",
        success:data=>{
        //    console.log(JSON.parse(data));
            if(data.flag){
                // console.log(data.flag);
                getPosTable()
            }else{
                alert("职位操作失败!");
            }
        }
    })
})

    
//登录注册代码  下面两个参数是userInfo.html里的
const isSignin = false //未登录
const greeting = "hello world"
renderTpl({isSignin,greeting});
function renderTpl({isSignin,greeting}){
    var html = template.render(userInfoTpl,{
        isSignin,
        greeting
    })
    //倒数第二个li上
    $(".user-menu").html(html);
}

//登录注册
$(".navbar-nav").on("click",".user-menu",e=>{
    if($(e.target).attr("id") === "btn-signup"){//注册
        $("#user-submit").off("click").on("click",async e=>{
            //获取用户名和密码
            let username = $("#username").val();
            let password = $("#password").val();
            //请求ajax
            let result = await sign({username,password},"loginup")
           alert(result.data.message);
        })
    }else if($(e.target).attr("id") === "btn-signin"){
        $("#user-submit").off("click").on("click",async e=>{
            let username = $("#username").val();
            let password = $("#password").val();
            //请求ajax
            let result = await sign({username,password},"loginin");
            //将后端传递进来的token存储到本地
            localStorage.setItem("token",result.data.token);
            renderTpl({
                isSignin:true,
                greeting:result.data.username
            })
        })
    }
})


//验证用户身份
verifyUser();
function verifyUser(){
    //取出localstorage里面的token
    let token = localStorage.getItem("token");
    //将token放入到请求头里面，发送给后端
    $.ajax({
        url:"/api/users/isloginin",
        //请求头headers
        headers:{
            //随便起key名   
            "X-Access-Token":token
        },
        dataType:"json",
        type:"post",
        success:data=>{
            renderTpl({
                isSignin:data.flag,
                greeting:data.data.username
            })
        }
    })
}

//点击退出
$(".user-menu").on("click","#user-signout",()=>{
    localStorage.removeItem("token");
    location.reload();
});

//因为登录和注册都要请求ajax,为了复用写一个
//注意，其实JQ中的ajax返回就是一个promise对象，拿到需要await
function sign(data,uri){
    return $.ajax({
        url:"/api/users/"+uri,
        data,
        type:"post",
        dataType:"json",
        success:data=>{
            return data;
        }
    })
}
 