/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const homeTpl = __webpack_require__(/*! ./views/home.html */ \"./src/scripts/views/home.html\");\r\nconst posTpl = __webpack_require__(/*! ./views/position.html */ \"./src/scripts/views/position.html\");\r\nconst posAddTpl = __webpack_require__(/*! ./views/position.add.html */ \"./src/scripts/views/position.add.html\");\r\nconst posUpdateTpl = __webpack_require__(/*! ./views/position.update.html */ \"./src/scripts/views/position.update.html\");\r\nconst userInfoTpl = __webpack_require__(/*! ./views/userInfo.html */ \"./src/scripts/views/userInfo.html\");\r\n\r\n$(\".content\").html(homeTpl);\r\n\r\n//点击左侧的首页列表进行切换\r\n$(\".sidebar-menu li\").on(\"click\",function(){\r\n    //实现active的样式切换\r\n    $(this).addClass(\"active\").siblings().removeClass(\"active\");\r\n    let linkAttr = $(this).attr(\"link\");\r\n    //用if..else也可以    \r\n    switch(linkAttr){\r\n        case \"home\":\r\n            $(\".content\").html(homeTpl);\r\n            break;\r\n        case \"position\":\r\n            getPosTable()\r\n        break;\r\n    }\r\n})\r\n\r\n//点击添加，打开添加职位的界面,用事件委托,因为这个模版是后续添加的\r\n//content肯定是存在的\r\n$(\".content\").on(\"click\",\"#addbtn\",e=>{\r\n    $(\".content\").html(posAddTpl);\r\n})\r\n\r\n//点击返回, 返回职位列表\r\n\r\n$(\".content\").on(\"click\",\"#posback\",e=>{\r\n    getPosTable()\r\n})\r\n\r\n\r\n//显示职位方法\r\nfunction getPosTable(){\r\n    // $(\".content\").html(posTpl);\r\n    let token = localStorage.getItem(\"token\");\r\n    $.ajax({\r\n        url:\"/api/position/find\",\r\n        dataType:\"json\",\r\n        headers:{\r\n            \"X-Access-Token\":token\r\n        },\r\n        success:data=>{\r\n            if(data.flag){\r\n                //artTemplate\r\n                //第一个参数渲染那个模板,第二个参数是对象传参数,返回值是生成新的html\r\n                //给posTpl传一个参数data数组,\r\n                var html = template.render(posTpl,{\r\n                    data:data.data\r\n                });\r\n                $(\".content\").html(html);\r\n            }\r\n        }\r\n    })\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// function getPosTable(){\r\n//     $(\".content\").html(posTpl);\r\n//     $.ajax({\r\n//         url:\"/api/position/find\",\r\n//         dataType:\"json\",\r\n//         success:data=>{\r\n//             // console.log(\"data\",data);\r\n//             if(data.flag){\r\n//                 //data.data拿到数组，然后map遍历一下\r\n//                 //为什么要用map,因为map是有返回值的，对比一下for.. each\r\n//                 //item代表上述浏览器控制台数组data里面的每一个对象  ,index是索引,从0开始的\r\n//                 let arr = data.data.map((item,index)=>{\r\n//                     return `\r\n//                         <tr>\r\n//                             <td>${index+1}</td>\r\n//                             <td><img width=\"50\" height=\"50\"\r\n//                                     src=\"https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg\" alt=\"\">\r\n//                             </td>\r\n//                             <td>${item.companyName}</td>\r\n//                             <td>${item.positionName}</td>\r\n//                             <td>${item.city}</td>\r\n//                             <td>${item.createTime}</td>\r\n//                             <td>${item.salary}</td>\r\n//                             <td>\r\n//                                 <button class=\"btn btn-sm btn-primary pos-edit\" posid=\"{{$value._id}}\"><span\r\n//                                         class=\"fa fa-edit\"></span> 修改</button>\r\n//                                 <button class=\"btn btn-sm btn-danger pos-remove\" posid=\"{{$value._id}}\"\r\n//                                     filename=\"{{$value.companyLogo}}\"><span class=\"fa fa-remove\"></span> 删除</button>\r\n//                             </td>\r\n//                         </tr>\r\n//                     `\r\n//                 })\r\n//                 $(\".table-bordered\").append(arr);\r\n//             }\r\n//         }\r\n//     })\r\n// }\r\n\r\n\r\n\r\n\r\n//修改职位  后添加的节点事件委托\r\n$(\".content\").on(\"click\",\".pos-edit\",function(e){\r\n    let posId = $(this).attr(\"posid\");\r\n    $.ajax({\r\n        //注意：id是动态参数，后台的接口要加:\r\n        url:\"/api/position/\"+posId,          //api/position/:id\r\n        dataType:\"json\",\r\n        success:data=>{\r\n            // console.log(data);\r\n            var html = template.render(posUpdateTpl,{\r\n                data:data.data,\r\n            })\r\n            $(\".content\").html(html);\r\n        }\r\n    })\r\n    // $(\".content\").html(posUpdateTpl);\r\n\r\n})\r\n\r\n\r\n//点击提交，提交我们的表单数据到后端    ,然后有$(this)不能用箭头函数\r\n$(\".content\").on(\"click\",\"#possubmit\",function(e){\r\n    let data  = $(\"#possave\").serialize();\r\n    let url = $(this).attr(\"from\") === \"add\"?\"/api/position/add\":\"/api/position/update\"\r\n    $.ajax({\r\n        url,    //url:url可以省略\r\n        data,\r\n        type:\"post\",\r\n        dataType:\"json\",\r\n        success:data=>{\r\n        //    console.log(JSON.parse(data));\r\n            if(data.flag){\r\n                getPosTable()\r\n            }else{\r\n                alert(\"职位操作失败!\");\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n\r\n\r\n//点击删除,提交数据到后端\r\n$(\".content\").on(\"click\",\".pos-remove\",function(){\r\n    let posId = $(this).attr(\"posid\");\r\n    // console.log(posId);\r\n    $.ajax({\r\n        url:\"/api/position/delete/\" + posId,    //url:url可以省略\r\n        // data,\r\n        // type:\"post\",\r\n        dataType:\"json\",\r\n        success:data=>{\r\n        //    console.log(JSON.parse(data));\r\n            if(data.flag){\r\n                // console.log(data.flag);\r\n                getPosTable()\r\n            }else{\r\n                alert(\"职位操作失败!\");\r\n            }\r\n        }\r\n    })\r\n})\r\n\r\n    \r\n//登录注册代码  下面两个参数是userInfo.html里的\r\nconst isSignin = false //未登录\r\nconst greeting = \"hello world\"\r\nrenderTpl({isSignin,greeting});\r\nfunction renderTpl({isSignin,greeting}){\r\n    var html = template.render(userInfoTpl,{\r\n        isSignin,\r\n        greeting\r\n    })\r\n    //倒数第二个li上\r\n    $(\".user-menu\").html(html);\r\n}\r\n\r\n//登录注册\r\n$(\".navbar-nav\").on(\"click\",\".user-menu\",e=>{\r\n    if($(e.target).attr(\"id\") === \"btn-signup\"){//注册\r\n        $(\"#user-submit\").off(\"click\").on(\"click\",async e=>{\r\n            //获取用户名和密码\r\n            let username = $(\"#username\").val();\r\n            let password = $(\"#password\").val();\r\n            //请求ajax\r\n            let result = await sign({username,password},\"loginup\")\r\n           alert(result.data.message);\r\n        })\r\n    }else if($(e.target).attr(\"id\") === \"btn-signin\"){\r\n        $(\"#user-submit\").off(\"click\").on(\"click\",async e=>{\r\n            let username = $(\"#username\").val();\r\n            let password = $(\"#password\").val();\r\n            //请求ajax\r\n            let result = await sign({username,password},\"loginin\");\r\n            //将后端传递进来的token存储到本地\r\n            localStorage.setItem(\"token\",result.data.token);\r\n            renderTpl({\r\n                isSignin:true,\r\n                greeting:result.data.username\r\n            })\r\n        })\r\n    }\r\n})\r\n\r\n\r\n//验证用户身份\r\nverifyUser();\r\nfunction verifyUser(){\r\n    //取出localstorage里面的token\r\n    let token = localStorage.getItem(\"token\");\r\n    //将token放入到请求头里面，发送给后端\r\n    $.ajax({\r\n        url:\"/api/users/isloginin\",\r\n        //请求头headers\r\n        headers:{\r\n            //随便起key名   \r\n            \"X-Access-Token\":token\r\n        },\r\n        dataType:\"json\",\r\n        type:\"post\",\r\n        success:data=>{\r\n            renderTpl({\r\n                isSignin:data.flag,\r\n                greeting:data.data.username\r\n            })\r\n        }\r\n    })\r\n}\r\n\r\n//点击退出\r\n$(\".user-menu\").on(\"click\",\"#user-signout\",()=>{\r\n    localStorage.removeItem(\"token\");\r\n    location.reload();\r\n});\r\n\r\n//因为登录和注册都要请求ajax,为了复用写一个\r\n//注意，其实JQ中的ajax返回就是一个promise对象，拿到需要await\r\nfunction sign(data,uri){\r\n    return $.ajax({\r\n        url:\"/api/users/\"+uri,\r\n        data,\r\n        type:\"post\",\r\n        dataType:\"json\",\r\n        success:data=>{\r\n            return data;\r\n        }\r\n    })\r\n}\r\n \n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class = \\\"home\\\">    <h3>拉勾网是采用了node.js+mongodb+express技术栈实现的</h3></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/home.html?");

