import{u as g,H as f,N as v}from"./Navigation-ocFmGnFJ.js";import{x,aO as y,d as b,Y as p,T as u,$ as m,k as s,at as t,a2 as n,_ as w,U as V,ai as a,av as _,a1 as S,a8 as k,Q as I,R as B}from"./SnackbarsStore-Duvz5vzr.js";import{V as r,R as C,_ as N}from"./top-D_I8s64J.js";import{V as U}from"./VCard-Dg_hCDnw.js";import"./logo-D3_KqDny.js";import"./ssrBoot-CXeMmGRH.js";import"./VAvatar-bDudzKuF.js";const l=e=>(I("data-v-0cbc42d1"),e=e(),B(),e),D={class:"route-container"},M={class:"settings-navigation"},R=l(()=>t("h1",{class:"mt-2",style:{"font-size":"24px"}},"マイページ",-1)),z={class:"account-wrapper"},H=["src"],P={class:"account__info"},T={class:"account__info-name"},$={class:"account__info-name-text"},A={key:0,class:"account__info-admin"},E={class:"account__info-id"},K=l(()=>t("span",{class:"ml-4"},"設定",-1)),O=l(()=>t("span",{class:"ml-4"},"マイリスト",-1)),Q=l(()=>t("span",{class:"ml-4"},"視聴履歴",-1)),Y={class:"ml-4"},j=x({__name:"MyPage",setup(e){const o=y(),i=g();return b(async()=>{await o.fetchUser(),await i.fetchServerVersion()}),(q,F)=>{const h=p("router-link"),c=p("Icon");return u(),m("div",D,[s(f),t("main",null,[s(v),s(U,{class:"settings-container d-flex px-5 py-5 mx-auto",elevation:"0",width:"100%","max-width":"1000"},{default:n(()=>[t("nav",M,[R,w((u(),V(h,{to:"/settings/account",class:"account mt-6"},{default:n(()=>{var d;return[t("div",z,[t("img",{class:"account__icon",src:a(o).user?a(o).user_icon_url??"":"/assets/images/account-icon-default.png"},null,8,H),t("div",P,[t("div",T,[t("span",$,_(a(o).user?a(o).user.name:"ログインしていません"),1),(d=a(o).user)!=null&&d.is_admin?(u(),m("span",A,"管理者")):S("",!0)]),t("span",E,_(a(o).user?`User ID: ${a(o).user.id}`:"Not logged in"),1)])])]}),_:1})),[[C]]),s(r,{variant:"flat",class:"settings-navigation__button",to:"/settings/"},{default:n(()=>[s(c,{icon:"fluent:settings-20-regular",width:"26px"}),K]),_:1}),s(r,{variant:"flat",class:"settings-navigation__button mt-3",to:"/mylist/"},{default:n(()=>[s(c,{icon:"ic:round-playlist-play",width:"26px"}),O]),_:1}),s(r,{variant:"flat",class:"settings-navigation__button",to:"/viewing-history/"},{default:n(()=>[s(c,{icon:"fluent:history-20-regular",width:"26px"}),Q]),_:1}),s(r,{variant:"flat",class:k(["settings-navigation__button settings-navigation__button--version mt-3",{"settings-navigation__button--version-highlight":a(i).is_update_available}]),href:"https://github.com/yyya-nico/KonomiTV",target:"_blank"},{default:n(()=>[s(c,{icon:"fluent:info-20-regular",width:"26px"}),t("span",Y," version "+_(a(i).client_version)+_(a(i).is_update_available?" (Update Available)":""),1)]),_:1},8,["class"])])]),_:1})])])}}}),st=N(j,[["__scopeId","data-v-0cbc42d1"]]);export{st as default};
