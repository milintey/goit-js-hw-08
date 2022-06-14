var throttle = require('lodash.throttle');
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// const onPlay = function({seconds}) {
//     localStorage.setItem("videoplayer-current-time", seconds);
// };

const onPlay = function ({ seconds }) {
    localStorage.setItem("videoplayer-current-time", seconds);
}

player.on('timeupdate', throttle(onPlay, 1000));

// player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));

player.setCurrentTime(localStorage.getItem("videoplayer-current-time")).then(function(seconds) {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});