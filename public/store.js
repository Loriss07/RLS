import { reactive } from 'vue'
import axios  from 'axios'
import Hls from 'hls.js'

export const store = reactive({
    title: " ",
    artist: " ",
    id: '',
    duration: null,
    init() { this.duration = new Date(); },
    getSong() {

        axios({
            method: 'get',
            url: 'http://167.235.151.123/php/play.php',
            params: { id : this.id },
        })
            
            
    },
    play(audio_tag) {
        
    },
    pause() {
        axios.get('http://167.235.151.123/php/stop.php');
    },
    resume() {
        axios.get('http://167.235.151.123/php/resume.php');
    },
    stop() {
        axios.get('http://167.235.151.123/php/stopStream.php');
    }
    


})