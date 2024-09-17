import{d as m,U as c,m as f,M as g,a3 as h,_ as w,b as r,e as _,f as V,j as o,k as n,i as t,C as v,V as y,A as C,p as B,l as S}from"./top-CONcDROc.js";import{H as b,N as F}from"./Navigation-B5s0ayDN.js";import{_ as $}from"./ssrBoot-CJWTd86w.js";import{a as I,V as N}from"./VCard-Dd5ZfWec.js";import{b as k,c as i}from"./VTextField-CTBfqDAh.js";import{V as U}from"./VForm-_Kwn7n0z.js";import"./_commonjsHelpers-CSPQI3rM.js";import"./VAvatar-CReOORxg.js";const D=m({name:"Login",components:{HeaderBar:b,Navigation:F},data(){return{is_form_dense:c.isSmartphoneHorizontal(),username:"",password:"",password_showing:!1}},computed:{...f(h)},async created(){await this.userStore.fetchUser(),this.userStore.is_logged_in&&await this.$router.replace({path:"/settings/account"})},methods:{async login(){if(this.username===""||this.password===""){g.error("ユーザー名またはパスワードが空です。");return}await this.userStore.login(this.username,this.password)!==!1&&await this.$router.replace({path:"/settings/account"})}}}),d=e=>(B("data-v-06de593b"),e=e(),S(),e),E={class:"route-container"},H={class:"login-container-wrapper d-flex align-center w-100 mb-13"},x=d(()=>n("img",{class:"d-block",src:$,style:{"max-width":"250px"}},null,-1)),A=d(()=>n("h4",{class:"mt-10"},"ログイン",-1));function M(e,s,T,j,L,z){const l=r("HeaderBar"),p=r("Navigation"),u=r("Icon");return _(),V("div",E,[o(l),n("main",null,[o(p),n("div",H,[o(I,{class:"login-container px-10 pt-8 pb-11 mx-auto",elevation:"10",width:"100%","max-width":"450"},{default:t(()=>[o(N,{class:"login__logo py-4 d-flex flex-column justify-center align-center"},{default:t(()=>[x,A]),_:1}),o(k),o(U,{ref:"login",onSubmit:s[4]||(s[4]=v(()=>{},["prevent"]))},{default:t(()=>[o(i,{class:"mt-12",color:"primary",variant:"outlined",placeholder:"ユーザー名","hide-details":"",autofocus:"",density:e.is_form_dense?"compact":"default",modelValue:e.username,"onUpdate:modelValue":s[0]||(s[0]=a=>e.username=a)},null,8,["density","modelValue"]),o(i,{class:"mt-8",color:"primary",variant:"outlined",placeholder:"パスワード","hide-details":"",density:e.is_form_dense?"compact":"default",modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=a=>e.password=a),type:e.password_showing?"text":"password","append-inner-icon":e.password_showing?"mdi-eye":"mdi-eye-off","onClick:appendInner":s[2]||(s[2]=a=>e.password_showing=!e.password_showing)},null,8,["density","modelValue","type","append-inner-icon"]),o(y,{class:"login-button mt-5",color:"secondary",variant:"flat",width:"100%",height:"56",onClick:s[3]||(s[3]=a=>e.login())},{default:t(()=>[o(u,{icon:"fa:sign-in",class:"mr-2"}),C("ログイン ")]),_:1})]),_:1},512)]),_:1})])])])}const W=w(D,[["render",M],["__scopeId","data-v-06de593b"]]);export{W as default};