/***/ }),

/***/ "./src/scripts/views/position.add.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/position.add.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位添加</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\"></textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button from=\\\"add\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.add.html?");

/***/ }),

/***/ "./src/scripts/views/position.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/position.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">    <div class=\\\"box-header with-border\\\">        <h3 class=\\\"box-title\\\">            <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>        </h3>        <div class=\\\"box-tools\\\">            <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">                <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">                <div class=\\\"input-group-btn\\\">                    <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>                </div>            </div>        </div>    </div>    <!-- /.box-header -->    <div class=\\\"box-body\\\">        <table class=\\\"table table-bordered\\\">            <tr>                <th style=\\\"width: 10px\\\">#</th>                <th>公司Logo</th>                <th>公司名称</th>                <th>职位名称</th>                <th>工作地点</th>                <th>发布时间</th>                <th>岗位薪资</th>                <th style=\\\"width: 140px\\\">操作</th>            </tr>            <!-- data是app.js传过来的 -->            {{each data}}            <tr>                <td>{{$index+1}}</td>                <td><img width=\\\"50\\\" height=\\\"50\\\"                        src=\\\"https://www.lgstatic.com/i/image3/M00/12/AF/CgpOIFpu7ROAU0UaAAAvwWv_H_w082.jpg\\\" alt=\\\"\\\">                </td>                <td>{{$value.companyName}}</td>                <td>{{$value.positionName}}</td>                <td>{{$value.city}}</td>                <td>{{$value.createTime}}</td>                <td>{{$value.salary}}</td>                <td>                    <button class=\\\"btn btn-sm btn-primary pos-edit\\\" posid=\\\"{{$value._id}}\\\"><span                            class=\\\"fa fa-edit\\\"></span> 修改</button>                    <button class=\\\"btn btn-sm btn-danger pos-remove\\\" posid=\\\"{{$value._id}}\\\"                        filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>                </td>            </tr>            {{/each}}            <!-- <tr>          <td colspan=\\\"8\\\">暂无记录。</td>        </tr> -->        </table>    </div></div><!-- /.box -->\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.html?");

