import"./_commonjsHelpers-CSPQI3rM.js";import{m as S}from"./mpegts-CHqqkE9D.js";document.addEventListener("DOMContentLoaded",async()=>{const L=document.getElementById("wrap"),l=document.getElementById("chlist"),u=l.children,h=document.getElementsByClassName("broadcast-wrap"),v=document.getElementsByClassName("broadcast-title"),y=document.getElementsByClassName("control"),b=document.getElementById("control"),p=document.getElementById("volumebutton"),w=document.getElementById("showsw"),N=document.getElementById("fsbutton"),I=()=>{let e=0,n=0,o=Array(v.length).fill(0);function a(){clearTimeout(e),clearTimeout(n),L.classList.remove("hide"),[...h].forEach(t=>{t.classList.remove("hide")}),[...y].forEach(t=>{t.classList.remove("hide")}),b.classList.remove("hide"),e=setTimeout(function(){L.classList.add("hide"),[...y].forEach(t=>{t.classList.add("hide")}),b.classList.add("hide"),!w.checked&&(n=setTimeout(function(){[...h].forEach(t=>{t.classList.add("hide")})},3e3))},3e3)}let f=null;function m(t){t!=f&&(f!=null&&v[f].classList.remove("expand"),f=t),clearTimeout(o[t]),v[t].classList.add("expand"),o[t]=setTimeout(function(){v[t].classList.remove("expand")},6e3)}window.addEventListener("pointerdown",a),window.addEventListener("pointermove",a),window.addEventListener("scroll",a),w.addEventListener("change",a),[...u].forEach((t,r)=>{t.addEventListener("touchstart",()=>m(r)),t.addEventListener("pointermove",()=>m(r)),t.addEventListener("mouseleave",function(){v[r].classList.remove("expand")})}),window.addEventListener("keydown",function(t){const r=t.key;function c(){d(0)}switch(a(),r){case"A":case"a":p.click(),a();break;case"F":case"f":N.click(),a();break;case"ArrowUp":!isNaN(s)&&s!==null?s-3>=0&&d(s-3):c(),m(s);break;case"ArrowLeft":!isNaN(s)&&s!==null?s-1>=0&&d(s-1):c(),m(s);break;case"ArrowRight":!isNaN(s)&&s!==null?s+1<u.length&&d(s+1):c(),m(s);break;case"ArrowDown":!isNaN(s)&&s!==null?s+3<u.length&&d(s+3):c(),m(s);break}}),p.addEventListener("click",function(){d(s!=="all"?"all":null)}),window.addEventListener("scroll",function(){function t(){const r=window.document.body,c=window.document.documentElement,i=r.scrollTop||c.scrollTop;return c.scrollHeight-window.innerHeight-i}t()<=10?b.classList.add("slide"):b.classList.remove("slide")}),a()},_=async()=>{k=await fetch("/api/channels").then(e=>(e.status!==200&&console.log("error or no content",e.status),e.json())).catch(e=>(console.error("Failed to load",e),null))},M=()=>k.GR,T=()=>M().filter(e=>e.is_display===!0);let k;await _();const g=e=>new Date(e).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),d=e=>{switch(e){case null:l.classList.remove("choiced"),[...u].forEach(n=>{n.classList.remove("listening");const o=n.querySelector("video");o.muted=!0}),p.innerHTML='<i class="material-icons">volume_off</i>',p.title="全ch聴く";break;case"all":l.classList.remove("choiced"),[...u].forEach(n=>{n.classList.add("listening");const o=n.querySelector("video");o.muted=!1}),p.innerHTML='<i class="material-icons">volume_up</i>',p.title="ミュートする";break;default:l.classList.add("choiced"),[...u].forEach((n,o)=>{const a=n.querySelector("video");o===e?(n.classList.add("listening"),a.muted=!1):(n.classList.remove("listening"),a.muted=!0)}),p.innerHTML='<i class="material-icons">volume_up</i>',p.title="全ch聴く";break}s=e};let s=null,E=Promise.resolve();T().forEach((e,n)=>{var t;const o=`<div class="chframe">
            <video playsinline controlsList="noremoteplayback"></video>
            <div class="broadcast-wrap">
                <div class="broadcast-channel-box">
                    <span class="broadcast-channel">${e.remocon_id}</span>
                    <img class="broadcast-logo" src="/api/channels/${e.id}/logo" alt="${e.name}">
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
        `;l.insertAdjacentHTML("beforeend",o);const a=l.lastElementChild,f=a.querySelector("video"),m=a.querySelector(".reload");a.addEventListener("click",function(){d(s===n?null:n)}),E=E.then(()=>new Promise(r=>{if(S.getFeatureList().mseLivePlayback){const c=`/api/streams/live/${e.display_channel_id}/360p/mpegts`,i=S.createPlayer({type:"mse",isLive:!0,url:c});i.attachMediaElement(f),m.addEventListener("click",B=>{B.stopPropagation(),i.unload(),B.shiftKey?alert("Shiftキーを押しながらクリックしたため、読み込み停止をしました。"):(i.load(),i.play())}),setTimeout(r,500),i.load(),i.play().then(function(){d("all")}).catch(function(){i.muted=!0,i.play()})}}))}),I(),await E,setInterval(async()=>{await _(),T().forEach((e,n)=>{var r,c;const o=v[n],a={title:o.querySelector(".broadcast-title-id"),startTime:o.querySelector(".broadcast-start"),endTime:o.querySelector(".broadcast-end")},f=Object.values(a).map(i=>i.textContent),m=[((r=e.program_present)==null?void 0:r.title)??"(情報なし)",e.program_present?g(e.program_present.start_time):"--:--",e.program_present?g(e.program_present.end_time):"--:--"];if(f.toString()!==m.toString()){const i=`<span class="broadcast-title-id">${((c=e.program_present)==null?void 0:c.title)??"(情報なし)"}</span>
                    <div class="broadcast-time">
                        <span class="broadcast-start">${e.program_present?g(e.program_present.start_time):"--:--"}</span>
                        <span class="broadcast-to">～</span>
                        <span class="broadcast-end">${e.program_present?g(e.program_present.end_time):"--:--"}</span>
                    </div>
                </div>`;o.innerHTML=i}})},30*1e3)});document.addEventListener("DOMContentLoaded",()=>{const L=document.documentElement,l=document.getElementById("fsbutton");l.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():L.requestFullscreen().catch(h=>{alert("ご利用のブラウザは全画面表示に対応していません"+h.name)})});const u=()=>{document.fullscreenElement?(screen.orientation.lock("landscape").catch(()=>{}),l.innerHTML='<i class="material-icons">fullscreen_exit</i>',l.title="全画面表示を終了"):(screen.orientation.unlock&&screen.orientation.unlock(),l.innerHTML='<i class="material-icons">fullscreen</i>',l.title="全画面表示")};document.addEventListener("fullscreenchange",u)});
