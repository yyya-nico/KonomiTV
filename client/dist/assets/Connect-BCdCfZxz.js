import{d as l,U as o,M as n,_ as u,r as p,o as m,c as f,a as r,b as t,w as a,e as _,V as h,f as v,p as V,g as w}from"./top-DdLAbho1.js";import{_ as C}from"./logo-BqNND4bk.js";import{V as I,a as x}from"./VCard-DyUraCmI.js";import{V as y,a as A}from"./VTextField-CGBT6DEK.js";import{V as $}from"./VForm-BPxEnEqg.js";import"./_commonjsHelpers-CSPQI3rM.js";import"./VAvatar-BSmx67TS.js";const g=l({name:"Connect",data(){return{is_form_dense:o.isSmartphoneHorizontal(),ip_address:""}},async created(){if(this.$router.referrer.path.includes("/settings/")){o.deleteApiHost();return}if(o.hasApiHost()){await this.$router.replace({path:"/tv/"});return}},methods:{async connect(){if(this.ip_address===""){n.error("IPアドレスが空です。");return}else if(!/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(:[0-9]+)?$/.test(this.ip_address)){n.error("IPv4のIPアドレスを入力してください。");return}const e=this.ip_address.split(":"),s=`${e[0].replaceAll(".","-")}.local.konomi.tv:${e[1]??7e3}`;o.saveApiHost(s),await this.$router.replace({path:"/tv/"})}}}),i=e=>(V("data-v-30fef156"),e=e(),w(),e),b={class:"route-container"},B={class:"connect-container-wrapper d-flex align-center w-100 mb-13"},P=i(()=>r("img",{class:"d-block",src:C,style:{"max-width":"250px"}},null,-1)),S=i(()=>r("h4",{class:"mt-10"},"接続",-1));function k(e,s,E,H,D,F){const c=p("Icon");return m(),f("div",b,[r("main",null,[r("div",B,[t(I,{class:"connect-container px-10 pt-8 pb-11 mx-auto",elevation:"10",width:"100%","max-width":"450"},{default:a(()=>[t(x,{class:"connect__logo py-4 d-flex flex-column justify-center align-center"},{default:a(()=>[P,S]),_:1}),t(y),t($,{ref:"connect",onSubmit:_(e.connect,["prevent"])},{default:a(()=>[t(A,{class:"mt-12",color:"primary",variant:"outlined",placeholder:"IPアドレス",autofocus:"",hint:"IPv4のIPアドレスを入力してください。",density:e.is_form_dense?"compact":"default",modelValue:e.ip_address,"onUpdate:modelValue":s[0]||(s[0]=d=>e.ip_address=d)},null,8,["density","modelValue"]),t(h,{type:"submit",class:"connect-button mt-5",color:"secondary",variant:"flat",width:"100%",height:"56"},{default:a(()=>[t(c,{icon:"fa:sign-in",class:"mr-2"}),v("接続 ")]),_:1})]),_:1},8,["onSubmit"])]),_:1})])])])}const G=u(g,[["render",k],["__scopeId","data-v-30fef156"]]);export{G as default};
