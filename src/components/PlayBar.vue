<template>
    <audio ref="player" autoplay></audio>
    <div class="justify-center items-center row q-py-sm">
        <div class="row col-7"  > 
            <div class="col-6 q-mx-sm q-gutter-sm" >
                <q-btn color="secondary" icon="skip_previous"  @click="onClick" />
            
                <q-btn color="secondary" icon="fast_rewind"  @click="onClick" />
            
                <q-btn v-if="play" color="secondary" size="lg" icon="play_arrow"  @click="Play" />
                <q-btn v-else color="secondary" size="lg" icon="pause"  @click="Pause" />
            
                <q-btn color="secondary" icon="fast_forward"  @click="onClick" />
           
                <q-btn color="secondary" icon="skip_next"  @click="onClick" />

                <q-btn color="red-4"  icon="stop"  @click="Stop" />
                
                
            </div>
            <div class="col-2 q-x-gutter-xl">
                <q-slider
                    class="q-mt-xl"
                    v-model="volume"
                    color="orange"
                    markers
                    :min="0"
                    :max="100"
                    marker-labels
                    @change="changeVolume"
                >
                    <template v-slot:marker-label-group="{ markerList }">
                        <q-icon
                        v-for="val in [0, 100]"
                        :key="val"
                        :class="markerList[val].classes"
                        :style="markerList[val].style"
                        size="sm"
                        color="orange"
                        :name="val === 0 ? 'volume_off' : 'volume_up'"
                        @click="secondModel = val"
                        />
                    </template>
                </q-slider>
                </div>
            
            
        </div>
        
    </div>
</template>

<script setup>
import { store } from '../../public/store.js'
import Hls from 'hls.js'
import { onMounted, ref } from 'vue'
    
    onMounted(() => {
        store.init();
       
    })
    var hls = new Hls();
    const player = ref(null);
    var play = ref(true);
    const standard = ref(0);
    const volume = ref(20);
    var source = "http://167.235.151.123/hls/stream.m3u8";
    var isStarted = ref(false);
    function Play()
    {
        if (!isStarted.value)
        {
            store.getSong();
            setTimeout(() => {
                hls.loadSource(source);
                hls.attachMedia(player.value);
                hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    player.play();
                });
                play.value = !play.value;
                
            },5000);
            isStarted.value = true;
        } else 
        {
            store.resume();
            play.value = !play.value;
        }
            
        
    }
    
    function Pause()
    {
        store.pause();
        play.value = !play.value;
        isStarted.value = true;
    }

    const changeVolume = () => {
        player.value.volume = volume.value / 100;
    }
    const Stop = () => {
        store.stop();
        isStarted.value = false;
        play.value = true;
    }

</script>