import{_ as f}from"./account-icon-default-kQfCefkD.js";import{H as g,N as v}from"./Navigation-rhNX0CUZ.js";import{x as y,aO as x,d as w,Y as m,T as e,$ as r,k as s,at as t,a2 as n,_ as b,U as k,ai as a,av as l,a1 as V,a8 as S,Q as I,R as B}from"./SnackbarsStore-DxiM_ro_.js";import{u as C}from"./VersionStore-DPzwN7Gd.js";import{V as u,R as N,_ as U}from"./top-CxawtzVY.js";import{V as D}from"./VCard-C8O6h0Ts.js";import"./logo-CEwAdD4A.js";import"./ssrBoot-xo5SD5hK.js";import"./VAvatar-lipCojAm.js";const d=i=>(I("data-v-c235cc03"),i=i(),B(),i),M={class:"route-container"},R={class:"settings-navigation"},z=d(()=>t("h1",{class:"mt-2",style:{"font-size":"24px"}},"マイページ",-1)),H={class:"account-wrapper"},P=["src"],T={key:1,class:"account__icon",src:f},$={class:"account__info"},A={class:"account__info-name"},E={class:"account__info-name-text"},K={key:0,class:"account__info-admin"},O={class:"account__info-id"},Q=d(()=>t("span",{class:"ml-4"},"設定",-1)),Y=d(()=>t("span",{class:"ml-4"},"マイリスト",-1)),j=d(()=>t("span",{class:"ml-4"},"視聴履歴",-1)),q={class:"ml-4"},F=y({__name:"MyPage",setup(i){const o=x(),c=C();return w(async()=>{await o.fetchUser(),await c.fetchServerVersion()}),(G,J)=>{const h=m("router-link"),_=m("Icon");return e(),r("div",M,[s(g),t("main",null,[s(v),s(D,{class:"settings-container d-flex px-5 py-5 mx-auto",elevation:"0",width:"100%","max-width":"1000"},{default:n(()=>[t("nav",R,[z,b((e(),k(h,{to:"/settings/account",class:"account mt-6"},{default:n(()=>{var p;return[t("div",H,[a(o).user?(e(),r("img",{key:0,class:"account__icon",src:a(o).user_icon_url??""},null,8,P)):(e(),r("img",T)),t("div",$,[t("div",A,[t("span",E,l(a(o).user?a(o).user.name:"ログインしていません"),1),(p=a(o).user)!=null&&p.is_admin?(e(),r("span",K,"管理者")):V("",!0)]),t("span",O,l(a(o).user?`User ID: ${a(o).user.id}`:"Not logged in"),1)])])]}),_:1})),[[N]]),s(u,{variant:"flat",class:"settings-navigation__button",to:"/settings/"},{default:n(()=>[s(_,{icon:"fluent:settings-20-regular",width:"26px"}),Q]),_:1}),s(u,{variant:"flat",class:"settings-navigation__button mt-3",to:"/mylist/"},{default:n(()=>[s(_,{icon:"ic:round-playlist-play",width:"26px"}),Y]),_:1}),s(u,{variant:"flat",class:"settings-navigation__button",to:"/viewing-history/"},{default:n(()=>[s(_,{icon:"fluent:history-20-regular",width:"26px"}),j]),_:1}),s(u,{variant:"flat",class:S(["settings-navigation__button settings-navigation__button--version mt-3",{"settings-navigation__button--version-highlight":a(c).is_update_available}]),href:"https://github.com/yyya-nico/KonomiTV",target:"_blank"},{default:n(()=>[s(_,{icon:"fluent:info-20-regular",width:"26px"}),t("span",q," version "+l(a(c).client_version)+l(a(c).is_update_available?" (Update Available)":""),1)]),_:1},8,["class"])])]),_:1})])])}}}),et=U(F,[["__scopeId","data-v-c235cc03"]]);export{et as default};
