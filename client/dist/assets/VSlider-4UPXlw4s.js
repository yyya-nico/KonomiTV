import{z as Y,cz as he,cA as ke,D as s,cB as le,c7 as H,bB as z,bu as ae,Y as G,cC as ye,$ as pe,ce as ie,A as ue,C as J,R as Se,aU as oe,c2 as ge,c3 as Q,ck as O,cD as we,b as n,w as se,a as Ve,v as Ce,cE as _e,cF as xe,ci as re,cg as Te,F as Fe,b4 as Pe}from"./top-a7WKlsLb.js";import{j as ze,k as Re,m as Ee,u as Me,e as ne,l as Le}from"./VTextField-jv_Beb8-.js";const Z=Symbol.for("vuetify:v-slider");function Ne(e,t,a){const i=a==="vertical",u=t.getBoundingClientRect(),h="touches"in e?e.touches[0]:e;return i?h.clientY-(u.top+u.height/2):h.clientX-(u.left+u.width/2)}function Be(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}const De=Y({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>typeof e=="boolean"||e==="always"},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>typeof e=="boolean"||e==="always"},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...he(),...ke({elevation:2}),ripple:{type:Boolean,default:!0}},"Slider"),Ae=e=>{const t=s(()=>parseFloat(e.min)),a=s(()=>parseFloat(e.max)),i=s(()=>+e.step>0?parseFloat(e.step):0),u=s(()=>Math.max(le(i.value),le(t.value)));function h(k){if(k=parseFloat(k),i.value<=0)return k;const d=ie(k,t.value,a.value),g=t.value%i.value,C=Math.round((d-g)/i.value)*i.value+g;return parseFloat(Math.min(C,a.value).toFixed(u.value))}return{min:t,max:a,step:i,decimals:u,roundValue:h}},Ie=e=>{let{props:t,steps:a,onSliderStart:i,onSliderMove:u,onSliderEnd:h,getActiveThumb:k}=e;const{isRtl:d}=H(),g=z(t,"reverse"),C=s(()=>t.direction==="vertical"),x=s(()=>C.value!==g.value),{min:f,max:w,step:T,decimals:L,roundValue:R}=a,A=s(()=>parseInt(t.thumbSize,10)),N=s(()=>parseInt(t.tickSize,10)),E=s(()=>parseInt(t.trackSize,10)),F=s(()=>(w.value-f.value)/T.value),B=z(t,"disabled"),_=s(()=>t.error||t.disabled?void 0:t.thumbColor??t.color),o=s(()=>t.error||t.disabled?void 0:t.trackColor??t.color),V=s(()=>t.error||t.disabled?void 0:t.trackFillColor??t.color),v=ae(!1),m=ae(0),y=G(),p=G();function r(l){var te;const c=t.direction==="vertical",ce=c?"top":"left",de=c?"height":"width",ve=c?"clientY":"clientX",{[ce]:me,[de]:be}=(te=y.value)==null?void 0:te.$el.getBoundingClientRect(),fe=Be(l,ve);let W=Math.min(Math.max((fe-me-m.value)/be,0),1)||0;return(c?x.value:x.value!==d.value)&&(W=1-W),R(f.value+W*(w.value-f.value))}const P=l=>{h({value:r(l)}),v.value=!1,m.value=0},q=l=>{p.value=k(l),p.value&&(p.value.focus(),v.value=!0,p.value.contains(l.target)?m.value=Ne(l,p.value,t.direction):(m.value=0,u({value:r(l)})),i({value:r(l)}))},M={passive:!0,capture:!0};function K(l){u({value:r(l)})}function $(l){l.stopPropagation(),l.preventDefault(),P(l),window.removeEventListener("mousemove",K,M),window.removeEventListener("mouseup",$)}function b(l){var c;P(l),window.removeEventListener("touchmove",K,M),(c=l.target)==null||c.removeEventListener("touchend",b)}function S(l){var c;q(l),window.addEventListener("touchmove",K,M),(c=l.target)==null||c.addEventListener("touchend",b,{passive:!1})}function D(l){l.preventDefault(),q(l),window.addEventListener("mousemove",K,M),window.addEventListener("mouseup",$,{passive:!1})}const I=l=>{const c=(l-f.value)/(w.value-f.value)*100;return ie(isNaN(c)?0:c,0,100)},j=z(t,"showTicks"),U=s(()=>j.value?t.ticks?Array.isArray(t.ticks)?t.ticks.map(l=>({value:l,position:I(l),label:l.toString()})):Object.keys(t.ticks).map(l=>({value:parseFloat(l),position:I(parseFloat(l)),label:t.ticks[l]})):F.value!==1/0?ye(F.value+1).map(l=>{const c=f.value+l*T.value;return{value:c,position:I(c)}}):[]:[]),X=s(()=>U.value.some(l=>{let{label:c}=l;return!!c})),ee={activeThumbRef:p,color:z(t,"color"),decimals:L,disabled:B,direction:z(t,"direction"),elevation:z(t,"elevation"),hasLabels:X,isReversed:g,indexFromEnd:x,min:f,max:w,mousePressed:v,numTicks:F,onSliderMousedown:D,onSliderTouchstart:S,parsedTicks:U,parseMouseMove:r,position:I,readonly:z(t,"readonly"),rounded:z(t,"rounded"),roundValue:R,showTicks:j,startOffset:m,step:T,thumbSize:A,thumbColor:_,thumbLabel:z(t,"thumbLabel"),ticks:z(t,"ticks"),tickSize:N,trackColor:o,trackContainerRef:y,trackFillColor:V,trackSize:E,vertical:C};return pe(Z,ee),ee},Oe=Y({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},...ue()},"VSliderThumb"),qe=J()({name:"VSliderThumb",directives:{Ripple:Se},props:Oe(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a,emit:i}=t;const u=oe(Z),{isRtl:h,rtlClasses:k}=H();if(!u)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");const{thumbColor:d,step:g,disabled:C,thumbSize:x,thumbLabel:f,direction:w,isReversed:T,vertical:L,readonly:R,elevation:A,mousePressed:N,decimals:E,indexFromEnd:F}=u,{textColorClasses:B,textColorStyles:_}=ge(d),{pageup:o,pagedown:V,end:v,home:m,left:y,right:p,down:r,up:P}=_e,q=[o,V,v,m,y,p,r,P],M=s(()=>g.value?[1,2,3]:[1,5,10]);function K(b,S){if(!q.includes(b.key))return;b.preventDefault();const D=g.value||.1,I=(e.max-e.min)/D;if([y,p,r,P].includes(b.key)){const U=(L.value?[h.value?y:p,T.value?r:P]:F.value!==h.value?[y,P]:[p,P]).includes(b.key)?1:-1,X=b.shiftKey?2:b.ctrlKey?1:0;S=S+U*D*M.value[X]}else if(b.key===m)S=e.min;else if(b.key===v)S=e.max;else{const j=b.key===V?1:-1;S=S-j*D*(I>100?I/10:10)}return Math.max(e.min,Math.min(e.max,S))}function $(b){const S=K(b,e.modelValue);S!=null&&i("update:modelValue",S)}return Q(()=>{const b=O(F.value?100-e.position:e.position,"%"),{elevationClasses:S}=we(s(()=>C.value?void 0:A.value));return n("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&N.value},e.class,k.value],style:[{"--v-slider-thumb-position":b,"--v-slider-thumb-size":O(x.value)},e.style],role:"slider",tabindex:C.value?-1:0,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!R.value,"aria-orientation":w.value,onKeydown:R.value?void 0:$},[n("div",{class:["v-slider-thumb__surface",B.value,S.value],style:{..._.value}},null),se(n("div",{class:["v-slider-thumb__ripple",B.value],style:_.value},null),[[Ve("ripple"),e.ripple,null,{circle:!0,center:!0}]]),n(ze,{origin:"bottom center"},{default:()=>{var D;return[se(n("div",{class:"v-slider-thumb__label-container"},[n("div",{class:["v-slider-thumb__label"]},[n("div",null,[((D=a["thumb-label"])==null?void 0:D.call(a,{modelValue:e.modelValue}))??e.modelValue.toFixed(g.value?E.value:1)])])]),[[Ce,f.value&&e.focused||f.value==="always"]])]}})])}),{}}}),Ke=Y({start:{type:Number,required:!0},stop:{type:Number,required:!0},...ue()},"VSliderTrack"),je=J()({name:"VSliderTrack",props:Ke(),emits:{},setup(e,t){let{slots:a}=t;const i=oe(Z);if(!i)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");const{color:u,parsedTicks:h,rounded:k,showTicks:d,tickSize:g,trackColor:C,trackFillColor:x,trackSize:f,vertical:w,min:T,max:L,indexFromEnd:R}=i,{roundedClasses:A}=xe(k),{backgroundColorClasses:N,backgroundColorStyles:E}=re(x),{backgroundColorClasses:F,backgroundColorStyles:B}=re(C),_=s(()=>`inset-${w.value?"block":"inline"}-${R.value?"end":"start"}`),o=s(()=>w.value?"height":"width"),V=s(()=>({[_.value]:"0%",[o.value]:"100%"})),v=s(()=>e.stop-e.start),m=s(()=>({[_.value]:O(e.start,"%"),[o.value]:O(v.value,"%")})),y=s(()=>d.value?(w.value?h.value.slice().reverse():h.value).map((r,P)=>{var M;const q=r.value!==T.value&&r.value!==L.value?O(r.position,"%"):void 0;return n("div",{key:r.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":r.position>=e.start&&r.position<=e.stop,"v-slider-track__tick--first":r.value===T.value,"v-slider-track__tick--last":r.value===L.value}],style:{[_.value]:q}},[(r.label||a["tick-label"])&&n("div",{class:"v-slider-track__tick-label"},[((M=a["tick-label"])==null?void 0:M.call(a,{tick:r,index:P}))??r.label])])}):[]);return Q(()=>n("div",{class:["v-slider-track",A.value,e.class],style:[{"--v-slider-track-size":O(f.value),"--v-slider-tick-size":O(g.value)},e.style]},[n("div",{class:["v-slider-track__background",F.value,{"v-slider-track__background--opacity":!!u.value||!x.value}],style:{...V.value,...B.value}},null),n("div",{class:["v-slider-track__fill",N.value],style:{...m.value,...E.value}},null),d.value&&n("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":d.value==="always"}]},[y.value])])),{}}}),$e=Y({...Re(),...De(),...Ee(),modelValue:{type:[Number,String],default:0}},"VSlider"),Xe=J()({name:"VSlider",props:$e(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,t){let{slots:a,emit:i}=t;const u=G(),{rtlClasses:h}=H(),k=Ae(e),d=Te(e,"modelValue",void 0,o=>k.roundValue(o??k.min.value)),{min:g,max:C,mousePressed:x,roundValue:f,onSliderMousedown:w,onSliderTouchstart:T,trackContainerRef:L,position:R,hasLabels:A,readonly:N}=Ie({props:e,steps:k,onSliderStart:()=>{i("start",d.value)},onSliderEnd:o=>{let{value:V}=o;const v=f(V);d.value=v,i("end",v)},onSliderMove:o=>{let{value:V}=o;return d.value=f(V)},getActiveThumb:()=>{var o;return(o=u.value)==null?void 0:o.$el}}),{isFocused:E,focus:F,blur:B}=Me(e),_=s(()=>R(d.value));return Q(()=>{const o=ne.filterProps(e),V=!!(e.label||a.label||a.prepend);return n(ne,Pe({class:["v-slider",{"v-slider--has-labels":!!a["tick-label"]||A.value,"v-slider--focused":E.value,"v-slider--pressed":x.value,"v-slider--disabled":e.disabled},h.value,e.class],style:e.style},o,{focused:E.value}),{...a,prepend:V?v=>{var m,y;return n(Fe,null,[((m=a.label)==null?void 0:m.call(a,v))??(e.label?n(Le,{id:v.id.value,class:"v-slider__label",text:e.label},null):void 0),(y=a.prepend)==null?void 0:y.call(a,v)])}:void 0,default:v=>{let{id:m,messagesId:y}=v;return n("div",{class:"v-slider__container",onMousedown:N.value?void 0:w,onTouchstartPassive:N.value?void 0:T},[n("input",{id:m.value,name:e.name||m.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:d.value},null),n(je,{ref:L,start:0,stop:_.value},{"tick-label":a["tick-label"]}),n(qe,{ref:u,"aria-describedby":y.value,focused:E.value,min:g.value,max:C.value,modelValue:d.value,"onUpdate:modelValue":p=>d.value=p,position:_.value,elevation:e.elevation,onFocus:F,onBlur:B,ripple:e.ripple},{"thumb-label":a["thumb-label"]})])}})}),{}}});export{Xe as V};
