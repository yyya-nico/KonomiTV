import{H as Y,cy as he,cz as ke,c as n,cA as le,cn as G,bI as R,bB as ae,r as W,cB as ye,a9 as Se,ch as ie,I as ue,K as J,R as pe,b0 as oe,cC as ge,ck as Ve,O as Z,cg as O,j as r,g as ne,s as we,y as Ce,cD as _e,cE as xe,ct as se,X as Te,F as Fe,Q as Pe}from"./top-CONcDROc.js";import{j as Re,k as ze,m as Ee,u as Me,V as re,a as Le}from"./VTextField-CTBfqDAh.js";const ee=Symbol.for("vuetify:v-slider");function Ne(e,t,a){const u=a==="vertical",o=t.getBoundingClientRect(),k="touches"in e?e.touches[0]:e;return u?k.clientY-(o.top+o.height/2):k.clientX-(o.left+o.width/2)}function Be(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}const De=Y({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>typeof e=="boolean"||e==="always"},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>typeof e=="boolean"||e==="always"},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...he(),...ke({elevation:2}),ripple:{type:Boolean,default:!0}},"Slider"),Ie=e=>{const t=n(()=>parseFloat(e.min)),a=n(()=>parseFloat(e.max)),u=n(()=>+e.step>0?parseFloat(e.step):0),o=n(()=>Math.max(le(u.value),le(t.value)));function k(y){if(y=parseFloat(y),u.value<=0)return y;const v=ie(y,t.value,a.value),S=t.value%u.value,_=Math.round((v-S)/u.value)*u.value+S;return parseFloat(Math.min(_,a.value).toFixed(o.value))}return{min:t,max:a,step:u,decimals:o,roundValue:k}},Oe=e=>{let{props:t,steps:a,onSliderStart:u,onSliderMove:o,onSliderEnd:k,getActiveThumb:y}=e;const{isRtl:v}=G(),S=R(t,"reverse"),_=n(()=>t.direction==="vertical"),x=n(()=>_.value!==S.value),{min:f,max:g,step:T,decimals:L,roundValue:z}=a,D=n(()=>parseInt(t.thumbSize,10)),N=n(()=>parseInt(t.tickSize,10)),E=n(()=>parseInt(t.trackSize,10)),F=n(()=>(g.value-f.value)/T.value),I=R(t,"disabled"),P=n(()=>t.error||t.disabled?void 0:t.thumbColor??t.color),i=n(()=>t.error||t.disabled?void 0:t.trackColor??t.color),V=n(()=>t.error||t.disabled?void 0:t.trackFillColor??t.color),m=ae(!1),b=ae(0),w=W(),C=W();function s(l){var te;const d=t.direction==="vertical",ce=d?"top":"left",de=d?"height":"width",ve=d?"clientY":"clientX",{[ce]:me,[de]:be}=(te=w.value)==null?void 0:te.$el.getBoundingClientRect(),fe=Be(l,ve);let Q=Math.min(Math.max((fe-me-b.value)/be,0),1)||0;return(d?x.value:x.value!==v.value)&&(Q=1-Q),z(f.value+Q*(g.value-f.value))}const M=l=>{k({value:s(l)}),m.value=!1,b.value=0},B=l=>{C.value=y(l),C.value&&(C.value.focus(),m.value=!0,C.value.contains(l.target)?b.value=Ne(l,C.value,t.direction):(b.value=0,o({value:s(l)})),u({value:s(l)}))},p={passive:!0,capture:!0};function K(l){o({value:s(l)})}function A(l){l.stopPropagation(),l.preventDefault(),M(l),window.removeEventListener("mousemove",K,p),window.removeEventListener("mouseup",A)}function $(l){var d;M(l),window.removeEventListener("touchmove",K,p),(d=l.target)==null||d.removeEventListener("touchend",$)}function H(l){var d;B(l),window.addEventListener("touchmove",K,p),(d=l.target)==null||d.addEventListener("touchend",$,{passive:!1})}function h(l){l.preventDefault(),B(l),window.addEventListener("mousemove",K,p),window.addEventListener("mouseup",A,{passive:!1})}const c=l=>{const d=(l-f.value)/(g.value-f.value)*100;return ie(isNaN(d)?0:d,0,100)},j=R(t,"showTicks"),q=n(()=>j.value?t.ticks?Array.isArray(t.ticks)?t.ticks.map(l=>({value:l,position:c(l),label:l.toString()})):Object.keys(t.ticks).map(l=>({value:parseFloat(l),position:c(parseFloat(l)),label:t.ticks[l]})):F.value!==1/0?ye(F.value+1).map(l=>{const d=f.value+l*T.value;return{value:d,position:c(d)}}):[]:[]),U=n(()=>q.value.some(l=>{let{label:d}=l;return!!d})),X={activeThumbRef:C,color:R(t,"color"),decimals:L,disabled:I,direction:R(t,"direction"),elevation:R(t,"elevation"),hasLabels:U,isReversed:S,indexFromEnd:x,min:f,max:g,mousePressed:m,numTicks:F,onSliderMousedown:h,onSliderTouchstart:H,parsedTicks:q,parseMouseMove:s,position:c,readonly:R(t,"readonly"),rounded:R(t,"rounded"),roundValue:z,showTicks:j,startOffset:b,step:T,thumbSize:D,thumbColor:P,thumbLabel:R(t,"thumbLabel"),ticks:R(t,"ticks"),tickSize:N,trackColor:i,trackContainerRef:w,trackFillColor:V,trackSize:E,vertical:_};return Se(ee,X),X},Ke=Y({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},name:String,...ue()},"VSliderThumb"),je=J()({name:"VSliderThumb",directives:{Ripple:pe},props:Ke(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a,emit:u}=t;const o=oe(ee),{isRtl:k,rtlClasses:y}=G();if(!o)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");const{thumbColor:v,step:S,disabled:_,thumbSize:x,thumbLabel:f,direction:g,isReversed:T,vertical:L,readonly:z,elevation:D,mousePressed:N,decimals:E,indexFromEnd:F}=o,I=n(()=>_.value?void 0:D.value),{elevationClasses:P}=ge(I),{textColorClasses:i,textColorStyles:V}=Ve(v),{pageup:m,pagedown:b,end:w,home:C,left:s,right:M,down:B,up:p}=_e,K=[m,b,w,C,s,M,B,p],A=n(()=>S.value?[1,2,3]:[1,5,10]);function $(h,c){if(!K.includes(h.key))return;h.preventDefault();const j=S.value||.1,q=(e.max-e.min)/j;if([s,M,B,p].includes(h.key)){const X=(L.value?[k.value?s:M,T.value?B:p]:F.value!==k.value?[s,p]:[M,p]).includes(h.key)?1:-1,l=h.shiftKey?2:h.ctrlKey?1:0;c=c+X*j*A.value[l]}else if(h.key===C)c=e.min;else if(h.key===w)c=e.max;else{const U=h.key===b?1:-1;c=c-U*j*(q>100?q/10:10)}return Math.max(e.min,Math.min(e.max,c))}function H(h){const c=$(h,e.modelValue);c!=null&&u("update:modelValue",c)}return Z(()=>{const h=O(F.value?100-e.position:e.position,"%");return r("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&N.value},e.class,y.value],style:[{"--v-slider-thumb-position":h,"--v-slider-thumb-size":O(x.value)},e.style],role:"slider",tabindex:_.value?-1:0,"aria-label":e.name,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!z.value,"aria-orientation":g.value,onKeydown:z.value?void 0:H},[r("div",{class:["v-slider-thumb__surface",i.value,P.value],style:{...V.value}},null),ne(r("div",{class:["v-slider-thumb__ripple",i.value],style:V.value},null),[[we("ripple"),e.ripple,null,{circle:!0,center:!0}]]),r(Re,{origin:"bottom center"},{default:()=>{var c;return[ne(r("div",{class:"v-slider-thumb__label-container"},[r("div",{class:["v-slider-thumb__label"]},[r("div",null,[((c=a["thumb-label"])==null?void 0:c.call(a,{modelValue:e.modelValue}))??e.modelValue.toFixed(S.value?E.value:1)])])]),[[Ce,f.value&&e.focused||f.value==="always"]])]}})])}),{}}}),qe=Y({start:{type:Number,required:!0},stop:{type:Number,required:!0},...ue()},"VSliderTrack"),Ae=J()({name:"VSliderTrack",props:qe(),emits:{},setup(e,t){let{slots:a}=t;const u=oe(ee);if(!u)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");const{color:o,parsedTicks:k,rounded:y,showTicks:v,tickSize:S,trackColor:_,trackFillColor:x,trackSize:f,vertical:g,min:T,max:L,indexFromEnd:z}=u,{roundedClasses:D}=xe(y),{backgroundColorClasses:N,backgroundColorStyles:E}=se(x),{backgroundColorClasses:F,backgroundColorStyles:I}=se(_),P=n(()=>`inset-${g.value?"block":"inline"}-${z.value?"end":"start"}`),i=n(()=>g.value?"height":"width"),V=n(()=>({[P.value]:"0%",[i.value]:"100%"})),m=n(()=>e.stop-e.start),b=n(()=>({[P.value]:O(e.start,"%"),[i.value]:O(m.value,"%")})),w=n(()=>v.value?(g.value?k.value.slice().reverse():k.value).map((s,M)=>{var p;const B=s.value!==T.value&&s.value!==L.value?O(s.position,"%"):void 0;return r("div",{key:s.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":s.position>=e.start&&s.position<=e.stop,"v-slider-track__tick--first":s.value===T.value,"v-slider-track__tick--last":s.value===L.value}],style:{[P.value]:B}},[(s.label||a["tick-label"])&&r("div",{class:"v-slider-track__tick-label"},[((p=a["tick-label"])==null?void 0:p.call(a,{tick:s,index:M}))??s.label])])}):[]);return Z(()=>r("div",{class:["v-slider-track",D.value,e.class],style:[{"--v-slider-track-size":O(f.value),"--v-slider-tick-size":O(S.value)},e.style]},[r("div",{class:["v-slider-track__background",F.value,{"v-slider-track__background--opacity":!!o.value||!x.value}],style:{...V.value,...I.value}},null),r("div",{class:["v-slider-track__fill",N.value],style:{...b.value,...E.value}},null),v.value&&r("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":v.value==="always"}]},[w.value])])),{}}}),$e=Y({...ze(),...De(),...Ee(),modelValue:{type:[Number,String],default:0}},"VSlider"),Ye=J()({name:"VSlider",props:$e(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,t){let{slots:a,emit:u}=t;const o=W(),{rtlClasses:k}=G(),y=Ie(e),v=Te(e,"modelValue",void 0,i=>y.roundValue(i??y.min.value)),{min:S,max:_,mousePressed:x,roundValue:f,onSliderMousedown:g,onSliderTouchstart:T,trackContainerRef:L,position:z,hasLabels:D,readonly:N}=Oe({props:e,steps:y,onSliderStart:()=>{u("start",v.value)},onSliderEnd:i=>{let{value:V}=i;const m=f(V);v.value=m,u("end",m)},onSliderMove:i=>{let{value:V}=i;return v.value=f(V)},getActiveThumb:()=>{var i;return(i=o.value)==null?void 0:i.$el}}),{isFocused:E,focus:F,blur:I}=Me(e),P=n(()=>z(v.value));return Z(()=>{const i=re.filterProps(e),V=!!(e.label||a.label||a.prepend);return r(re,Pe({class:["v-slider",{"v-slider--has-labels":!!a["tick-label"]||D.value,"v-slider--focused":E.value,"v-slider--pressed":x.value,"v-slider--disabled":e.disabled},k.value,e.class],style:e.style},i,{focused:E.value}),{...a,prepend:V?m=>{var b,w;return r(Fe,null,[((b=a.label)==null?void 0:b.call(a,m))??(e.label?r(Le,{id:m.id.value,class:"v-slider__label",text:e.label},null):void 0),(w=a.prepend)==null?void 0:w.call(a,m)])}:void 0,default:m=>{let{id:b,messagesId:w}=m;return r("div",{class:"v-slider__container",onMousedown:N.value?void 0:g,onTouchstartPassive:N.value?void 0:T},[r("input",{id:b.value,name:e.name||b.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:v.value},null),r(Ae,{ref:L,start:0,stop:P.value},{"tick-label":a["tick-label"]}),r(je,{ref:o,"aria-describedby":w.value,focused:E.value,min:S.value,max:_.value,modelValue:v.value,"onUpdate:modelValue":C=>v.value=C,position:P.value,elevation:e.elevation,onFocus:F,onBlur:I,ripple:e.ripple,name:e.name},{"thumb-label":a["thumb-label"]})])}})}),{}}});export{Ye as V};
