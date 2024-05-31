document.addEventListener('DOMContentLoaded', () => {
    const target = document.documentElement;
    const btn = document.getElementById('fsbutton');

    btn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            target.requestFullscreen()
                .catch((err) => {
                    alert('ご利用のブラウザは全画面表示に対応していません' + err.name);
                });
        } else {
            document.exitFullscreen();
        }
    });

    const fullscreenChangeHandler = () => {
        if(document.fullscreenElement) {
            screen.orientation.lock('landscape').catch(()=>{});
            btn.innerHTML = '<i class="material-icons">fullscreen_exit</i>';
            btn.title = '全画面表示を終了';
        }else{
            screen.orientation.unlock && screen.orientation.unlock();
            btn.innerHTML = '<i class="material-icons">fullscreen</i>';
            btn.title = '全画面表示';
        }
    };
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
});