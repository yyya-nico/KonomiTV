import{az as E}from"./SnackbarsStore-DxiM_ro_.js";import{m as B}from"./mpegts-CdxVxL0p.js";document.addEventListener("DOMContentLoaded",async()=>{const L=document.getElementById("wrap"),l=document.getElementById("chlist"),m=l.children,b=document.getElementsByClassName("broadcast-wrap"),v=document.getElementsByClassName("broadcast-title"),y=document.getElementsByClassName("control"),h=document.getElementById("control"),u=document.getElementById("volumebutton"),w=document.getElementById("showsw"),S=document.getElementById("fsbutton"),$=()=>{let e=0,a=0,i=Array(v.length).fill(0);function o(){clearTimeout(e),clearTimeout(a),L.classList.remove("hide"),[...b].forEach(t=>{t.classList.remove("hide")}),[...y].forEach(t=>{t.classList.remove("hide")}),h.classList.remove("hide"),e=setTimeout(function(){L.classList.add("hide"),[...y].forEach(t=>{t.classList.add("hide")}),h.classList.add("hide"),!w.checked&&(a=setTimeout(function(){[...b].forEach(t=>{t.classList.add("hide")})},3e3))},3e3)}let p=null;function d(t){t!=p&&(p!=null&&v[p].classList.remove("expand"),p=t),clearTimeout(i[t]),v[t].classList.add("expand"),i[t]=setTimeout(function(){v[t].classList.remove("expand")},6e3)}window.addEventListener("pointerdown",o),window.addEventListener("pointermove",o),window.addEventListener("scroll",o),w.addEventListener("change",o),[...m].forEach((t,r)=>{t.addEventListener("touchstart",()=>d(r)),t.addEventListener("pointermove",()=>d(r)),t.addEventListener("mouseleave",function(){v[r].classList.remove("expand")})}),window.addEventListener("keydown",function(t){const r=t.key;function n(){c(0)}switch(o(),r){case"A":case"a":u.click(),o();break;case"F":case"f":S.click(),o();break;case"ArrowUp":!isNaN(s)&&s!==null?s-3>=0&&c(s-3):n(),d(s);break;case"ArrowLeft":!isNaN(s)&&s!==null?s-1>=0&&c(s-1):n(),d(s);break;case"ArrowRight":!isNaN(s)&&s!==null?s+1<m.length&&c(s+1):n(),d(s);break;case"ArrowDown":!isNaN(s)&&s!==null?s+3<m.length&&c(s+3):n(),d(s);break}}),u.addEventListener("click",function(){c(s!=="all"?"all":null)}),window.addEventListener("scroll",function(){function t(){const r=window.document.body,n=window.document.documentElement,f=r.scrollTop||n.scrollTop;return n.scrollHeight-window.innerHeight-f}t()<=10?h.classList.add("slide"):h.classList.remove("slide")}),o()},_=async()=>{k=await fetch(`${E.getApiBaseUrl()}/channels`).then(e=>(e.status!==200&&console.log("error or no content",e.status),e.json())).catch(e=>(console.error("Failed to load",e),null))},N=()=>k.GR,T=()=>N().filter(e=>e.is_display===!0);let k;await _();const g=e=>new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),c=e=>{switch(e){case null:l.classList.remove("choiced"),[...m].forEach(a=>{a.classList.remove("listening");const i=a.querySelector("video");i.muted=!0}),u.innerHTML='<i class="material-icons">volume_off</i>',u.title="全ch聴く";break;case"all":l.classList.remove("choiced"),[...m].forEach(a=>{a.classList.add("listening");const i=a.querySelector("video");i.muted=!1}),u.innerHTML='<i class="material-icons">volume_up</i>',u.title="ミュートする";break;default:l.classList.add("choiced"),[...m].forEach((a,i)=>{const o=a.querySelector("video");i===e?(a.classList.add("listening"),o.muted=!1):(a.classList.remove("listening"),o.muted=!0)}),u.innerHTML='<i class="material-icons">volume_up</i>',u.title="全ch聴く";break}s=e};let s=null;T().forEach((e,a)=>{var t;const i=`<div class="chframe">
            <video playsinline controlsList="noremoteplayback"></video>
            <div class="broadcast-wrap">
                <div class="broadcast-channel-box">
                    <span class="broadcast-channel">${e.remocon_id}</span>
                    <img class="broadcast-logo" src="${E.getApiBaseUrl()}/channels/${e.id}/logo" alt="${e.name}">
                </div>
                <div class="broadcast-title">
                    <span class="broadcast-title-id">${((t=e.program_present)==null?void 0:t.title)??"(情報なし)"}</span>
                    <div class="broadcast-time">
                        <span class="broadcast-start">${e.program_present?g(e.program_present.start_time):"--:--"}</span>
                        <span class="broadcast-to">～</span>
                        <span class="broadcast-end">${e.program_present?g(e.program_present.end_time):"--:--"}</span>
                    </div>
                </div>
            </div>
            <div class="control">
                <button type="button" class="reload" title="再読み込み"><i class="material-icons">refresh</i></button>
            </div>
        </div>
        `;l.insertAdjacentHTML("beforeend",i);const o=l.lastElementChild,p=o.querySelector("video"),d=o.querySelector(".reload");if(o.addEventListener("click",function(){c(s===a?null:a)}),B.getFeatureList().mseLivePlayback){const r=`${E.getApiBaseUrl()}/streams/live/${e.display_channel_id}/360p/mpegts`,n=B.createPlayer({type:"mse",isLive:!0,url:r});n.attachMediaElement(p),d.addEventListener("click",f=>{if(f.stopPropagation(),n.unload(),f.shiftKey){alert("Shiftキーを押しながらクリックしたため、読み込み停止をしました。");return}n.load(),n.play()}),n.load(),n.play().then(function(){c("all")}).catch(function(){n.muted=!0,n.play()})}}),$(),setInterval(async()=>{await _(),T().forEach((e,a)=>{var r,n;const i=v[a],o={title:i.querySelector(".broadcast-title-id"),startTime:i.querySelector(".broadcast-start"),endTime:i.querySelector(".broadcast-end")},p=Object.values(o).map(f=>f.textContent),d=[((r=e.program_present)==null?void 0:r.title)??"(情報なし)",e.program_present?g(e.program_present.start_time):"--:--",e.program_present?g(e.program_present.end_time):"--:--"];if(p.toString()!==d.toString()){const f=`<span class="broadcast-title-id">${((n=e.program_present)==null?void 0:n.title)??"(情報なし)"}</span>
                    <div class="broadcast-time">
                        <span class="broadcast-start">${e.program_present?g(e.program_present.start_time):"--:--"}</span>
                        <span class="broadcast-to">～</span>
                        <span class="broadcast-end">${e.program_present?g(e.program_present.end_time):"--:--"}</span>
                    </div>
                </div>`;i.innerHTML=f}})},30*1e3)});document.addEventListener("DOMContentLoaded",()=>{const L=document.documentElement,l=document.getElementById("fsbutton");l.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():L.requestFullscreen().catch(b=>{alert("ご利用のブラウザは全画面表示に対応していません"+b.name)})});const m=()=>{document.fullscreenElement?(screen.orientation.lock("landscape").catch(()=>{}),l.innerHTML='<i class="material-icons">fullscreen_exit</i>',l.title="全画面表示を終了"):(screen.orientation.unlock&&screen.orientation.unlock(),l.innerHTML='<i class="material-icons">fullscreen</i>',l.title="全画面表示")};document.addEventListener("fullscreenchange",m)});