/***/ }),

/***/ "./src/scripts/views/position.update.html":
/*!************************************************!*\
  !*** ./src/scripts/views/position.update.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位修改</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.companyName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.positionName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.city}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.salary}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.type}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.experience}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.degree}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea  rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\">{{data.description}}</textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button from = \\\"update\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->    <!-- 设置隐藏域，就是我们把这个字段传给后端，但不是让用户去填 ,数据库传递过来的-->    <input type=\\\"hidden\\\" name =\\\"id\\\" value = \\\"{{data._id}}\\\">  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.update.html?");

/***/ }),

/***/ "./src/scripts/views/userInfo.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/userInfo.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!-- User Account Menu -->    <!-- Menu Toggle Button -->    <a href=\\\"#\\\" class=\\\"dropdown-toggle\\\" data-toggle=\\\"dropdown\\\">        <!-- The user image in the navbar-->        {{if isSignin}}        <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"user-image\\\" alt=\\\"User Image\\\">        <!-- hidden-xs hides the username on small devices so only the image appears. -->        <span class=\\\"hidden-xs\\\">{{greeting}}</span>        {{else}}        <div id=\\\"click-btn\\\">            <span id=\\\"btn-signin\\\">登录</span>            <span id=\\\"btn-signup\\\">注册</span>        </div>        {{/if}}    </a>    <ul class=\\\"dropdown-menu\\\">        <!-- The user image in the menu -->        {{if !isSignin}}        <li class=\\\"user-header\\\" id=\\\"user-header\\\">            <form role=\\\"form\\\">                <div class=\\\"box-body\\\">                    <div class=\\\"form-group user\\\">                        <label for=\\\"exampleInputEmail1\\\">用户名：</label>                        <input type=\\\"text\\\" class=\\\"form-control\\\" id=\\\"username\\\" placeholder=\\\"请输入用户名\\\">                    </div>                    <div class=\\\"form-group\\\">                        <label for=\\\"exampleInputPassword1\\\">密码：</label>                        <input type=\\\"password\\\" class=\\\"form-control\\\" id=\\\"password\\\" placeholder=\\\"请输入密码\\\">                    </div>                </div>            </form>        </li>        {{else}}        <li class=\\\"user-header\\\">            <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"img-circle\\\" alt=\\\"User Image\\\">        </li>        {{/if}}        <!-- Menu Footer-->        <li class=\\\"user-footer\\\">            <div class=\\\"pull-left\\\">                <a href=\\\"javascript:void(0)\\\" class=\\\"btn btn-default btn-flat\\\">关闭</a>            </div>            {{if !isSignin}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-submit\\\" class=\\\"btn btn-default btn-flat\\\">提交</a>            </div>            {{else}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-signout\\\" class=\\\"btn btn-default btn-flat\\\">退出</a>            </div>            {{/if}}        </li>    </ul>\"\n\n//# sourceURL=webpack:///./src/scripts/views/userInfo.html?");

/***/ })

/******/ });