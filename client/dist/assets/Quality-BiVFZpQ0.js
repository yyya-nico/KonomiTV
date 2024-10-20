import{x as f,az as F,aI as V,aB as S,Y as p,T as i,U as n,a2 as C,at as e,_ as g,$ as _,k as A,a3 as v,au as l,av as U,F as h,a1 as d,a8 as y,Q as q,R as G}from"./SnackbarsStore-DxiM_ro_.js";import{S as H}from"./Base-Bey39u76.js";import{P as M}from"./PlayerUtils-DvsnJsyj.js";import{_ as P,b as w,R as k}from"./top-CAFd2Mhb.js";import{V as $,a as I}from"./VTabs-CWlBWDJo.js";import{c as D}from"./VSelect-CfO_1DRD.js";import{c as m}from"./VChip-DmRkqc9s.js";import"./Navigation-D2s88Lnn.js";import"./logo-Bm6vWhdq.js";import"./ssrBoot-DerKhF7Y.js";import"./VersionStore-DahI3rR2.js";import"./VTextField-CQX4AK8g.js";import"./VAvatar-CLXTnYHa.js";const r=[{title:"1080p (60fps) (約4.50GB/h / 平均10.0Mbps)",value:"1080p-60fps"},{title:"1080p (約4.50GB/h / 平均10.0Mbps)",value:"1080p"},{title:"810p (約2.62GB/h / 平均5.8Mbps)",value:"810p"},{title:"720p (約2.18GB/h / 平均4.9Mbps)",value:"720p"},{title:"540p (約1.52GB/h / 平均3.4Mbps)",value:"540p"},{title:"480p (約1.06GB/h / 平均2.3Mbps)",value:"480p"},{title:"360p (約0.60GB/h / 平均1.3Mbps)",value:"360p"},{title:"240p (約0.35GB/h / 平均0.8Mbps)",value:"240p"}],E=[{title:"1080p (60fps) (約1.80GB/h / 平均4.0Mbps)",value:"1080p-60fps"},{title:"1080p (約1.37GB/h / 平均3.0Mbps)",value:"1080p"},{title:"810p (約1.05GB/h / 平均2.3Mbps)",value:"810p"},{title:"720p (約0.82GB/h / 平均1.8Mbps)",value:"720p"},{title:"540p (約0.53GB/h / 平均1.2Mbps)",value:"540p"},{title:"480p (約0.46GB/h / 平均1.0Mbps)",value:"480p"},{title:"360p (約0.30GB/h / 平均0.7Mbps)",value:"360p"},{title:"240p (約0.20GB/h / 平均0.4Mbps)",value:"240p"}],T=f({name:"Settings-Quality",components:{SettingsBase:H},data(){return{Utils:Object.freeze(F),PlayerUtils:Object.freeze(M),is_form_dense:F.isSmartphoneHorizontal(),tab:null,network_circuits:["Wi-Fi 回線時","モバイル回線時"],tv_streaming_quality:r,tv_streaming_quality_cellular:r,video_streaming_quality:r,video_streaming_quality_cellular:r}},computed:{...V(S)},watch:{"settingsStore.settings.tv_data_saver_mode":{immediate:!0,handler(u){u===!0?this.tv_streaming_quality=E:this.tv_streaming_quality=r}},"settingsStore.settings.tv_data_saver_mode_cellular":{immediate:!0,handler(u){u===!0?this.tv_streaming_quality_cellular=E:this.tv_streaming_quality_cellular=r}},"settingsStore.settings.video_data_saver_mode":{immediate:!0,handler(u){u===!0?this.video_streaming_quality=E:this.video_streaming_quality=r}},"settingsStore.settings.video_data_saver_mode_cellular":{immediate:!0,handler(u){u===!0?this.video_streaming_quality_cellular=E:this.video_streaming_quality_cellular=r}}},created(){this.settingsStore.settings.tv_data_saver_mode===!0&&(this.tv_streaming_quality=E),this.settingsStore.settings.tv_data_saver_mode_cellular===!0&&(this.tv_streaming_quality_cellular=E),this.settingsStore.settings.video_data_saver_mode===!0&&(this.video_streaming_quality=E),this.settingsStore.settings.video_data_saver_mode_cellular===!0&&(this.video_streaming_quality_cellular=E)}}),a=u=>(q("data-v-52952c2a"),u=u(),G(),u),z={class:"settings__heading"},Q=a(()=>e("span",{class:"ml-3"},"画質",-1)),N=a(()=>e("div",{class:"settings__quote mt-5 pb-2"},[l(" 視聴開始時の画質プロファイルは、デバイスの回線状況に応じて自動的に選択されます (Android のみ) 。"),e("br"),l(" 画質プロファイルは、プレイヤー下にある設定アイコン ⚙️ から変更できます。"),e("br")],-1)),W={class:"settings__content-heading mt-6"},L=a(()=>e("span",{class:"ml-2"},"テレビのライブストリーミング",-1)),R={class:"settings__item settings__item--sync-disabled"},Y=a(()=>e("div",{class:"settings__item-heading"},"テレビのデフォルトのストリーミング画質",-1)),j=a(()=>e("div",{class:"settings__item-label"},[l(" テレビをライブストリーミングするときのデフォルトの画質を設定します。"),e("br"),l(" ストリーミング画質はプレイヤーの設定からいつでも切り替えられます。"),e("br")],-1)),O=a(()=>e("div",{class:"settings__item-label mt-1"},[l(" 画質を [1080p (60fps)] に設定すると、"),e("b",null,"通常 30fps (60i) の映像を補間し、より滑らか（ぬるぬる）な映像で視聴できます！"),l("ドラマやバラエティなどを視聴するときに特におすすめです。"),e("br")],-1)),J={key:0,class:"settings__item-label mt-1"},K=a(()=>e("br",null,null,-1)),X=["for"],Z=["for"],x=a(()=>e("b",null,"画質はほぼそのまま、通信量を通常より 50% 〜 70% 削減して視聴できます！",-1)),uu=a(()=>e("br",null,null,-1)),eu={class:"settings__item-label mt-1"},tu=a(()=>e("br",null,null,-1)),su={key:0,class:"mt-1 mb-0 text-error-lighten-1"},iu={key:1,class:"mt-1 mb-0 text-error-lighten-1"},lu={class:"settings__item settings__item--switch settings__item--sync-disabled"},au=["for"],ou=["for"],du=a(()=>e("b",null,"放送波との遅延を最短 0.9 秒に抑えて視聴できます！",-1)),nu=a(()=>e("br",null,null,-1)),_u=a(()=>e("br",null,null,-1)),ru=a(()=>e("div",{class:"settings__item-label mt-1"},[l(" 映像がカクつきやすくなるため、通信が不安定になりがちなモバイル回線やフリー Wi-Fi から視聴するときは、低遅延ストリーミングをオフにすることをおすすめします。"),e("br")],-1)),Eu={class:"settings__content-heading mt-6"},mu=a(()=>e("span",{class:"ml-2"},"ビデオのオンデマンドストリーミング",-1)),Au={class:"settings__item settings__item--sync-disabled"},Bu=a(()=>e("div",{class:"settings__item-heading"},"ビデオのデフォルトのストリーミング画質",-1)),Du=a(()=>e("div",{class:"settings__item-label"},[l(" ビデオをストリーミング再生するときのデフォルトの画質を設定します。"),e("br"),l(" ストリーミング画質はプレイヤーの設定からいつでも切り替えられます。"),e("br")],-1)),Cu=a(()=>e("div",{class:"settings__item-label mt-1"},[l(" 画質を [1080p (60fps)] に設定すると、"),e("b",null,"通常 30fps (60i) の映像を補間し、より滑らか（ぬるぬる）な映像で視聴できます！"),l("ドラマやバラエティなどを視聴するときに特におすすめです。"),e("br")],-1)),Fu={key:0,class:"settings__item-label mt-1"},pu=a(()=>e("br",null,null,-1)),gu=["for"],vu=["for"],hu=a(()=>e("b",null,"画質はほぼそのまま、通信量を通常より 50% 〜 70% 削減して視聴できます！",-1)),yu=a(()=>e("br",null,null,-1)),cu={class:"settings__item-label mt-1"},bu=a(()=>e("br",null,null,-1)),fu={key:0,class:"mt-1 mb-0 text-error-lighten-1"},Vu={key:1,class:"mt-1 mb-0 text-error-lighten-1"};function Su(u,t,Uu,qu,Gu,Hu){const B=p("Icon"),c=p("SettingsBase");return i(),n(c,null,{default:C(()=>[e("h2",z,[g((i(),_("a",{class:"settings__back-button",onClick:t[0]||(t[0]=s=>u.$router.back())},[A(B,{icon:"fluent:arrow-left-12-filled",width:"25px"})])),[[k]]),A(B,{icon:"fluent:video-clip-multiple-16-filled",width:"26px"}),Q]),N,A(I,{class:"settings__tab",color:"primary","bg-color":"transparent","align-tabs":"center",modelValue:u.tab,"onUpdate:modelValue":t[1]||(t[1]=s=>u.tab=s)},{default:C(()=>[(i(!0),_(h,null,v(u.network_circuits,s=>(i(),n($,{style:{"text-transform":"none !important"},key:s},{default:C(()=>[l(U(s),1)]),_:2},1024))),128))]),_:1},8,["modelValue"]),(i(!0),_(h,null,v(u.network_circuits,(s,b)=>g((i(),_("div",{class:"settings__content mt-0",key:s},[e("div",W,[A(B,{icon:"fluent:tv-20-filled",width:"22px"}),L]),e("div",R,[Y,j,O,u.Utils.isAndroid()?(i(),_("div",J,[l(" Fire HD 10 (2021) などの一部のローエンド Android (特に MediaTek SoC 搭載) デバイスでは、1080p 以上の映像描画が不安定なことが確認されています。その場合は 720p 以下の画質を選択することをおすすめします。"),K])):d("",!0),s!=="モバイル回線時"?(i(),n(D,{key:1,class:"settings__item-form",color:"primary",variant:"outlined","hide-details":"",density:u.is_form_dense?"compact":"default",items:u.tv_streaming_quality,modelValue:u.settingsStore.settings.tv_streaming_quality,"onUpdate:modelValue":t[2]||(t[2]=o=>u.settingsStore.settings.tv_streaming_quality=o)},null,8,["density","items","modelValue"])):d("",!0),s==="モバイル回線時"?(i(),n(D,{key:2,class:"settings__item-form",color:"primary",variant:"outlined","hide-details":"",density:u.is_form_dense?"compact":"default",items:u.tv_streaming_quality_cellular,modelValue:u.settingsStore.settings.tv_streaming_quality_cellular,"onUpdate:modelValue":t[3]||(t[3]=o=>u.settingsStore.settings.tv_streaming_quality_cellular=o)},null,8,["density","items","modelValue"])):d("",!0)]),e("div",{class:y(["settings__item settings__item--switch settings__item--sync-disabled",{"settings__item--disabled":u.PlayerUtils.isHEVCVideoSupported()===!1}])},[e("label",{class:"settings__item-heading",for:`tv_data_saver_mode${s==="モバイル回線時"?"_cellular":""}`}," テレビを通信節約モードで視聴する ",8,X),e("label",{class:"settings__item-label",for:`tv_data_saver_mode${s==="モバイル回線時"?"_cellular":""}`},[l(" 通信節約モードでは、圧縮率の高い H.265 / HEVC を使い、"),x,l(" サーバー PC によっては高負荷になることがあります。"),uu],8,Z),e("div",eu,[l(" 通信が不安定になりがちなモバイル回線 (4G/5G)・通信速度の遅いフリー Wi-Fi から視聴するときに特におすすめです。"),tu,u.PlayerUtils.isHEVCVideoSupported()===!1&&u.Utils.isFirefox()===!1?(i(),_("p",su," このデバイスでは通信節約モードがサポートされていません。 ")):d("",!0),u.PlayerUtils.isHEVCVideoSupported()===!1&&u.Utils.isFirefox()===!0?(i(),_("p",iu," お使いの Firefox ブラウザでは通信節約モードがサポートされていません。 ")):d("",!0)]),s!=="モバイル回線時"?(i(),n(m,{key:0,class:"settings__item-switch",color:"primary",id:"tv_data_saver_mode","hide-details":"",modelValue:u.settingsStore.settings.tv_data_saver_mode,"onUpdate:modelValue":t[4]||(t[4]=o=>u.settingsStore.settings.tv_data_saver_mode=o),disabled:u.PlayerUtils.isHEVCVideoSupported()===!1},null,8,["modelValue","disabled"])):d("",!0),s==="モバイル回線時"?(i(),n(m,{key:1,class:"settings__item-switch",color:"primary",id:"tv_data_saver_mode_cellular","hide-details":"",modelValue:u.settingsStore.settings.tv_data_saver_mode_cellular,"onUpdate:modelValue":t[5]||(t[5]=o=>u.settingsStore.settings.tv_data_saver_mode_cellular=o),disabled:u.PlayerUtils.isHEVCVideoSupported()===!1},null,8,["modelValue","disabled"])):d("",!0)],2),e("div",lu,[e("label",{class:"settings__item-heading",for:`tv_low_latency_mode${s==="モバイル回線時"?"_cellular":""}`}," テレビを低遅延で視聴する ",8,au),e("label",{class:"settings__item-label",for:`tv_low_latency_mode${s==="モバイル回線時"?"_cellular":""}`},[l(" 低遅延ストリーミングをオンにすると、"),du,nu,l(" また、約 3 秒以上遅延したときに少しだけ再生速度を早める (1.1x) ことで、滑らかにストリーミングの遅延を取り戻します。"),_u],8,ou),ru,s!=="モバイル回線時"?(i(),n(m,{key:0,class:"settings__item-switch",color:"primary",id:"tv_low_latency_mode","hide-details":"",modelValue:u.settingsStore.settings.tv_low_latency_mode,"onUpdate:modelValue":t[6]||(t[6]=o=>u.settingsStore.settings.tv_low_latency_mode=o)},null,8,["modelValue"])):d("",!0),s==="モバイル回線時"?(i(),n(m,{key:1,class:"settings__item-switch",color:"primary",id:"tv_low_latency_mode_cellular","hide-details":"",modelValue:u.settingsStore.settings.tv_low_latency_mode_cellular,"onUpdate:modelValue":t[7]||(t[7]=o=>u.settingsStore.settings.tv_low_latency_mode_cellular=o)},null,8,["modelValue"])):d("",!0)]),e("div",Eu,[A(B,{icon:"fluent:movies-and-tv-20-filled",width:"22px"}),mu]),e("div",Au,[Bu,Du,Cu,u.Utils.isAndroid()?(i(),_("div",Fu,[l(" Fire HD 10 (2021) などの一部のローエンド Android (特に MediaTek SoC 搭載) デバイスでは、1080p 以上の映像描画が不安定なことが確認されています。その場合は 720p 以下の画質を選択することをおすすめします。"),pu])):d("",!0),s!=="モバイル回線時"?(i(),n(D,{key:1,class:"settings__item-form",color:"primary",variant:"outlined","hide-details":"",density:u.is_form_dense?"compact":"default",items:u.video_streaming_quality,modelValue:u.settingsStore.settings.video_streaming_quality,"onUpdate:modelValue":t[8]||(t[8]=o=>u.settingsStore.settings.video_streaming_quality=o)},null,8,["density","items","modelValue"])):d("",!0),s==="モバイル回線時"?(i(),n(D,{key:2,class:"settings__item-form",color:"primary",variant:"outlined","hide-details":"",density:u.is_form_dense?"compact":"default",items:u.video_streaming_quality_cellular,modelValue:u.settingsStore.settings.video_streaming_quality_cellular,"onUpdate:modelValue":t[9]||(t[9]=o=>u.settingsStore.settings.video_streaming_quality_cellular=o)},null,8,["density","items","modelValue"])):d("",!0)]),e("div",{class:y(["settings__item settings__item--switch settings__item--sync-disabled",{"settings__item--disabled":u.PlayerUtils.isHEVCVideoSupported()===!1}])},[e("label",{class:"settings__item-heading",for:`video_data_saver_mode${s==="モバイル回線時"?"_cellular":""}`}," ビデオを通信節約モードで視聴する ",8,gu),e("label",{class:"settings__item-label",for:`video_data_saver_mode${s==="モバイル回線時"?"_cellular":""}`},[l(" 通信節約モードでは、圧縮率の高い H.265 / HEVC を使い、"),hu,l(" サーバー PC によっては高負荷になることがあります。"),yu],8,vu),e("div",cu,[l(" 通信が不安定になりがちなモバイル回線 (4G/5G)・通信速度の遅いフリー Wi-Fi から視聴するときに特におすすめです。"),bu,u.PlayerUtils.isHEVCVideoSupported()===!1&&u.Utils.isFirefox()===!1?(i(),_("p",fu," このデバイスでは通信節約モードがサポートされていません。 ")):d("",!0),u.PlayerUtils.isHEVCVideoSupported()===!1&&u.Utils.isFirefox()===!0?(i(),_("p",Vu," お使いの Firefox ブラウザでは通信節約モードがサポートされていません。 ")):d("",!0)]),s!=="モバイル回線時"?(i(),n(m,{key:0,class:"settings__item-switch",color:"primary",id:"video_data_saver_mode","hide-details":"",modelValue:u.settingsStore.settings.video_data_saver_mode,"onUpdate:modelValue":t[10]||(t[10]=o=>u.settingsStore.settings.video_data_saver_mode=o),disabled:u.PlayerUtils.isHEVCVideoSupported()===!1},null,8,["modelValue","disabled"])):d("",!0),s==="モバイル回線時"?(i(),n(m,{key:1,class:"settings__item-switch",color:"primary",id:"video_data_saver_mode_cellular","hide-details":"",modelValue:u.settingsStore.settings.video_data_saver_mode_cellular,"onUpdate:modelValue":t[11]||(t[11]=o=>u.settingsStore.settings.video_data_saver_mode_cellular=o),disabled:u.PlayerUtils.isHEVCVideoSupported()===!1},null,8,["modelValue","disabled"])):d("",!0)],2)])),[[w,u.tab===b]])),128))]),_:1})}const Yu=P(T,[["render",Su],["__scopeId","data-v-52952c2a"]]);export{Yu as default};
