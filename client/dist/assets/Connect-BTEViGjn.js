import{x as l,az as n,aH as r,Y as u,T as p,$ as m,at as a,k as t,a2 as s,au as _,Q as f,R as h}from"./SnackbarsStore-Duvz5vzr.js";import{_ as V,w as v,V as C}from"./top-T8_bFoR3.js";import{_ as I}from"./logo-DYlZj9PS.js";import{V as w,a as x}from"./VCard-CvFV5iV5.js";import{V as b,a as y}from"./VTextField-ZB8cY10q.js";import{V as $}from"./VForm-BcUi3FJV.js";import"./VAvatar-CTR9lbsK.js";const A=l({name:"Connect",data(){return{is_form_dense:n.isSmartphoneHorizontal(),ip_address:""}},methods:{async connect(){if(this.ip_address===""){r.error("IPアドレスが空です。");return}else if(!/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(:[0-9]+)?$/.test(this.ip_address)){r.error("IPv4のIPアドレスを入力してください。");return}const e=this.ip_address.split(":"),o=`${e[0].replaceAll(".","-")}.local.konomi.tv:${e[1]??7e3}`;n.saveApiHost(o),await this.$router.replace({path:"/tv/"})}}}),i=e=>(f("data-v-6d0223b9"),e=e(),h(),e),g={class:"route-container"},B={class:"connect-container-wrapper d-flex align-center w-100 mb-13"},P=i(()=>a("img",{class:"d-block",src:I,style:{"max-width":"250px"}},null,-1)),S=i(()=>a("h4",{class:"mt-10"},"接続",-1));function k(e,o,E,T,D,F){const c=u("Icon");return p(),m("div",g,[a("main",null,[a("div",B,[t(w,{class:"connect-container px-10 pt-8 pb-11 mx-auto",elevation:"10",width:"100%","max-width":"450"},{default:s(()=>[t(x,{class:"connect__logo py-4 d-flex flex-column justify-center align-center"},{default:s(()=>[P,S]),_:1}),t(b),t($,{ref:"connect",onSubmit:v(e.connect,["prevent"])},{default:s(()=>[t(y,{class:"mt-12",color:"primary",variant:"outlined",placeholder:"IPアドレス",autofocus:"",hint:"IPv4のIPアドレスを入力してください。",density:e.is_form_dense?"compact":"default",modelValue:e.ip_address,"onUpdate:modelValue":o[0]||(o[0]=d=>e.ip_address=d)},null,8,["density","modelValue"]),t(C,{type:"submit",class:"connect-button mt-5",color:"secondary",variant:"flat",width:"100%",height:"56"},{default:s(()=>[t(c,{icon:"fa:sign-in",class:"mr-2"}),_("接続 ")]),_:1})]),_:1},8,["onSubmit"])]),_:1})])])])}const R=V(A,[["render",k],["__scopeId","data-v-6d0223b9"]]);export{R as default};
