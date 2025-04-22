import './style.css';

import Utils from '@/utils';

(async () => {
    let total = Infinity;
    let programs = [];

    for (let index = 1; index <= total / 100; index++) {
        const data = await fetch(`${Utils.getApiBaseUrl()}/videos?page=${index}`).then(res => res.json());
        if (data.total === 0) {
            break;
        }
        total = data.total;
        programs = [...programs, ...data.recorded_programs];
    }

    programs = programs.reverse();

    const channelsDiv = document.getElementById('channels');
    const timesDiv = document.getElementById('times');
    const scheduleDiv = document.getElementById('schedule');

    // Extract unique channels and sort by channel name
    const channels = [...new Set(programs.sort((a, b) => a.channel.remocon_id - b.channel.remocon_id).map(p => p.channel.name))];

    // Generate channel names (sticky header)
    channels.forEach(channel => {
        const channelDiv = document.createElement('div');
        channelDiv.className = 'channel-name';
        channelDiv.textContent = channel;
        channelsDiv.appendChild(channelDiv);
    });

    // Generate time labels
    const startTime = new Date(programs.reduce((a, b) => new Date(a.start_time) < new Date(b.start_time) ? a : b).start_time);
    const endTime = new Date(programs.reduce((a, b) => new Date(a.end_time) > new Date(b.end_time) ? a : b).end_time);
    const timeLabels = [];

    for (let time = new Date(startTime.setMinutes(0, 0, 0)); time <= endTime; time.setHours(time.getHours() + 1)) {
        timeLabels.push(new Date(time));
    }

    timeLabels.forEach((time, i) => {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'time-label';
        if (time.getHours() === 0 || i === 0) {
            timeDiv.textContent = time.toLocaleString([], { month: 'numeric', day: 'numeric', weekday: 'short', hour: 'numeric' });
        } else {
            timeDiv.textContent = time.toLocaleTimeString([], { hour: 'numeric' });
        }
        timesDiv.appendChild(timeDiv);
    });

    // Generate program cells
    programs.forEach(program => {
        const channelIndex = channels.findIndex(channel => channel === program.channel.name);
        const startTimeMinutesString = new Date(program.start_time).getMinutes().toString().padStart(2, '0');
        const getClassName = (program) => {
            return 'genre_' + (() => {
                switch (program.genres[0]?.major) {
                    case 'スポーツ':
                        return 'sports';
                    case 'ドラマ':
                        return 'drama';
                    case '音楽':
                        return 'music';
                    case '映画':
                        return 'movie';
                    case 'アニメ・特撮':
                        return 'anime';
                    default:
                        return 'none';
                }}
            )();
        };
        const programAnchor = document.createElement('a');
        programAnchor.className = 'program';
        programAnchor.classList.add(getClassName(program));
        programAnchor.style.gridColumn = channelIndex + 1;
        programAnchor.style.gridRowStart = Math.floor((new Date(program.start_time) - startTime) / (60 * 1000)) + 1;
        programAnchor.style.gridRowEnd = `span ${Math.ceil(program.duration / 60)}`;
        programAnchor.href = `https://yyya-nico.co/konomitv/videos/watch/${program.id}`;
        programAnchor.target = '_blank';
        programAnchor.title = program.title;
        programAnchor.innerHTML = `
            <div class="start-time">${startTimeMinutesString}</div>
            ${program.title}
        `;
        scheduleDiv.appendChild(programAnchor);
    });
})();
