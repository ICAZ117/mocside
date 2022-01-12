(self.webpackChunk=self.webpackChunk||[]).push([[383],{9253:(e,t,r)=>{e=r.nmd(e),ace.require(["ace/mode/text"],(function(t){e&&(e.exports=t)}))},3142:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var n=r(7757),o=r.n(n),a=r(6532);function s(e,t,r,n,o,a,s){try{var l=e[a](s),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}const l={uploadFile:function(e){return(t=o().mark((function t(){var r;return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,a.x.post(e.endpoint,e.file);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function l(e){s(a,n,o,l,c,"next",e)}function c(e){s(a,n,o,l,c,"throw",e)}l(void 0)}))})();var t}}},2684:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var n=r(5166);const o={name:"BaseBtn",props:{type:{type:String,default:"submit"},text:{type:String,default:"Submit"}},render:function(e,t,r,o,a,s){return(0,n.openBlock)(),(0,n.createBlock)("button",(0,n.mergeProps)({type:r.type},e.$attrs,{class:"px-2.5 py-1.5 border border-transparent text-xs rounded shadow-sm text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center transition"}),(0,n.toDisplayString)(r.text),17,["type"])}},a=o},236:(e,t,r)=>{"use strict";r.d(t,{Z:()=>h});var n=r(5166),o={class:"mb-4"},a={for:"file",class:"sr-only"};var s=r(7757),l=r.n(s),c=r(7181),u=r(2684),i=r(3142),d=r(4240);function p(e,t,r,n,o,a,s){try{var l=e[a](s),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}const f={name:"FileUpload",props:{fileTypes:{type:Array,default:null},endpoint:{type:String,required:!0},label:{type:String,default:""}},components:{BaseBtn:u.Z,FlashMessage:d.Z},data:function(){return{file:null,message:null,error:null}},methods:{clearMessage:function(){this.error=null,this.message=null},fileChange:function(e){this.clearMessage(),this.file=e.target.files[0]},uploadFile:function(){var e,t=this;return(e=l().mark((function e(){var r,n;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={},(n=new FormData).append("file",t.file),r.file=n,r.endpoint=t.endpoint,t.clearMessage(),e.prev=6,e.next=9,i.Z.uploadFile(r);case 9:e.sent,t.message="File uploaded.",e.next=16;break;case 13:e.prev=13,e.t0=e.catch(6),t.error=(0,c.b)(e.t0);case 16:case"end":return e.stop()}}),e,null,[[6,13]])})),function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function s(e){p(a,n,o,s,l,"next",e)}function l(e){p(a,n,o,s,l,"throw",e)}s(void 0)}))})()}},render:function(e,t,r,s,l,c){var u=(0,n.resolveComponent)("BaseBtn"),i=(0,n.resolveComponent)("FlashMessage");return(0,n.openBlock)(),(0,n.createBlock)("form",{onSubmit:t[2]||(t[2]=(0,n.withModifiers)((function(){return c.uploadFile&&c.uploadFile.apply(c,arguments)}),["prevent"]))},[(0,n.createVNode)("div",o,[(0,n.createVNode)("label",a,(0,n.toDisplayString)(r.label),1),(0,n.createVNode)("input",{type:"file",accept:r.fileTypes,onChange:t[1]||(t[1]=function(){return c.fileChange&&c.fileChange.apply(c,arguments)}),id:"file"},null,40,["accept"])]),(0,n.createVNode)(u,{text:"Upload"}),(0,n.createVNode)(i,{message:l.message,error:l.error},null,8,["message","error"])],32)}},h=f},4240:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var n=r(5166),o={key:0,class:"mt-2 text-sm text-green-500"},a={key:1,class:"mt-2 text-sm text-red-500"};const s={name:"FlashMessage",props:{message:{type:String,default:null},error:{type:[Error,String],default:null}},render:function(e,t,r,s,l,c){return(0,n.openBlock)(),(0,n.createBlock)("div",null,[r.message?((0,n.openBlock)(),(0,n.createBlock)("p",o,(0,n.toDisplayString)(r.message),1)):(0,n.createCommentVNode)("",!0),r.error?((0,n.openBlock)(),(0,n.createBlock)("p",a,(0,n.toDisplayString)(r.error),1)):(0,n.createCommentVNode)("",!0)])}},l=s},5383:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>ze});var n=r(5166),o={class:"courses header"},a={class:"heading"},s=(0,n.createVNode)("p",{style:{margin:"auto !important"}}," You have unsaved changes! Are you sure you want to continue? ",-1),l=(0,n.createVNode)("br",null,null,-1),c={class:"row"},u={class:"row h-100"},i={class:"col-3",style:{"border-right":"1px var(--FSCgrey) solid !important"}},d={class:"profile-picture"},p=(0,n.createVNode)("img",{class:"large-pfp",src:"this.user.pfp",alt:"Profile",id:"pfp"},null,-1),f=(0,n.createVNode)("br",null,null,-1),h={class:"col-9 settings",style:{padding:"50px !important",height:"100%",color:"#888"}},m={class:"profile-section"},g={class:"editable"},v=(0,n.createVNode)("h3",null,"Profile Options",-1),b={class:"row"},V={class:"col-6"},N=(0,n.createVNode)("label",{for:"Name"},"Name: ",-1),w=(0,n.createVNode)("br",null,null,-1),k=(0,n.createVNode)("br",null,null,-1),x=(0,n.createVNode)("label",{for:"pronouns"},"Preferred Pronouns: ",-1),y={class:"col-6"},C=(0,n.createVNode)("label",{for:"ScreenName"},"ScreenName: ",-1),U=(0,n.createVNode)("br",null,null,-1),P=(0,n.createVNode)("br",null,null,-1),M=(0,n.createVNode)("label",{for:"FSCID"},"FSC ID: ",-1),_=(0,n.createVNode)("br",null,null,-1),D=(0,n.createVNode)("br",null,null,-1),S=(0,n.createVNode)("hr",null,null,-1),B=(0,n.createVNode)("br",null,null,-1),E=(0,n.createVNode)("br",null,null,-1),O={class:"Editor-Settings"},F=(0,n.createVNode)("h3",null,"Console Options",-1),A={class:"row"},T={class:"col-6"},I=(0,n.createVNode)("label",{for:"Theme"},"Default Theme: ",-1),L=(0,n.createVNode)("optgroup",{label:"Dark"},[(0,n.createVNode)("option",{value:"ambiance"},"Ambiance"),(0,n.createVNode)("option",{value:"chaos"},"Chaos"),(0,n.createVNode)("option",{value:"clouds_midnight"},"Clouds Midnight"),(0,n.createVNode)("option",{value:"dracula"},"Dracula"),(0,n.createVNode)("option",{value:"cobalt"},"Cobalt"),(0,n.createVNode)("option",{value:"gruvbox"},"Gruvbox"),(0,n.createVNode)("option",{value:"gob",selected:""},"Green on Black"),(0,n.createVNode)("option",{value:"idle_fingers"},"idle Fingers"),(0,n.createVNode)("option",{value:"kr_theme"},"krTheme"),(0,n.createVNode)("option",{value:"merbivore"},"Merbivore"),(0,n.createVNode)("option",{value:"merbivore_soft"},"Merbivore Soft"),(0,n.createVNode)("option",{value:"mono_industrial"},"Mono Industrial"),(0,n.createVNode)("option",{value:"monokai"},"Monokai"),(0,n.createVNode)("option",{value:"nord_dark"},"Nord Dark"),(0,n.createVNode)("option",{value:"pastel_on_dark"},"Pastel on dark"),(0,n.createVNode)("option",{value:"solarized_dark"},"Solarized Dark"),(0,n.createVNode)("option",{value:"terminal"},"Terminal"),(0,n.createVNode)("option",{value:"tomorrow_night"},"Tomorrow Night"),(0,n.createVNode)("option",{value:"tomorrow_night_blue"},"Tomorrow Night Blue"),(0,n.createVNode)("option",{value:"tomorrow_night_bright"},"Tomorrow Night Bright"),(0,n.createVNode)("option",{value:"tomorrow_night_eighties"},"Tomorrow Night 80s"),(0,n.createVNode)("option",{value:"twilight"},"Twilight"),(0,n.createVNode)("option",{value:"vibrant_ink"},"Vibrant Ink")],-1),j=(0,n.createVNode)("optgroup",{label:"Light"},[(0,n.createVNode)("option",{value:"chrome"},"Chrome"),(0,n.createVNode)("option",{value:"clouds"},"Clouds"),(0,n.createVNode)("option",{value:"crimson_editor"},"Crimson Editor"),(0,n.createVNode)("option",{value:"dawn"},"Dawn"),(0,n.createVNode)("option",{value:"dreamweaver"},"Dreamweaver"),(0,n.createVNode)("option",{value:"eclipse"},"Eclipse"),(0,n.createVNode)("option",{value:"github"},"GitHub"),(0,n.createVNode)("option",{value:"iplastic"},"IPlastic"),(0,n.createVNode)("option",{value:"solarized_light"},"Solarized Light"),(0,n.createVNode)("option",{value:"textmate"},"TextMate"),(0,n.createVNode)("option",{value:"tomorrow"},"Tomorrow"),(0,n.createVNode)("option",{value:"xcode"},"Xcode"),(0,n.createVNode)("option",{value:"kuroir"},"Kuroir"),(0,n.createVNode)("option",{value:"katzenmilch"},"KatzenMilch"),(0,n.createVNode)("option",{value:"sqlserver"},"SQL Server")],-1),Z=(0,n.createVNode)("br",null,null,-1),G=(0,n.createVNode)("br",null,null,-1),Y=(0,n.createVNode)("label",{for:"ConsoleForeground"},"Console Foreground Color: ",-1),$={class:"col-6"},z=(0,n.createVNode)("label",{for:"Language"},"Default Language: ",-1),q=(0,n.createVNode)("option",{value:"python"},"Python",-1),H=(0,n.createVNode)("option",{value:"java"},"Java",-1),J=(0,n.createVNode)("br",null,null,-1),R=(0,n.createVNode)("br",null,null,-1),K=(0,n.createVNode)("label",{for:"ConsoleBackground"},"Console Background Color: ",-1),Q=(0,n.createVNode)("br",null,null,-1),W=(0,n.createVNode)("br",null,null,-1),X={class:"sampleIDE"},ee={class:"row"},te={class:"col-6"},re={class:"col-6"},ne=(0,n.createVNode)("br",null,null,-1),oe=(0,n.createVNode)("img",{class:"large-pfp",src:"this.user.pfp",alt:"Profile",id:"pfpmodal"},null,-1),ae={class:"picture"},se=(0,n.createVNode)("label",{for:"file",class:"sr-only"},"Upload New Avatar",-1),le={class:"row"},ce={style:{border:"1px solid #9e9e9e !important",padding:"0 !important",width:"min-content !important",margin:"2rem 2rem 2rem 2rem !important"}},ue={class:"table problemtable",style:{margin:"0 !important"}},ie=(0,n.createVNode)("thead",{class:"problemtable",style:{border:"none !important"}},[(0,n.createVNode)("tr",null,[(0,n.createVNode)("th",{width:"41.6%"},"Course"),(0,n.createVNode)("th",{width:"14.0%"},"Letter Grade"),(0,n.createVNode)("th",{width:"19.5%"},"Grade Percentage"),(0,n.createVNode)("th",{width:"12.2%"},"Start Date"),(0,n.createVNode)("th",{width:"12.7%"},"End Date")])],-1),de={width:"41.6%"},pe={width:"14.0%"},fe={width:"19.5%"},he={width:"12.2%"},me={width:"12.7%"},ge=(0,n.createVNode)("label",{for:"Username"},"Username",-1),ve={class:"change-Email"},be=(0,n.createVNode)("label",{for:"Verify"},"Verification Code",-1),Ve=(0,n.createVNode)("input",{type:"text",id:"Verify"},null,-1),Ne=(0,n.createVNode)("label",{for:"Email"},"Email",-1),we={class:"change-Pass"},ke=(0,n.createVNode)("label",{for:"CurrentPass"},"Current Password",-1),xe=(0,n.createVNode)("label",{for:"NewPass"},"New Password",-1),ye=(0,n.createVNode)("label",{for:"ConfirmPass"},"Confirm Password",-1),Ce={key:0,class:"invalid-feedback"},Ue=(0,n.createVNode)("span",null,"Your passwords don't match!",-1),Pe=(0,n.createVNode)("p",null," Are you sure you would like to delete your account? You will no longer be able to sign in to your account or access your courses! ",-1),Me=(0,n.createVNode)("label",{for:"fscID"},null,-1),_e=(0,n.createVNode)("input",{type:"number",id:"fscID",name:"fscID"},null,-1);var De=r(7757),Se=r.n(De),Be=r(6532),Ee=r(2380),Oe=r(2813),Fe=r(2119),Ae=r(3142),Te=r(236),Ie=r(3625);r(6200),r(1612),r(4142),r(2692),r(4387),r(4579),r(4634),r(4151),r(9194),r(7787),r(7178),r(6381),r(4203),r(5439),r(348),r(3783),r(8649),r(1401),r(3584),r(49),r(5910),r(9760),r(7186),r(2270),r(2827),r(2437),r(5188),r(2028),r(4936),r(787),r(2777),r(2557),r(6266),r(5708),r(8495),r(3494),r(1970),r(8452),r(6588),r(9253),r(7138),r(4007);function Le(e,t,r,n,o,a,s){try{var l=e[a](s),c=l.value}catch(e){return void r(e)}l.done?t(c):Promise.resolve(c).then(n,o)}function je(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function s(e){Le(a,n,o,s,l,"next",e)}function l(e){Le(a,n,o,s,l,"throw",e)}s(void 0)}))}}function Ze(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function Ge(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var Ye=["Profile","Grades","Security"];const $e=Ge({components:{FileUpload:Te.Z,VAceEditor:Ie.m},data:function(){return{authUser:null,fscID:null,progress:[],username:"",student:{},grades:[],letters:[],enrolledCourses:[],courses:[],content:"",user:{name:"",email:"",pfp:"",fsc_id:"",screen_name:"",username:"",settings:{consoleOptions:{foreground:"",background:""},ideOptions:{theme:"",defaultLang:""}},pronouns:""},password:{current:"",new:"",confirm:""},temppfp:"",showEmailChange:!1,showPassChange:!1,showUpgrade:!1,showAvatarModal:!1,showEmailModal:!1,showPassModal:!1,passNoMatch:!1,hasLowerCase:!1,hasUpperCase:!1,hasNumber:!1,hasSymbol:!1,showDeleteUserModal:!1,showUnsavedChangesModal:!1,changeGradeUser:"",hasUnsavedChanges:!1,leavePage:""}},watch:{userString:function(e,t){e!=t&&(console.log("Unsaved changes"),this.hasUnsavedChanges=!0)}},setup:function(){var e=(0,Fe.yj)(),t=(0,n.computed)((function(){return e.path})),r=(0,n.reactive)({selectedTab:Ye[0]});return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?Ze(Object(r),!0).forEach((function(t){Ge(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):Ze(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({currentDirectory:t,tabs:Ye},(0,n.toRefs)(r))},methods:{updatePFP:function(){var e=this;return je(Se().mark((function t(){var r;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("auth/getAuthUser");case 2:r=t.sent,null!=e.authUser&&(e.user.pfp=r.pfp_path,null!=e.user.pfp&&null!=e.user.pfp||(e.user.pfp="images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69="),document.getElementById("d_navpfp").src=e.user.pfp,document.getElementById("l_navpfp").src=e.user.pfp);case 4:case"end":return t.stop()}}),t)})))()},updatePass:function(){var e=this;return je(Se().mark((function t(){var r;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.password.new==e.password.confirm){t.next=5;break}console.log("These passwords do not match"),e.passNoMatch=!0,t.next=19;break;case 5:return t.next=7,e.passCheck(e.password.new);case 7:if(t.t0=t.sent,1!=t.t0){t.next=18;break}return e.passNoMatch=!1,e.showPassModal=!1,console.log("updatedPassword"),r={current_password:e.password.current,password:e.password.new,password_confirmation:e.password.confirm},t.next=15,Ee.Z.updatePassword(r);case 15:t.sent,t.next=19;break;case 18:console.log("password does not meet requirements");case 19:case"end":return t.stop()}}),t)})))()},passCheck:function(e){var t=this;return je(Se().mark((function r(){return Se().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(/[a-z]/.test(e)){r.next=3;break}return t.$notify({type:"error",text:"Your password must have a lowercase letter!"}),r.abrupt("return",!1);case 3:if(/[A-Z]/.test(e)){r.next=6;break}return t.$notify({type:"error",text:"Your password must have an uppercase letter!"}),r.abrupt("return",!1);case 6:if(/\d/.test(e)){r.next=9;break}return t.$notify({type:"error",text:"Your password must have a numeric digit!"}),r.abrupt("return",!1);case 9:if(/\W/.test(e)){r.next=12;break}return t.$notify({type:"error",text:"Your password must contain a symbol!"}),r.abrupt("return",!1);case 12:return r.abrupt("return",!0);case 13:case"end":return r.stop()}}),r)})))()},updateEmail:function(){var e=this;return je(Se().mark((function t(){return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.showEmailModal=!1,console.log("updateEmail"),{email:e.user.email};case 3:case"end":return t.stop()}}),t)})))()},closeAvatarModal:function(){this.showAvatarModal=!1},closeEmailModal:function(){this.showEmailModal=!1},closePassModal:function(){this.passNoMatch=!1,this.hasUpperCase=!1,this.hasLowerCase=!1,this.hasNumber=!1,this.hasSymbol=!1,this.showPassModal=!1},closeDeleteUserModal:function(){this.showDeleteUserModal=!1},getUser:function(){this.user.name=this.authUser.name,this.user.email=this.authUser.email,this.user.screen_name=this.authUser.fsc_user.screen_name,this.user.username=this.authUser.username,this.user.fsc_id=this.authUser.fsc_user.fsc_id,this.user.pronouns=this.authUser.fsc_user.pronouns,this.user.settings=this.authUser.settings,this.user.pfp=this.authUser.pfp_path,null!=this.user.pfp&&null!=this.user.pfp||(this.user.pfp="images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69="),document.getElementById("pfp").src=this.user.pfp},clearMessage:function(){this.error=null,this.message=null},fileChange:function(e){this.clearMessage(),this.file=e.target.files[0]},uploadImage:function(){var e=this;return je(Se().mark((function t(){var r,n,o;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null==e.file){t.next=19;break}return r={},(n=new FormData).append("file",e.file),r.file=n,r.endpoint="/images/store",e.clearMessage(),t.prev=7,t.next=10,Ae.Z.uploadFile(r);case 10:o=t.sent,e.message="File uploaded.",console.log(o.data.asset_link),e.temppfp=o.data.asset_link,t.next=19;break;case 16:t.prev=16,t.t0=t.catch(7),e.error=getError(t.t0);case 19:case"end":return t.stop()}}),t,null,[[7,16]])})))()},saveProfile:function(){var e=this;return je(Se().mark((function t(){var r,n;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("saving profile"),e.$notify({type:"success",text:"Your changes have been saved!"}),e.hasUnsavedChanges=!1,r={name:e.user.name,username:e.user.username,screen_name:e.user.screen_name,pfp_path:e.user.pfp,settings:e.user.settings,pronouns:e.user.pronouns},t.next=6,Be.x.put("/profile/full/".concat(e.authUser.fsc_user.fsc_id),r);case 6:n=t.sent,console.log(n);case 8:case"end":return t.stop()}}),t)})))()},updateImage:function(){var e=this;return je(Se().mark((function t(){return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.uploadImage();case 2:document.getElementById("pfpmodal").src=e.temppfp,console.log("showing the new avatar look on screen but not saving changes yet");case 4:case"end":return t.stop()}}),t)})))()},changeAvatar:function(){var e=this;return je(Se().mark((function t(){var r;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("changing the avatar picture in backend"),r={pfp_path:e.temppfp},t.next=4,Be.x.put("/profile/pfp",r);case 4:t.sent,e.user.pfp=e.temppfp,document.getElementById("pfp").src=e.user.pfp,e.showAvatarModal=!1,e.updatePFP();case 9:case"end":return t.stop()}}),t)})))()},editAvatar:function(){document.getElementById("pfpmodal").src=this.user.pfp,this.showAvatarModal=!0},editEmail:function(){this.showEmailModal=!0},editPass:function(){this.showPassModal=!0},deleteAccount:function(){return je(Se().mark((function e(){return Se().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("delete account");case 1:case"end":return e.stop()}}),e)})))()},getGrades:function(){for(var e=0;e<this.enrolledCourses.length;e++)if("null"!=this.student.gradebook_courses&&null!=this.student.gradebook_courses){var t=JSON.parse(this.student.gradebook_courses).grades[this.enrolledCourses[e]];this.grades.push(t),t>=90?this.letters.push("A"):t>=80?this.letters.push("B"):t>=70?this.letters.push("C"):t>=60?this.letters.push("D"):null==t?this.letters.push("--"):this.letters.push("F")}else this.letters.push("--")},getStudent:function(){var e=this;return je(Se().mark((function t(){var r;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.authUser=Oe.Z.getters["auth/authUser"],e.fscID=e.authUser.fsc_user.fsc_id,e.isProf){t.next=8;break}return t.next=5,Be.x.get("/progress/".concat(e.fscID));case 5:return r=t.sent,e.progress=r.data.data,t.abrupt("return",e.progress);case 8:return t.abrupt("return",{});case 9:case"end":return t.stop()}}),t)})))()},getStudentObject:function(){var e=this;return je(Se().mark((function t(){var r;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Be.x.get("/students/".concat(e.authUser.fsc_user.fsc_id));case 2:r=t.sent,e.student=r.data;case 4:case"end":return t.stop()}}),t)})))()},getCourses:function(){var e=this;return je(Se().mark((function t(){var r,n,o;return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.courses=[],r=0;case 2:if(!(r<e.enrolledCourses.length)){t.next=11;break}return n=e.enrolledCourses[r],t.next=6,Be.x.get("/courses/".concat(n));case 6:o=t.sent,e.courses.push(o.data.data);case 8:r++,t.next=2;break;case 11:case"end":return t.stop()}}),t)})))()},waitForDecision:function(){for(this.showUnsavedChangesModal=!0;""==this.leavePage;);return this.leavePage}},computed:{isProf:function(){return null!=Oe.Z.getters["auth/isProf"]&&Oe.Z.getters["auth/isProf"]},userString:function(){return JSON.stringify(this.user)}},beforeMount:function(){var e=this;return je(Se().mark((function t(){return Se().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Oe.Z.getters["auth/authUser"];case 2:if(e.authUser=t.sent,null!=e.authUser.settings){t.next=10;break}return t.next=6,Be.x.post("/profile/init");case 6:return t.sent,t.next=9,Oe.Z.getters["auth/authUser"];case 9:e.authUser=t.sent;case 10:return e.username=e.authUser.username,e.authUser.fsc_user.courses&&(e.enrolledCourses=JSON.parse(e.authUser.fsc_user.courses).courses),t.next=14,e.getCourses();case 14:if(e.isProf){t.next=19;break}return t.next=17,e.getStudentObject();case 17:return t.next=19,e.getGrades();case 19:return t.next=21,e.getUser();case 21:e.isProf&&(e.showUpgrade=!0),e.hasUnsavedChanges=!1;case 23:case"end":return t.stop()}}),t)})))()},beforeRouteLeave:function(e,t,r){var n=this;return je(Se().mark((function e(){var t;return Se().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("HERE"),!n.hasUnsavedChanges){e.next=15;break}return e.next=4,n.waitForDecision();case 4:if(t=e.sent,console.log("HAS UNSAVED CHANGES"),"yes"!=t){e.next=12;break}return n.leavePage="",n.showUnsavedChangesModal=!1,e.abrupt("return",r());case 12:return n.leavePage="",n.showUnsavedChangesModal=!1,e.abrupt("return",r(!1));case 15:return e.abrupt("return",r());case 16:case"end":return e.stop()}}),e)})))()}},"beforeRouteLeave",(function(e,t,r){this.hasUnsavedChanges&&!window.confirm("You have unsaved changes! Are you sure you want to leave this page?")||r()}));$e.render=function(e,t,r,De,Se,Be){var Ee=(0,n.resolveComponent)("tab"),Oe=(0,n.resolveComponent)("tabs"),Fe=(0,n.resolveComponent)("vue-final-modal"),Ae=(0,n.resolveComponent)("VAceEditor"),Te=(0,n.resolveComponent)("tab-panel"),Ie=(0,n.resolveComponent)("tab-panels");return(0,n.openBlock)(),(0,n.createBlock)(n.Fragment,null,[(0,n.createVNode)("div",o,[(0,n.createVNode)("div",a,[(0,n.createVNode)(Oe,{modelValue:e.selectedTab,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.selectedTab=t})},{default:(0,n.withCtx)((function(){return[((0,n.openBlock)(!0),(0,n.createBlock)(n.Fragment,null,(0,n.renderList)(De.tabs,(function(e,t){return(0,n.openBlock)(),(0,n.createBlock)(Ee,{class:"tab",key:"t".concat(t),val:e,label:e,indicator:!0},null,8,["val","label"])})),128))]})),_:1},8,["modelValue"])])]),(0,n.createVNode)(Ie,{modelValue:e.selectedTab,"onUpdate:modelValue":t[42]||(t[42]=function(t){return e.selectedTab=t}),animate:!0},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)(Te,{val:"Profile",class:"profile darkBG"},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)(Fe,{modelValue:Se.showUnsavedChangesModal,"onUpdate:modelValue":t[4]||(t[4]=function(e){return Se.showUnsavedChangesModal=e}),classes:"modal-container","content-class":"modal-content","esc-to-close":!0},{default:(0,n.withCtx)((function(){return[s,l,(0,n.createVNode)("div",c,[(0,n.createVNode)("button",{onClick:t[2]||(t[2]=function(e){return Se.leavePage="yes"}),class:"col-4 btn btn-lg btn-danger mx-1"}," Leave page "),(0,n.createVNode)("button",{onClick:t[3]||(t[3]=function(e){return Se.leavePage="no"}),class:"col-4 btn btn-lg btn-danger mx-1"}," Cancel ")])]})),_:1},8,["modelValue"]),(0,n.createVNode)("div",u,[(0,n.createVNode)("div",i,[(0,n.createVNode)("div",d,[p,f,(0,n.createVNode)("button",{onClick:t[5]||(t[5]=function(e){return Be.editAvatar()}),class:"btn btn-danger btn-block",style:{width:"252px","margin-top":"20px"}}," Edit ")])]),(0,n.createVNode)("div",h,[(0,n.createVNode)("div",m,[(0,n.createVNode)("div",g,[v,(0,n.createVNode)("div",b,[(0,n.createVNode)("div",V,[N,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"text","onUpdate:modelValue":t[6]||(t[6]=function(e){return Se.user.name=e}),id:"Name"},null,512),[[n.vModelText,Se.user.name]]),w,k,x,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"text",name:"pronouns",id:"pronouns","onUpdate:modelValue":t[7]||(t[7]=function(e){return Se.user.pronouns=e})},null,512),[[n.vModelText,Se.user.pronouns]])]),(0,n.createVNode)("div",y,[C,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"text","onUpdate:modelValue":t[8]||(t[8]=function(e){return Se.user.screen_name=e}),id:"ScreenName"},null,512),[[n.vModelText,Se.user.screen_name]]),U,P,M,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"number","onUpdate:modelValue":t[9]||(t[9]=function(e){return Se.user.fsc_id=e}),id:"FSCID",disabled:""},null,512),[[n.vModelText,Se.user.fsc_id]])])])])]),_,D,S,B,E,(0,n.createVNode)("div",O,[F,(0,n.createVNode)("div",A,[(0,n.createVNode)("div",T,[I,(0,n.withDirectives)((0,n.createVNode)("select",{class:"profile-select",name:"Theme",id:"Theme","onUpdate:modelValue":t[10]||(t[10]=function(e){return Se.user.settings.ideOptions.theme=e})},[L,j],512),[[n.vModelSelect,Se.user.settings.ideOptions.theme]]),Z,G,Y,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"color",name:"ConsoleForeground",id:"ConsoleForeground","onUpdate:modelValue":t[11]||(t[11]=function(e){return Se.user.settings.consoleOptions.foreground=e})},null,512),[[n.vModelText,Se.user.settings.consoleOptions.foreground]])]),(0,n.createVNode)("div",$,[z,(0,n.withDirectives)((0,n.createVNode)("select",{class:"profile-select",name:"Language",id:"Language","onUpdate:modelValue":t[12]||(t[12]=function(e){return Se.user.settings.ideOptions.defaultLang=e})},[q,H],512),[[n.vModelSelect,Se.user.settings.ideOptions.defaultLang]]),J,R,K,(0,n.withDirectives)((0,n.createVNode)("input",{class:"profile-field",type:"color",name:"ConsoleBackground",id:"ConsoleBackground","onUpdate:modelValue":t[13]||(t[13]=function(e){return Se.user.settings.consoleOptions.background=e})},null,512),[[n.vModelText,Se.user.settings.consoleOptions.background]])])])]),Q,W,(0,n.createVNode)("div",X,[(0,n.createVNode)("div",ee,[(0,n.createVNode)("div",te,[(0,n.createVNode)(Ae,{theme:Se.user.settings.ideOptions.theme,value:Se.content,"onUpdate:value":t[14]||(t[14]=function(e){return Se.content=e}),lang:Se.user.settings.ideOptions.defaultLang,style:{width:"100%",height:"200px"},key:Se.user.settings.ideOptions.defaultLang},null,8,["theme","value","lang"])]),(0,n.createVNode)("div",re,[(0,n.createVNode)("textarea",{class:"sampleConsole",contenteditable:"true",spellcheck:"false",style:"background-color: "+Se.user.settings.consoleOptions.background+"; color: "+Se.user.settings.consoleOptions.foreground+";"},(0,n.toDisplayString)(Se.user.username)+"@mocside.com:/usr/src$ ",5)])])]),ne,(0,n.createVNode)("button",{onClick:t[15]||(t[15]=function(){return Be.saveProfile&&Be.saveProfile.apply(Be,arguments)}),class:"btn btn-danger btn-md btn-block"}," Save ")])]),(0,n.createVNode)(Fe,{modelValue:Se.showAvatarModal,"onUpdate:modelValue":t[21]||(t[21]=function(e){return Se.showAvatarModal=e}),classes:"modal-container","content-class":"modal-content","esc-to-close":!0},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)("button",{class:"modal-close",onClick:t[16]||(t[16]=function(e){return Se.showAvatarModal=!1})},"x"),oe,(0,n.createVNode)("div",ae,[se,(0,n.createVNode)("input",{type:"file",accept:["image/*"],onChange:t[17]||(t[17]=function(){return Be.fileChange&&Be.fileChange.apply(Be,arguments)}),id:"file"},null,32),(0,n.createVNode)("button",{onClick:t[18]||(t[18]=function(e){return Be.updateImage()}),class:"btn btn-danger btn-block"}," Change Avatar ")]),(0,n.createVNode)("div",le,[(0,n.createVNode)("button",{onClick:t[19]||(t[19]=function(){return Be.closeAvatarModal&&Be.closeAvatarModal.apply(Be,arguments)}),class:"col-4 btn btn-lg btn-secondary mx-1"}," Cancel "),(0,n.createVNode)("button",{onClick:t[20]||(t[20]=function(){return Be.changeAvatar&&Be.changeAvatar.apply(Be,arguments)}),class:"col-4 btn btn-lg btn-success mx-1"}," Submit Changes ")])]})),_:1},8,["modelValue"])]})),_:1}),(0,n.createVNode)(Te,{val:"Grades"},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)("div",ce,[(0,n.createVNode)("table",ue,[ie,(0,n.createVNode)("tbody",null,[((0,n.openBlock)(!0),(0,n.createBlock)(n.Fragment,null,(0,n.renderList)(Se.courses,(function(e,t){return(0,n.openBlock)(),(0,n.createBlock)("tr",{key:t,class:"problem pointer"},[(0,n.createVNode)("td",de,(0,n.toDisplayString)(e.name),1),(0,n.createVNode)("td",pe,(0,n.toDisplayString)(null==Se.letters[t]?"--":Se.letters[t]),1),(0,n.createVNode)("td",fe,(0,n.toDisplayString)(null==Se.grades[t]?"--":Se.grades[t]+"%"),1),(0,n.createVNode)("td",he,(0,n.toDisplayString)(e.start_date),1),(0,n.createVNode)("td",me,(0,n.toDisplayString)(e.end_date),1)])})),128))])])])]})),_:1}),(0,n.createVNode)(Te,{val:"Security"},{default:(0,n.withCtx)((function(){return[ge,(0,n.withDirectives)((0,n.createVNode)("input",{type:"text","onUpdate:modelValue":t[22]||(t[22]=function(e){return Se.user.username=e}),id:"Username"},null,512),[[n.vModelText,Se.user.username]]),(0,n.createVNode)("button",{onClick:t[23]||(t[23]=function(e){return Be.editEmail()}),class:"btn btn-danger btn-block"},"Change Email"),(0,n.createVNode)(Fe,{modelValue:Se.showEmailModal,"onUpdate:modelValue":t[27]||(t[27]=function(e){return Se.showEmailModal=e}),classes:"modal-container","content-class":"modal-content","esc-to-close":!0},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)("button",{class:"modal-close",onClick:t[24]||(t[24]=function(e){return Se.showEmailModal=!1})},"x"),(0,n.createVNode)("div",ve,[be,Ve,Ne,(0,n.withDirectives)((0,n.createVNode)("input",{type:"email",id:"Email","onUpdate:modelValue":t[25]||(t[25]=function(e){return Se.user.email=e})},null,512),[[n.vModelText,Se.user.email]]),(0,n.createVNode)("button",{onClick:t[26]||(t[26]=function(e){return Be.updateEmail()}),class:"btn btn-danger btn-block"},"Save")])]})),_:1},8,["modelValue"]),(0,n.createVNode)("button",{onClick:t[28]||(t[28]=function(e){return Be.editPass()}),class:"btn btn-danger btn-block"}," Change Password "),(0,n.createVNode)(Fe,{modelValue:Se.showPassModal,"onUpdate:modelValue":t[34]||(t[34]=function(e){return Se.showPassModal=e}),classes:"modal-container","content-class":"modal-content","esc-to-close":!0},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)("button",{class:"modal-close",onClick:t[29]||(t[29]=function(e){return Se.showPassModal=!1})},"x"),(0,n.createVNode)("div",we,[ke,(0,n.withDirectives)((0,n.createVNode)("input",{type:"password",id:"CurrentPass","onUpdate:modelValue":t[30]||(t[30]=function(e){return Se.password.current=e})},null,512),[[n.vModelText,Se.password.current]]),xe,(0,n.withDirectives)((0,n.createVNode)("input",{type:"password",id:"NewPass","onUpdate:modelValue":t[31]||(t[31]=function(e){return Se.password.new=e})},null,512),[[n.vModelText,Se.password.new]]),ye,(0,n.withDirectives)((0,n.createVNode)("input",{type:"password",id:"ConfirmPass","onUpdate:modelValue":t[32]||(t[32]=function(e){return Se.password.confirm=e}),class:{"is-invalid":Se.passNoMatch}},null,2),[[n.vModelText,Se.password.confirm]]),Se.passNoMatch?((0,n.openBlock)(),(0,n.createBlock)("div",Ce,[Ue])):(0,n.createCommentVNode)("",!0),(0,n.createVNode)("button",{onClick:t[33]||(t[33]=function(e){return Be.updatePass()}),class:"btn btn-danger btn-block"},"Save")])]})),_:1},8,["modelValue"]),(0,n.createVNode)("button",{onClick:t[35]||(t[35]=function(){return Be.saveProfile&&Be.saveProfile.apply(Be,arguments)}),class:"btn btn-danger btn-block"},"Save"),Be.isProf?((0,n.openBlock)(),(0,n.createBlock)("button",{key:0,onClick:t[36]||(t[36]=function(e){return Se.showDeleteUserModal=!0}),class:"btn btn-danger btn-block"}," Delete Account ")):(0,n.createCommentVNode)("",!0),(0,n.createVNode)(Fe,{modelValue:Se.showDeleteUserModal,"onUpdate:modelValue":t[41]||(t[41]=function(e){return Se.showDeleteUserModal=e}),classes:"modal-container","content-class":"modal-content","esc-to-close":!0},{default:(0,n.withCtx)((function(){return[(0,n.createVNode)("button",{class:"modal-close",onClick:t[37]||(t[37]=function(e){return Se.showDeleteUserModal=!1})},"x"),(0,n.createVNode)("button",{class:"modal-close",onClick:t[38]||(t[38]=function(t){return e.showUpgradeModal=!1})},"x"),Pe,Me,_e,(0,n.createVNode)("button",{onClick:t[39]||(t[39]=function(e){return Se.showDeleteUserModal=!1}),class:"btn btn-danger btn-block"}," Cancel "),(0,n.createVNode)("button",{onClick:t[40]||(t[40]=function(e){return Be.deleteAccount()}),class:"btn btn-danger btn-block"}," Yes, delete my account ")]})),_:1},8,["modelValue"])]})),_:1})]})),_:1},8,["modelValue"])],64)};const ze=$e}}]);