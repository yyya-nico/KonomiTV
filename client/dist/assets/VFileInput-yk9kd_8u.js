import{m as Q,d as W,u as X,e as D,f as Z,g as ee,h as le,i as te}from"./VTextField-CCpNOafA.js";import{z as ne,ct as ae,C as oe,co as ue,cg as ie,D as s,cu as M,Y as h,S as se,c3 as re,cv as ce,b as o,b4 as C,F as g,a3 as de,cw as fe}from"./top-uKJ9GJm1.js";import{a as ve}from"./VSwitch-XsLUSj24.js";const me=ne({chips:Boolean,counter:Boolean,counterSizeString:{type:String,default:"$vuetify.fileInput.counterSize"},counterString:{type:String,default:"$vuetify.fileInput.counter"},multiple:Boolean,showSize:{type:[Boolean,Number],default:!1,validator:e=>typeof e=="boolean"||[1e3,1024].includes(e)},...Q({prependIcon:"$file"}),modelValue:{type:Array,default:()=>[],validator:e=>ae(e).every(f=>f!=null&&typeof f=="object")},...W({clearable:!0})},"VFileInput"),ge=oe()({name:"VFileInput",inheritAttrs:!1,props:me(),emits:{"click:control":e=>!0,"mousedown:control":e=>!0,"update:focused":e=>!0,"update:modelValue":e=>!0},setup(e,f){let{attrs:$,emit:k,slots:n}=f;const{t:V}=ue(),a=ie(e,"modelValue"),{isFocused:v,focus:N,blur:x}=X(e),I=s(()=>typeof e.showSize!="boolean"?e.showSize:void 0),F=s(()=>(a.value??[]).reduce((l,t)=>{let{size:r=0}=t;return l+r},0)),S=s(()=>M(F.value,I.value)),p=s(()=>(a.value??[]).map(l=>{const{name:t="",size:r=0}=l;return e.showSize?`${t} (${M(r,I.value)})`:t})),j=s(()=>{var t;const l=((t=a.value)==null?void 0:t.length)??0;return e.showSize?V(e.counterSizeString,l,S.value):V(e.counterString,l)}),b=h(),P=h(),i=h(),E=s(()=>v.value||e.active),z=s(()=>["plain","underlined"].includes(e.variant));function y(){var l;i.value!==document.activeElement&&((l=i.value)==null||l.focus()),v.value||N()}function U(l){w(l)}function L(l){k("mousedown:control",l)}function w(l){var t;(t=i.value)==null||t.click(),k("click:control",l)}function O(l){l.stopPropagation(),y(),de(()=>{a.value=[],fe(e["onClick:clear"],l)})}return se(a,l=>{(!Array.isArray(l)||!l.length)&&i.value&&(i.value.value="")}),re(()=>{const l=!!(n.counter||e.counter),t=!!(l||n.details),[r,T]=ce($),{modelValue:pe,...Y}=D.filterProps(e),_=Z(e);return o(D,C({ref:b,modelValue:a.value,"onUpdate:modelValue":c=>a.value=c,class:["v-file-input",{"v-file-input--chips":!!e.chips,"v-input--plain-underlined":z.value},e.class],style:e.style,"onClick:prepend":U},r,Y,{centerAffix:!z.value,focused:v.value}),{...n,default:c=>{let{id:m,isDisabled:d,isDirty:R,isReadonly:A,isValid:q}=c;return o(ee,C({ref:P,"prepend-icon":e.prependIcon,onMousedown:L,onClick:w,"onClick:clear":O,"onClick:prependInner":e["onClick:prependInner"],"onClick:appendInner":e["onClick:appendInner"]},_,{id:m.value,active:E.value||R.value,dirty:R.value,disabled:d.value,focused:v.value,error:q.value===!1}),{...n,default:G=>{var B;let{props:{class:H,...J}}=G;return o(g,null,[o("input",C({ref:i,type:"file",readonly:A.value,disabled:d.value,multiple:e.multiple,name:e.name,onClick:u=>{u.stopPropagation(),A.value&&u.preventDefault(),y()},onChange:u=>{if(!u.target)return;const K=u.target;a.value=[...K.files??[]]},onFocus:y,onBlur:x},J,T),null),o("div",{class:H},[!!((B=a.value)!=null&&B.length)&&(n.selection?n.selection({fileNames:p.value,totalBytes:F.value,totalBytesReadable:S.value}):e.chips?p.value.map(u=>o(ve,{key:u,size:"small",color:e.color},{default:()=>[u]})):p.value.join(", "))])])}})},details:t?c=>{var m,d;return o(g,null,[(m=n.details)==null?void 0:m.call(n,c),l&&o(g,null,[o("span",null,null),o(le,{active:!!((d=a.value)!=null&&d.length),value:j.value},n.counter)])])}:void 0})}),te({},b,P,i)}});export{ge as V};
