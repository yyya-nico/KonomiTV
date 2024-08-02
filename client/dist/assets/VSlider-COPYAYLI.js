import{z as X,cq as he,cr as ke,D as s,cs as le,cd as J,bB as R,bu as ae,Y as H,ct as ye,$ as pe,cu as ie,A as ue,C as Q,R as Se,aU as oe,cv as ge,c2 as we,c3 as Z,c9 as I,b as n,w as se,a as Ve,v as Ce,cw as _e,cx as xe,c7 as re,c5 as Te,F as Fe,b4 as Pe}from"./top-laIxw7f5.js";import{i as Re,j as ze,m as Me,u as Ee,d as ne,k as Le}from"./VTextField-DpRoa_yK.js";const ee=Symbol.for("vuetify:v-slider");function Ne(e,t,a){const u=a==="vertical",o=t.getBoundingClientRect(),k="touches"in e?e.touches[0]:e;return u?k.clientY-(o.top+o.height/2):k.clientX-(o.left+o.width/2)}function Be(e,t){return"touches"in e&&e.touches.length?e.touches[0][t]:"changedTouches"in e&&e.changedTouches.length?e.changedTouches[0][t]:e[t]}const De=X({disabled:{type:Boolean,default:null},error:Boolean,readonly:{type:Boolean,default:null},max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:0},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:e=>typeof e=="boolean"||e==="always"},thumbSize:{type:[Number,String],default:20},showTicks:{type:[Boolean,String],default:!1,validator:e=>typeof e=="boolean"||e==="always"},ticks:{type:[Array,Object]},tickSize:{type:[Number,String],default:2},color:String,trackColor:String,trackFillColor:String,trackSize:{type:[Number,String],default:4},direction:{type:String,default:"horizontal",validator:e=>["vertical","horizontal"].includes(e)},reverse:Boolean,...he(),...ke({elevation:2}),ripple:{type:Boolean,default:!0}},"Slider"),qe=e=>{const t=s(()=>parseFloat(e.min)),a=s(()=>parseFloat(e.max)),u=s(()=>+e.step>0?parseFloat(e.step):0),o=s(()=>Math.max(le(u.value),le(t.value)));function k(y){if(y=parseFloat(y),u.value<=0)return y;const v=ie(y,t.value,a.value),p=t.value%u.value,_=Math.round((v-p)/u.value)*u.value+p;return parseFloat(Math.min(_,a.value).toFixed(o.value))}return{min:t,max:a,step:u,decimals:o,roundValue:k}},Ie=e=>{let{props:t,steps:a,onSliderStart:u,onSliderMove:o,onSliderEnd:k,getActiveThumb:y}=e;const{isRtl:v}=J(),p=R(t,"reverse"),_=s(()=>t.direction==="vertical"),x=s(()=>_.value!==p.value),{min:f,max:g,step:T,decimals:L,roundValue:z}=a,D=s(()=>parseInt(t.thumbSize,10)),N=s(()=>parseInt(t.tickSize,10)),M=s(()=>parseInt(t.trackSize,10)),F=s(()=>(g.value-f.value)/T.value),q=R(t,"disabled"),P=s(()=>t.error||t.disabled?void 0:t.thumbColor??t.color),i=s(()=>t.error||t.disabled?void 0:t.trackColor??t.color),w=s(()=>t.error||t.disabled?void 0:t.trackFillColor??t.color),m=ae(!1),b=ae(0),V=H(),C=H();function r(l){var te;const d=t.direction==="vertical",ce=d?"top":"left",de=d?"height":"width",ve=d?"clientY":"clientX",{[ce]:me,[de]:be}=(te=V.value)==null?void 0:te.$el.getBoundingClientRect(),fe=Be(l,ve);let G=Math.min(Math.max((fe-me-b.value)/be,0),1)||0;return(d?x.value:x.value!==v.value)&&(G=1-G),z(f.value+G*(g.value-f.value))}const E=l=>{k({value:r(l)}),m.value=!1,b.value=0},B=l=>{C.value=y(l),C.value&&(C.value.focus(),m.value=!0,C.value.contains(l.target)?b.value=Ne(l,C.value,t.direction):(b.value=0,o({value:r(l)})),u({value:r(l)}))},S={passive:!0,capture:!0};function O(l){o({value:r(l)})}function j(l){l.stopPropagation(),l.preventDefault(),E(l),window.removeEventListener("mousemove",O,S),window.removeEventListener("mouseup",j)}function $(l){var d;E(l),window.removeEventListener("touchmove",O,S),(d=l.target)==null||d.removeEventListener("touchend",$)}function W(l){var d;B(l),window.addEventListener("touchmove",O,S),(d=l.target)==null||d.addEventListener("touchend",$,{passive:!1})}function h(l){l.preventDefault(),B(l),window.addEventListener("mousemove",O,S),window.addEventListener("mouseup",j,{passive:!1})}const c=l=>{const d=(l-f.value)/(g.value-f.value)*100;return ie(isNaN(d)?0:d,0,100)},A=R(t,"showTicks"),K=s(()=>A.value?t.ticks?Array.isArray(t.ticks)?t.ticks.map(l=>({value:l,position:c(l),label:l.toString()})):Object.keys(t.ticks).map(l=>({value:parseFloat(l),position:c(parseFloat(l)),label:t.ticks[l]})):F.value!==1/0?ye(F.value+1).map(l=>{const d=f.value+l*T.value;return{value:d,position:c(d)}}):[]:[]),U=s(()=>K.value.some(l=>{let{label:d}=l;return!!d})),Y={activeThumbRef:C,color:R(t,"color"),decimals:L,disabled:q,direction:R(t,"direction"),elevation:R(t,"elevation"),hasLabels:U,isReversed:p,indexFromEnd:x,min:f,max:g,mousePressed:m,numTicks:F,onSliderMousedown:h,onSliderTouchstart:W,parsedTicks:K,parseMouseMove:r,position:c,readonly:R(t,"readonly"),rounded:R(t,"rounded"),roundValue:z,showTicks:A,startOffset:b,step:T,thumbSize:D,thumbColor:P,thumbLabel:R(t,"thumbLabel"),ticks:R(t,"ticks"),tickSize:N,trackColor:i,trackContainerRef:V,trackFillColor:w,trackSize:M,vertical:_};return pe(ee,Y),Y},Oe=X({focused:Boolean,max:{type:Number,required:!0},min:{type:Number,required:!0},modelValue:{type:Number,required:!0},position:{type:Number,required:!0},ripple:{type:[Boolean,Object],default:!0},...ue()},"VSliderThumb"),Ae=Q()({name:"VSliderThumb",directives:{Ripple:Se},props:Oe(),emits:{"update:modelValue":e=>!0},setup(e,t){let{slots:a,emit:u}=t;const o=oe(ee),{isRtl:k,rtlClasses:y}=J();if(!o)throw new Error("[Vuetify] v-slider-thumb must be used inside v-slider or v-range-slider");const{thumbColor:v,step:p,disabled:_,thumbSize:x,thumbLabel:f,direction:g,isReversed:T,vertical:L,readonly:z,elevation:D,mousePressed:N,decimals:M,indexFromEnd:F}=o,q=s(()=>_.value?void 0:D.value),{elevationClasses:P}=ge(q),{textColorClasses:i,textColorStyles:w}=we(v),{pageup:m,pagedown:b,end:V,home:C,left:r,right:E,down:B,up:S}=_e,O=[m,b,V,C,r,E,B,S],j=s(()=>p.value?[1,2,3]:[1,5,10]);function $(h,c){if(!O.includes(h.key))return;h.preventDefault();const A=p.value||.1,K=(e.max-e.min)/A;if([r,E,B,S].includes(h.key)){const Y=(L.value?[k.value?r:E,T.value?B:S]:F.value!==k.value?[r,S]:[E,S]).includes(h.key)?1:-1,l=h.shiftKey?2:h.ctrlKey?1:0;c=c+Y*A*j.value[l]}else if(h.key===C)c=e.min;else if(h.key===V)c=e.max;else{const U=h.key===b?1:-1;c=c-U*A*(K>100?K/10:10)}return Math.max(e.min,Math.min(e.max,c))}function W(h){const c=$(h,e.modelValue);c!=null&&u("update:modelValue",c)}return Z(()=>{const h=I(F.value?100-e.position:e.position,"%");return n("div",{class:["v-slider-thumb",{"v-slider-thumb--focused":e.focused,"v-slider-thumb--pressed":e.focused&&N.value},e.class,y.value],style:[{"--v-slider-thumb-position":h,"--v-slider-thumb-size":I(x.value)},e.style],role:"slider",tabindex:_.value?-1:0,"aria-valuemin":e.min,"aria-valuemax":e.max,"aria-valuenow":e.modelValue,"aria-readonly":!!z.value,"aria-orientation":g.value,onKeydown:z.value?void 0:W},[n("div",{class:["v-slider-thumb__surface",i.value,P.value],style:{...w.value}},null),se(n("div",{class:["v-slider-thumb__ripple",i.value],style:w.value},null),[[Ve("ripple"),e.ripple,null,{circle:!0,center:!0}]]),n(Re,{origin:"bottom center"},{default:()=>{var c;return[se(n("div",{class:"v-slider-thumb__label-container"},[n("div",{class:["v-slider-thumb__label"]},[n("div",null,[((c=a["thumb-label"])==null?void 0:c.call(a,{modelValue:e.modelValue}))??e.modelValue.toFixed(p.value?M.value:1)])])]),[[Ce,f.value&&e.focused||f.value==="always"]])]}})])}),{}}}),Ke=X({start:{type:Number,required:!0},stop:{type:Number,required:!0},...ue()},"VSliderTrack"),je=Q()({name:"VSliderTrack",props:Ke(),emits:{},setup(e,t){let{slots:a}=t;const u=oe(ee);if(!u)throw new Error("[Vuetify] v-slider-track must be inside v-slider or v-range-slider");const{color:o,parsedTicks:k,rounded:y,showTicks:v,tickSize:p,trackColor:_,trackFillColor:x,trackSize:f,vertical:g,min:T,max:L,indexFromEnd:z}=u,{roundedClasses:D}=xe(y),{backgroundColorClasses:N,backgroundColorStyles:M}=re(x),{backgroundColorClasses:F,backgroundColorStyles:q}=re(_),P=s(()=>`inset-${g.value?"block":"inline"}-${z.value?"end":"start"}`),i=s(()=>g.value?"height":"width"),w=s(()=>({[P.value]:"0%",[i.value]:"100%"})),m=s(()=>e.stop-e.start),b=s(()=>({[P.value]:I(e.start,"%"),[i.value]:I(m.value,"%")})),V=s(()=>v.value?(g.value?k.value.slice().reverse():k.value).map((r,E)=>{var S;const B=r.value!==T.value&&r.value!==L.value?I(r.position,"%"):void 0;return n("div",{key:r.value,class:["v-slider-track__tick",{"v-slider-track__tick--filled":r.position>=e.start&&r.position<=e.stop,"v-slider-track__tick--first":r.value===T.value,"v-slider-track__tick--last":r.value===L.value}],style:{[P.value]:B}},[(r.label||a["tick-label"])&&n("div",{class:"v-slider-track__tick-label"},[((S=a["tick-label"])==null?void 0:S.call(a,{tick:r,index:E}))??r.label])])}):[]);return Z(()=>n("div",{class:["v-slider-track",D.value,e.class],style:[{"--v-slider-track-size":I(f.value),"--v-slider-tick-size":I(p.value)},e.style]},[n("div",{class:["v-slider-track__background",F.value,{"v-slider-track__background--opacity":!!o.value||!x.value}],style:{...w.value,...q.value}},null),n("div",{class:["v-slider-track__fill",N.value],style:{...b.value,...M.value}},null),v.value&&n("div",{class:["v-slider-track__ticks",{"v-slider-track__ticks--always-show":v.value==="always"}]},[V.value])])),{}}}),$e=X({...ze(),...De(),...Me(),modelValue:{type:[Number,String],default:0}},"VSlider"),Xe=Q()({name:"VSlider",props:$e(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,start:e=>!0,end:e=>!0},setup(e,t){let{slots:a,emit:u}=t;const o=H(),{rtlClasses:k}=J(),y=qe(e),v=Te(e,"modelValue",void 0,i=>y.roundValue(i??y.min.value)),{min:p,max:_,mousePressed:x,roundValue:f,onSliderMousedown:g,onSliderTouchstart:T,trackContainerRef:L,position:z,hasLabels:D,readonly:N}=Ie({props:e,steps:y,onSliderStart:()=>{u("start",v.value)},onSliderEnd:i=>{let{value:w}=i;const m=f(w);v.value=m,u("end",m)},onSliderMove:i=>{let{value:w}=i;return v.value=f(w)},getActiveThumb:()=>{var i;return(i=o.value)==null?void 0:i.$el}}),{isFocused:M,focus:F,blur:q}=Ee(e),P=s(()=>z(v.value));return Z(()=>{const i=ne.filterProps(e),w=!!(e.label||a.label||a.prepend);return n(ne,Pe({class:["v-slider",{"v-slider--has-labels":!!a["tick-label"]||D.value,"v-slider--focused":M.value,"v-slider--pressed":x.value,"v-slider--disabled":e.disabled},k.value,e.class],style:e.style},i,{focused:M.value}),{...a,prepend:w?m=>{var b,V;return n(Fe,null,[((b=a.label)==null?void 0:b.call(a,m))??(e.label?n(Le,{id:m.id.value,class:"v-slider__label",text:e.label},null):void 0),(V=a.prepend)==null?void 0:V.call(a,m)])}:void 0,default:m=>{let{id:b,messagesId:V}=m;return n("div",{class:"v-slider__container",onMousedown:N.value?void 0:g,onTouchstartPassive:N.value?void 0:T},[n("input",{id:b.value,name:e.name||b.value,disabled:!!e.disabled,readonly:!!e.readonly,tabindex:"-1",value:v.value},null),n(je,{ref:L,start:0,stop:P.value},{"tick-label":a["tick-label"]}),n(Ae,{ref:o,"aria-describedby":V.value,focused:M.value,min:p.value,max:_.value,modelValue:v.value,"onUpdate:modelValue":C=>v.value=C,position:P.value,elevation:e.elevation,onFocus:F,onBlur:q,ripple:e.ripple},{"thumb-label":a["thumb-label"]})])}})}),{}}});export{Xe as V};
