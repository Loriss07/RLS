<template>
    <q-btn color="amber" glossy label="Avvia" @click="Play"/>
    <q-btn color="amber" glossy label="Ferma" @click="Pause"/>
    <audio ref="audio" autoplay></audio>
</template>
<script setup>
    import { store } from '../../public/store.js'
    import { ref } from 'vue'
    import Hls from 'hls.js'
    const audio = ref(null)
    var hls = new Hls();
    console.log(store.role);
    function Play()
    {
        let stream = "http://167.235.151.123/hls/stream.m3u8"
        
        hls.loadSource(stream);
        hls.attachMedia(audio.value);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            audio.play();
        });
    }
    function Pause()
    {
        hls.stopLoad();
    }
    

</script>