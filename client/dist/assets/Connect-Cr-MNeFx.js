import{x as l,az as o,aH as n,Y as u,T as p,$ as m,at as r,k as t,a2 as a,au as f,Q as _,R as h}from"./SnackbarsStore-Duvz5vzr.js";import{_ as v,w as V,V as w}from"./top-D_I8s64J.js";import{_ as C}from"./logo-D3_KqDny.js";import{V as I,a as x}from"./VCard-Dg_hCDnw.js";import{V as $,a as y}from"./VTextField-DkVa4nfA.js";import{V as A}from"./VForm-CsgUEQO4.js";import"./VAvatar-bDudzKuF.js";const g=l({name:"Connect",data(){return{is_form_dense:o.isSmartphoneHorizontal(),ip_address:""}},async created(){if(this.$router.referrer.path.includes("/settings/")){o.deleteApiHost();return}if(o.hasApiHost()){await this.$router.replace({path:"/tv/"});return}},methods:{async connect(){if(this.ip_address===""){n.error("IPアドレスが空です。");return}else if(!/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(:[0-9]+)?$/.test(this.ip_address)){n.error("IPv4のIPアドレスを入力してください。");return}const e=this.ip_address.split(":"),s=`${e[0].replaceAll(".","-")}.local.konomi.tv:${e[1]??7e3}`;o.saveApiHost(s),await this.$router.replace({path:"/tv/"})}}}),i=e=>(_("data-v-30fef156"),e=e(),h(),e),b={class:"route-container"},B={class:"connect-container-wrapper d-flex align-center w-100 mb-13"},P=i(()=>r("img",{class:"d-block",src:C,style:{"max-width":"250px"}},null,-1)),S=i(()=>r("h4",{class:"mt-10"},"接続",-1));function k(e,s,H,E,T,D){const c=u("Icon");return p(),m("div",b,[r("main",null,[r("div",B,[t(I,{class:"connect-container px-10 pt-8 pb-11 mx-auto",elevation:"10",width:"100%","max-width":"450"},{default:a(()=>[t(x,{class:"connect__logo py-4 d-flex flex-column justify-center align-center"},{default:a(()=>[P,S]),_:1}),t($),t(A,{ref:"connect",onSubmit:V(e.connect,["prevent"])},{default:a(()=>[t(y,{class:"mt-12",color:"primary",variant:"outlined",placeholder:"IPアドレス",autofocus:"",hint:"IPv4のIPアドレスを入力してください。",density:e.is_form_dense?"compact":"default",modelValue:e.ip_address,"onUpdate:modelValue":s[0]||(s[0]=d=>e.ip_address=d)},null,8,["density","modelValue"]),t(w,{type:"submit",class:"connect-button mt-5",color:"secondary",variant:"flat",width:"100%",height:"56"},{default:a(()=>[t(c,{icon:"fa:sign-in",class:"mr-2"}),f("接続 ")]),_:1})]),_:1},8,["onSubmit"])]),_:1})])])])}const R=v(g,[["render",k],["__scopeId","data-v-30fef156"]]);export{R as default};
