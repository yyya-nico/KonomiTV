import{p as V,m as R,ag as Q,g as T,am as X,e as B,k as Y,T as p,b3 as $,a4 as x,a1 as ee,aa as E,ab as te,M as ae,b as ne,I as re,af as se,$ as ie,aV as le,d as oe,S as ue,ai as ce,U as ve,ak as de,al as me,a0 as ge,aW as fe,ap as ye,ad as Se,ao as be}from"./top-Byiq8qAH.js";import{k as n,ac as P,h as _e,a5 as M,an as he,ah as h,P as ke,am as C,o as Pe,n as Ve,aq as Ie,_ as W,Z as ze,F as Ce}from"./SnackbarsStore-DxiM_ro_.js";function Re(e){return{aspectStyles:P(()=>{const l=Number(e.aspectRatio);return l?{paddingBottom:String(1/l*100)+"%"}:void 0})}}const q=V({aspectRatio:[String,Number],contentClass:null,inline:Boolean,...R(),...Q()},"VResponsive"),F=T()({name:"VResponsive",props:q(),setup(e,l){let{slots:s}=l;const{aspectStyles:t}=Re(e),{dimensionStyles:v}=X(e);return B(()=>{var d;return n("div",{class:["v-responsive",{"v-responsive--inline":e.inline},e.class],style:[v.value,e.style]},[n("div",{class:"v-responsive__sizer",style:t.value},null),(d=s.additional)==null?void 0:d.call(s),s.default&&n("div",{class:["v-responsive__content",e.contentClass]},[s.default()])])}),{}}}),Te=V({transition:{type:[Boolean,String,Object],default:"fade-transition",validator:e=>e!==!0}},"transition"),k=(e,l)=>{let{slots:s}=l;const{transition:t,disabled:v,group:d,...g}=e,{component:m=d?Y:p,...f}=typeof t=="object"?t:{};return _e(m,M(typeof t=="string"?{name:v?"":t}:f,typeof t=="string"?{}:Object.fromEntries(Object.entries({disabled:v,group:d}).filter(r=>{let[i,u]=r;return u!==void 0})),g),s)};function Be(e,l){if(!$)return;const s=l.modifiers||{},t=l.value,{handler:v,options:d}=typeof t=="object"?t:{handler:t,options:{}},g=new IntersectionObserver(function(){var u;let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],f=arguments.length>1?arguments[1]:void 0;const r=(u=e._observe)==null?void 0:u[l.instance.$.uid];if(!r)return;const i=m.some(S=>S.isIntersecting);v&&(!s.quiet||r.init)&&(!s.once||i||r.init)&&v(i,m,f),i&&s.once?H(e,l):r.init=!0},d);e._observe=Object(e._observe),e._observe[l.instance.$.uid]={init:!1,observer:g},g.observe(e)}function H(e,l){var t;const s=(t=e._observe)==null?void 0:t[l.instance.$.uid];s&&(s.observer.unobserve(e),delete e._observe[l.instance.$.uid])}const je={mounted:Be,unmounted:H},we=V({absolute:Boolean,alt:String,cover:Boolean,color:String,draggable:{type:[Boolean,String],default:void 0},eager:Boolean,gradient:String,lazySrc:String,options:{type:Object,default:()=>({root:void 0,rootMargin:void 0,threshold:void 0})},sizes:String,src:{type:[String,Object],default:""},crossorigin:String,referrerpolicy:String,srcset:String,position:String,...q(),...R(),...x(),...Te()},"VImg"),Oe=T()({name:"VImg",directives:{intersect:je},props:we(),emits:{loadstart:e=>!0,load:e=>!0,error:e=>!0},setup(e,l){let{emit:s,slots:t}=l;const{backgroundColorClasses:v,backgroundColorStyles:d}=ee(he(e,"color")),{roundedClasses:g}=E(e),m=te("VImg"),f=h(""),r=ke(),i=h(e.eager?"loading":"idle"),u=h(),S=h(),c=P(()=>e.src&&typeof e.src=="object"?{src:e.src.src,srcset:e.srcset||e.src.srcset,lazySrc:e.lazySrc||e.src.lazySrc,aspect:Number(e.aspectRatio||e.src.aspect||0)}:{src:e.src,srcset:e.srcset,lazySrc:e.lazySrc,aspect:Number(e.aspectRatio||0)}),b=P(()=>c.value.aspect||u.value/S.value||0);C(()=>e.src,()=>{I(i.value!=="idle")}),C(b,(a,o)=>{!a&&o&&r.value&&_(r.value)}),Pe(()=>I());function I(a){if(!(e.eager&&a)&&!($&&!a&&!e.eager)){if(i.value="loading",c.value.lazySrc){const o=new Image;o.src=c.value.lazySrc,_(o,null)}c.value.src&&Ve(()=>{var o;s("loadstart",((o=r.value)==null?void 0:o.currentSrc)||c.value.src),setTimeout(()=>{var y;if(!m.isUnmounted)if((y=r.value)!=null&&y.complete){if(r.value.naturalWidth||w(),i.value==="error")return;b.value||_(r.value,null),i.value==="loading"&&j()}else b.value||_(r.value),O()})})}}function j(){var a;m.isUnmounted||(O(),_(r.value),i.value="loaded",s("load",((a=r.value)==null?void 0:a.currentSrc)||c.value.src))}function w(){var a;m.isUnmounted||(i.value="error",s("error",((a=r.value)==null?void 0:a.currentSrc)||c.value.src))}function O(){const a=r.value;a&&(f.value=a.currentSrc||a.src)}let z=-1;Ie(()=>{clearTimeout(z)});function _(a){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:100;const y=()=>{if(clearTimeout(z),m.isUnmounted)return;const{naturalHeight:D,naturalWidth:N}=a;D||N?(u.value=N,S.value=D):!a.complete&&i.value==="loading"&&o!=null?z=window.setTimeout(y,o):(a.currentSrc.endsWith(".svg")||a.currentSrc.startsWith("data:image/svg+xml"))&&(u.value=1,S.value=1)};y()}const U=P(()=>({"v-img__img--cover":e.cover,"v-img__img--contain":!e.cover})),L=()=>{var y;if(!c.value.src||i.value==="idle")return null;const a=n("img",{class:["v-img__img",U.value],style:{objectPosition:e.position},src:c.value.src,srcset:c.value.srcset,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable,sizes:e.sizes,ref:r,onLoad:j,onError:w},null),o=(y=t.sources)==null?void 0:y.call(t);return n(k,{transition:e.transition,appear:!0},{default:()=>[W(o?n("picture",{class:"v-img__picture"},[o,a]):a,[[ne,i.value==="loaded"]])]})},G=()=>n(k,{transition:e.transition},{default:()=>[c.value.lazySrc&&i.value!=="loaded"&&n("img",{class:["v-img__img","v-img__img--preload",U.value],style:{objectPosition:e.position},src:c.value.lazySrc,alt:e.alt,crossorigin:e.crossorigin,referrerpolicy:e.referrerpolicy,draggable:e.draggable},null)]}),Z=()=>t.placeholder?n(k,{transition:e.transition,appear:!0},{default:()=>[(i.value==="loading"||i.value==="error"&&!t.error)&&n("div",{class:"v-img__placeholder"},[t.placeholder()])]}):null,J=()=>t.error?n(k,{transition:e.transition,appear:!0},{default:()=>[i.value==="error"&&n("div",{class:"v-img__error"},[t.error()])]}):null,K=()=>e.gradient?n("div",{class:"v-img__gradient",style:{backgroundImage:`linear-gradient(${e.gradient})`}},null):null,A=h(!1);{const a=C(b,o=>{o&&(requestAnimationFrame(()=>{requestAnimationFrame(()=>{A.value=!0})}),a())})}return B(()=>{const a=F.filterProps(e);return W(n(F,M({class:["v-img",{"v-img--absolute":e.absolute,"v-img--booting":!A.value},v.value,g.value,e.class],style:[{width:ae(e.width==="auto"?u.value:e.width)},d.value,e.style]},a,{aspectRatio:b.value,"aria-label":e.alt,role:e.alt?"img":void 0}),{additional:()=>n(Ce,null,[n(L,null,null),n(G,null,null),n(K,null,null),n(Z,null,null),n(J,null,null)]),default:t.default}),[[ze("intersect"),{handler:I,options:e.options},null,{once:!0}]])}),{currentSrc:f,image:r,state:i,naturalWidth:u,naturalHeight:S}}}),Ue=V({start:Boolean,end:Boolean,icon:re,image:String,text:String,...se(),...R(),...ie(),...x(),...le(),...oe(),...ue(),...ce({variant:"flat"})},"VAvatar"),Ne=T()({name:"VAvatar",props:Ue(),setup(e,l){let{slots:s}=l;const{themeClasses:t}=ve(e),{borderClasses:v}=de(e),{colorClasses:d,colorStyles:g,variantClasses:m}=me(e),{densityClasses:f}=ge(e),{roundedClasses:r}=E(e),{sizeClasses:i,sizeStyles:u}=fe(e);return B(()=>n(e.tag,{class:["v-avatar",{"v-avatar--start":e.start,"v-avatar--end":e.end},t.value,v.value,d.value,f.value,r.value,i.value,m.value,e.class],style:[g.value,u.value,e.style]},{default:()=>[s.default?n(Se,{key:"content-defaults",defaults:{VImg:{cover:!0,src:e.image},VIcon:{icon:e.icon}}},{default:()=>[s.default()]}):e.image?n(Oe,{key:"image",src:e.image,alt:"",cover:!0},null):e.icon?n(ye,{key:"icon",icon:e.icon},null):e.text,be(!1,"v-avatar")]})),{}}});export{je as I,k as M,Ne as V,Oe as a,Te as m};