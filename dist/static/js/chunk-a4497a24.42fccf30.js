(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a4497a24"],{4565:function(e,t,s){"use strict";s("b195")},5646:function(e,t,s){"use strict";s.d(t,"a",(function(){return n}));var r=s("b775"),o=s("4328"),a=s.n(o);function n(e){return Object(r["a"])({url:"/api/message/sendCode",method:"post",data:a.a.stringify(e)})}},aa4b:function(e,t,s){"use strict";s("ba66")},b195:function(e,t,s){},ba66:function(e,t,s){},d5c2:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login-container"},[s("el-form",{ref:"registerForm",staticClass:"login-form",attrs:{model:e.registerForm,rules:e.registerRules,"auto-complete":"on","label-position":"left"}},[s("div",{staticClass:"title-container"},[s("h3",{staticClass:"title"},[e._v("注册 - 成为海龟一族")])]),e._v(" "),s("el-form-item",{attrs:{prop:"account"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"user"}})],1),e._v(" "),s("el-input",{ref:"account",attrs:{placeholder:"手机/邮箱",name:"account",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.registerForm.account,callback:function(t){e.$set(e.registerForm,"account",t)},expression:"registerForm.account"}})],1),e._v(" "),s("el-form-item",{attrs:{prop:"password"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),s("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"密码",name:"password",tabindex:"2","auto-complete":"on"},model:{value:e.registerForm.password,callback:function(t){e.$set(e.registerForm,"password",t)},expression:"registerForm.password"}}),e._v(" "),s("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[s("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),e._v(" "),s("el-form-item",{attrs:{prop:"code"}},[s("span",{staticClass:"svg-container"},[s("svg-icon",{attrs:{"icon-class":"password"}})],1),e._v(" "),s("el-input",{ref:"code",staticStyle:{width:"330px"},attrs:{placeholder:"验证码",name:"code",type:"text",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleRegister(t)}},model:{value:e.registerForm.code,callback:function(t){e.$set(e.registerForm,"code",t)},expression:"registerForm.code"}}),e._v(" "),e.sendCoded?e._e():s("el-button",{staticStyle:{color:"grey"},attrs:{type:"text"},on:{click:e.getCode}},[e._v("获取验证码")])],1),e._v(" "),s("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleRegister(t)}}},[e._v("注册")]),e._v(" "),s("div",{staticClass:"tips"},[s("el-link",{attrs:{underline:!1,href:"/#/login"}},[e._v("\n        已有账号？点我去登陆\n      ")])],1)],1)],1)},o=[],a=s("61f7"),n=s("5646"),i=s("2d8e"),c={name:"Register",data:function(){var e=function(e,t,s){Object(a["b"])(t)?s():s(new Error("请输入正确的账号名"))},t=function(e,t,s){t.length<6?s(new Error("密码不能少于六位字符")):s()},s=function(e,t,s){""===t?s(new Error("验证码不能为空")):s()};return{registerForm:{account:"",password:"",code:""},registerRules:{account:[{required:!0,trigger:"blur",validator:e}],password:[{required:!0,trigger:"blur",validator:t}],code:[{required:!0,trigger:"blur",validator:s}]},register:!1,loading:!1,sendCoded:!1,redirect:void 0,passwordType:"password"}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},methods:{handleRegister:function(){var e=this;this.$refs.registerForm.validate((function(t){if(!t)return e.$message({message:"错误注册",type:"error"}),!1;Object(i["e"])(e.registerForm).then((function(t){e.$message({message:"注册成功，请登陆",type:"success"}),e.$router.push("/login")}))}))},getCode:function(){var e=this;Object(n["a"])({account:this.registerForm.account,sceneCode:"register_by_code"}).then((function(t){e.$message({message:"验证码发送成功",type:"success"}),e.sendCoded=!0}))},showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))}}},d=c,l=(s("4565"),s("aa4b"),s("2877")),u=Object(l["a"])(d,r,o,!1,null,"15168b7f",null);t["default"]=u.exports}}]);