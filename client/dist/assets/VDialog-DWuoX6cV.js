import{g as h,h as D,i as x,d}from"./VSwitch-DN1qehb_.js";import{f as A}from"./VTextField-CrVL-eS9.js";import{z as L,C as S,c8 as F,$ as w,c$ as B,W as m,c6 as I,a5 as R,b6 as f,b as g,cF as T,cW as C}from"./index-CfJiLHux.js";const O=L({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...h({origin:"center center",scrollStrategy:"block",transition:{component:D},zIndex:2400})},"VDialog"),$=S()({name:"VDialog",props:O(),emits:{"update:modelValue":a=>!0,afterLeave:()=>!0},setup(a,p){let{emit:E,slots:u}=p;const l=F(a,"modelValue"),{scopeId:V}=x(),e=w();function v(t){var r,s;const n=t.relatedTarget,c=t.target;if(n!==c&&((r=e.value)!=null&&r.contentEl)&&((s=e.value)!=null&&s.globalTop)&&![document,e.value.contentEl].includes(c)&&!e.value.contentEl.contains(c)){const o=C(e.value.contentEl);if(!o.length)return;const i=o[0],y=o[o.length-1];n===i?y.focus():i.focus()}}B&&m(()=>l.value&&a.retainFocus,t=>{t?document.addEventListener("focusin",v):document.removeEventListener("focusin",v)},{immediate:!0});function P(){var t;(t=e.value)!=null&&t.contentEl&&!e.value.contentEl.contains(document.activeElement)&&e.value.contentEl.focus({preventScroll:!0})}function b(){E("afterLeave")}return m(l,async t=>{var n;t||(await R(),(n=e.value.activatorEl)==null||n.focus({preventScroll:!0}))}),I(()=>{const t=d.filterProps(a),n=f({"aria-haspopup":"dialog","aria-expanded":String(l.value)},a.activatorProps),c=f({tabindex:-1},a.contentProps);return g(d,f({ref:e,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},t,{modelValue:l.value,"onUpdate:modelValue":r=>l.value=r,"aria-modal":"true",activatorProps:n,contentProps:c,role:"dialog",onAfterEnter:P,onAfterLeave:b},V),{activator:u.activator,default:function(){for(var r=arguments.length,s=new Array(r),o=0;o<r;o++)s[o]=arguments[o];return g(T,{root:"VDialog"},{default:()=>{var i;return[(i=u.default)==null?void 0:i.call(u,...s)]}})}})}),A({},e)}});export{$ as V};
