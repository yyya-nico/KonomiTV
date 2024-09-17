import{d as m,U as f,m as c,a3 as w,_ as g,b as n,e as h,f as _,j as t,k as o,i as a,C as v,V,A as y,p as C,l as B}from"./top-CONcDROc.js";import{H as $,N as F}from"./Navigation-B5s0ayDN.js";import{_ as S}from"./ssrBoot-CJWTd86w.js";import{a as b,V as A}from"./VCard-Dd5ZfWec.js";import{b as I,c as i}from"./VTextField-CTBfqDAh.js";import{V as N}from"./VForm-_Kwn7n0z.js";import"./_commonjsHelpers-CSPQI3rM.js";import"./VAvatar-CReOORxg.js";const k=m({name:"Register",components:{HeaderBar:$,Navigation:F},data(){return{is_form_dense:f.isSmartphoneHorizontal(),username:null,username_validation:e=>e===""||e===null?"ユーザー名を入力してください。":/^.{2,}$/.test(e)===!1?"ユーザー名は2文字以上で入力してください。":!0,password:null,password_showing:!0,password_validation:e=>e===""||e===null?"パスワードを入力してください。":/^[a-zA-Z0-9!-/:-@¥[-`{-~]{4,}$/.test(e)===!1?"パスワードは4文字以上の半角英数記号を入力してください。":!0}},computed:{...c(w)},async created(){await this.userStore.fetchUser(),this.userStore.is_logged_in&&await this.$router.replace({path:"/settings/account"})},methods:{async register(){(await this.$refs.register.validate()).valid===!1||this.username===null||this.password===null||await this.userStore.register(this.username,this.password)===!1||await this.$router.replace({path:"/settings/account"})}}}),l=e=>(C("data-v-0b5798d5"),e=e(),B(),e),U={class:"route-container"},H={class:"register-container-wrapper d-flex align-center w-100 mb-13"},x=l(()=>o("img",{class:"d-block",src:S,style:{"max-width":"250px"}},null,-1)),D=l(()=>o("h4",{class:"mt-10"},"アカウントを作成",-1));function E(e,s,T,j,z,R){const d=n("HeaderBar"),u=n("Navigation"),p=n("Icon");return h(),_("div",U,[t(d),o("main",null,[t(u),o("div",H,[t(b,{class:"register-container px-10 pt-8 pb-11 mx-auto",elevation:"10",width:"100%","max-width":"450"},{default:a(()=>[t(A,{class:"register__logo py-4 d-flex flex-column justify-center align-center"},{default:a(()=>[x,D]),_:1}),t(I),t(N,{ref:"register",onSubmit:s[4]||(s[4]=v(()=>{},["prevent"]))},{default:a(()=>[t(i,{class:"mt-12",color:"primary",variant:"outlined",placeholder:"ユーザー名",autofocus:"",density:e.is_form_dense?"compact":"default",modelValue:e.username,"onUpdate:modelValue":s[0]||(s[0]=r=>e.username=r),rules:[e.username_validation]},null,8,["density","modelValue","rules"]),t(i,{style:{"margin-top":"10px"},color:"primary",variant:"outlined",placeholder:"パスワード",density:e.is_form_dense?"compact":"default",modelValue:e.password,"onUpdate:modelValue":s[1]||(s[1]=r=>e.password=r),type:e.password_showing?"text":"password",rules:[e.password_validation],"append-inner-icon":e.password_showing?"mdi-eye":"mdi-eye-off","onClick:appendInner":s[2]||(s[2]=r=>e.password_showing=!e.password_showing)},null,8,["density","modelValue","type","rules","append-inner-icon"]),t(V,{class:"register-button mt-5",color:"secondary",variant:"flat",width:"100%",height:"56",onClick:s[3]||(s[3]=r=>e.register())},{default:a(()=>[t(p,{icon:"fluent:person-add-20-filled",class:"mr-2",height:"24"}),y("アカウントを作成 ")]),_:1})]),_:1},512)]),_:1})])])])}const P=g(k,[["render",E],["__scopeId","data-v-0b5798d5"]]);export{P as default};
