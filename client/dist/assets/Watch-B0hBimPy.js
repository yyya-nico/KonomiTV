import{d as o,s as a,U as p,t as l,_ as h,r as c,o as d,n as m}from"./top-DdLAbho1.js";import{W as u,P as _}from"./PlayerController-B_IbsxXx.js";import{u as f}from"./ChannelsStore-ZZBxRMNY.js";import{u as y}from"./CaptureManager-D08s5kAL.js";import"./_commonjsHelpers-CSPQI3rM.js";import"./ssrBoot-BWAgPhCP.js";import"./logo-BqNND4bk.js";import"./VDialog-BZtRXN2z.js";import"./VChip-O_hoOn2i.js";import"./VTextField-CGBT6DEK.js";import"./VAvatar-BSmx67TS.js";import"./VCard-DyUraCmI.js";import"./VSlider-CodOef34.js";import"./swiper-DlXZelaX.js";import"./CommentMuteSettings-CgTr-pyL.js";import"./VSelect-6lV1xh8C.js";import"./vuedraggable.umd-DRQ9ceF-.js";import"./Twitter-BF_gfT1d.js";import"./mpegts-CHqqkE9D.js";import"./PlayerUtils-DvsnJsyj.js";let e=null;const S=o({name:"TV-Watch",components:{Watch:u},data(){return{interval_ids:[]}},computed:{...a(f,y,l)},created(){this.channelsStore.display_channel_id=this.$route.params.display_channel_id,this.init()},beforeRouteUpdate(t,r,s){const i=this.destroy();this.channelsStore.display_channel_id=t.params.display_channel_id,(async()=>this.playerStore.is_zapping===!0?(this.playerStore.is_zapping=!1,this.interval_ids.push(window.setTimeout(()=>{i.then(()=>this.init())},.5*1e3))):i.then(()=>this.init()))(),s()},beforeUnmount(){this.destroy(),this.channelsStore.display_channel_id="gr000"},methods:{async init(){const t=60-new Date().getSeconds();if(this.interval_ids.push(window.setTimeout(()=>{this.channelsStore.update(!0),this.interval_ids.push(window.setInterval(()=>{this.channelsStore.update(!0)},30*1e3))},t*1e3)),await this.channelsStore.update(),this.$route.params.display_channel_id===void 0){this.$router.push({path:"/not-found/"});return}if(this.channelsStore.channel.current.name==="チャンネル情報取得エラー"){await p.sleep(3),this.$router.push({path:"/not-found/"});return}e=new _("Live"),await e.init()},async destroy(){for(const t of this.interval_ids)window.clearInterval(t);this.interval_ids=[],e!==null&&(await e.destroy(),e=null)}}});function w(t,r,s,i,v,$){const n=c("Watch",!0);return d(),m(n,{playback_mode:"Live"})}const F=h(S,[["render",w]]);export{F as default};
